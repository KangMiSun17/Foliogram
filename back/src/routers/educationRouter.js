import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post(
    "/education/create",
    login_required,
    async function (req, res, next) {
        try {
            //if req.body is not exist,return Error message
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요"
                );
            }

            // get informate from req
            const school = req.body.school ?? null;
            const major = req.body.major ?? null;
            const position = req.body.position ?? null;
            const user_id = req.body.user_id ?? null;
            if (!school || !major || !position || !user_id) {
                throw new Error(
                    "school,major,position and user_id are required."
                );
            }
            if (user_id !== req.currentUserId) {
                throw new Error("Trying to create different user's education");
            }
            // add a education with new information
            const newEducation = await educationService.addEducation({
                school,
                major,
                position,
                user_id,
            });

            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.get(
    "/educations/:id",
    login_required,
    async function (req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id;
            //get one education with id of education
            const education = await educationService.getEducation({ id });
            //if education is not exist,return error message
            if (education.errorMessage) {
                throw new Error(education.errorMessage);
            }
            res.status(200).send(education);
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.get(
    "/educationlist/:user_id",
    login_required,
    async function (req, res, next) {
        try {
            //get id of user from req.params
            const user_id = req.params.user_id;
            //get user's certificates with id of user
            const educations = await educationService.getEducations({
                user_id,
            });
            res.status(200).send(educations);
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.delete(
    "/educations/:id",
    login_required,
    async function (req, res, next) {
        try {
            //get id of education from req.params
            const id = req.params.id;
            const user_id = req.currentUserId;
            const education = await educationService.getEducation({ id });
            if (education.errorMessage) {
                throw new Error(
                    `이미 삭제 되었거나 존재하지 않아 삭제에 실패하였습니다.`
                );
            }
            //if user have correct user_id,process delete
            if (user_id === education.user_id) {
                //get user's educations with id of user
                const result = await educationService.deleteEducation({
                    id,
                });
                res.status(200).send(result);
            } else {
                throw new Error(
                    `User is not an owner of the education id ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.put(
    "/educations/:id",
    login_required,
    async function (req, res, next) {
        try {
            //get information from req
            const id = req.params.id;
            const user_id = req.currentUserId;
            const education = await educationService.getEducation({ id });

            if (education.errorMessage) {
                throw new Error(
                    `이미 삭제된 또는 존재하지 않아 수정에 실패하였습니다.`
                );
            }
            if (user_id === education.user_id) {
                const school = req.body.school ?? null;
                const major = req.body.major ?? null;
                const position = req.body.position ?? null;
                const toUpdate = { school, major, position };

                //update and get one education with id of education
                const updatedEducation = await educationService.setEducation({
                    id,
                    toUpdate,
                    education,
                });
                res.status(200).send(updatedEducation);
            } else {
                throw new Error(
                    `User is not an owner of the education id ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }
);

export { educationRouter };
