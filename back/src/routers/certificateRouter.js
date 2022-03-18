import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

certificateRouter.post(
    "/certificates/create",
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
            const title = req.body.title ?? null;
            const when_date = req.body.when_date ?? null;
            const user_id = req.body.user_id ?? null;
            // title,when_date,user_id are required
            if (!title || !when_date || !user_id) {
                throw new Error("title,when_date and user_id are required.");
            }
            if (user_id !== req.currentUserId) {
                throw new Error(
                    "Trying to create different user's certificate"
                );
            }
            const description = req.body.description ?? null;

            // add a certificate with new information
            const newCertificate = await certificateService.addCertificate({
                title,
                description,
                when_date,
                user_id,
            });

            res.status(201).json(newCertificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.get(
    "/certificates/:id",
    login_required,
    async function (req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id;
            //get one certificate with id of certificate
            const certificate = await certificateService.getCertificate({ id });
            //if certificate is not exist,return error message
            if (certificate.errorMessage) {
                throw new Error(certificate.errorMessage);
            }
            res.status(200).send(certificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.get(
    "/certificatelist/:user_id",
    login_required,
    async function (req, res, next) {
        try {
            //get id of user from req.params
            const user_id = req.params.user_id;
            //get user's certificates with id of user
            const certificates = await certificateService.getCertificates({
                user_id,
            });
            res.status(200).send(certificates);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.delete(
    "/certificates/:id",
    login_required,
    async function (req, res, next) {
        try {
            const id = req.params.id;
            const user_id = req.currentUserId;
            const certificate = await certificateService.getCertificate({ id });
            //if failed to get certificate,throw errorMessage
            if (certificate.errorMessage) {
                throw new Error(
                    `이미 삭제 되었거나 존재하지 않아 삭제에 실패하였습니다.`
                );
            }
            //if user have correct user_id,process delete
            if (user_id === certificate.user_id) {
                //get user's certificates with id of user
                const result = await certificateService.deleteCertificate({
                    id,
                });
                res.status(200).send(result);
            } else {
                throw new Error(
                    `User is not an owner of the certificate id ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.put(
    "/certificates/:id",
    login_required,
    async function (req, res, next) {
        try {
            const id = req.params.id;
            const user_id = req.currentUserId;
            const certificate = await certificateService.getCertificate({ id });

            if (certificate.errorMessage) {
                throw new Error(
                    `이미 삭제된 또는 존재하지 않아 수정에 실패하였습니다.`
                );
            }
            if (user_id === certificate.user_id) {
                const title = req.body.title ?? null;
                const description = req.body.description ?? null;
                const when_date = req.body.when_date ?? null;
                const toUpdate = { title, description, when_date };

                //update get one certificate with id of certificate
                const updatedCertificate =
                    await certificateService.setCertificate({
                        id,
                        toUpdate,
                        certificate,
                    });
                res.status(200).send(updatedCertificate);
            } else {
                throw new Error(
                    `User is not an owner of the certificate id ${id}`
                );
            }
        } catch (error) {
            next(error);
        }
    }
);

export { certificateRouter };
