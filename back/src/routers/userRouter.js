import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
require("dotenv").config();
const multer = require("multer");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
import * as status from "../utils/status";
import { RequestError } from "../utils/errors";

const userAuthRouter = Router();

const upload = multer();

userAuthRouter.post(
    "/user/profileImage",
    upload.single("image"),
    async function (req, res, next) {
        try {
            const S3 = new AWS.S3({
                endpoint: new AWS.Endpoint(process.env.IMAGE_ENDPOINT),
                region: "kr-standard",
                credentials: {
                    accessKeyId: process.env.IMAGE_ACCESSKEY,
                    secretAccessKey: process.env.IMAGE_SECRETACCESSKEY,
                },
            });
            //create unique id
            const imageName = uuidv4();
            //add image file in Bucket in Ncloud with settings
            await S3.putObject({
                Bucket: process.env.IMAGE_BUCKET,
                Key: `${imageName}.PNG`,
                //ACL is access permission in image,all client can acces imagefile with 'public-read'
                ACL: "public-read",
                Body: req.file.buffer,
                ContentType: "image/png",
            }).promise();
            //return image url
            res.status(status.STATUS_200_OK).json({
                imageLink: `${process.env.IMAGE_ENDPOINT}/${process.env.IMAGE_BUCKET}/${imageName}.PNG`,
            });
        } catch (error) {
            next(error);
        }
    }
);

userAuthRouter.post("/user/register", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new RequestError(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        // req (request) 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });

        if ("errorMessage" in newUser) {
            throw new RequestError(
                { status: newUser.statusCode },
                newUser.errorMessage
            );
        }

        res.status(status.STATUS_201_CREATED).json(newUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await userAuthService.getUser({ email, password });

        if ("errorMessage" in user) {
            throw new RequestError(
                { status: user.statusCode },
                user.errorMessage
            );
        }

        res.status(status.STATUS_200_OK).json(user);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get(
    "/userlist",
    login_required,
    async function (req, res, next) {
        try {
            // 전체 사용자 목록을 얻음
            const users = await userAuthService.getUsers();
            res.status(status.STATUS_200_OK).json(users);
        } catch (error) {
            next(error);
        }
    }
);

userAuthRouter.get(
    "/user/current",
    login_required,
    async function (req, res, next) {
        try {
            // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
            const user_id = req.currentUserId;
            const currentUserInfo = await userAuthService.getUserInfo({
                user_id,
            });

            if ("errorMessage" in currentUserInfo) {
                throw new RequestError(
                    { status: currentUserInfo.statusCode },
                    currentUserInfo.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json(currentUserInfo);
        } catch (error) {
            next(error);
        }
    }
);

userAuthRouter.put(
    "/users/:id",
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const user_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            if (user_id !== req.currentUserId) {
                throw new RequestError(
                    { status: status.STATUS_403_FORBIDDEN },
                    `Trying to set different user's Info`
                );
            }
            //이메일은 고정값이며 비밀번호는 라우터를 따로한다.
            const name = req.body.name ?? null;
            const description = req.body.description ?? null;
            const profileImage = req.body.profileImage ?? null;
            const user_category = req.body.user_category ?? null;
            const user_mvp = req.body.user_mvp ?? null;
            const toUpdate = {
                name,
                description,
                profileImage,
                user_category,
                user_mvp,
            };

            // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedUser = await userAuthService.setUser({
                user_id,
                toUpdate,
            });

            if ("errorMessage" in updatedUser) {
                throw new RequestError(
                    { status: updatedUser.statusCode },
                    updatedUser.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);
userAuthRouter.put(
    "/users/:id/password",
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const user_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            if (user_id !== req.currentUserId) {
                throw new RequestError(
                    { status: status.STATUS_403_FORBIDDEN },
                    `Trying to set different user's Password`
                );
            }
            const password = req.body.password ?? null;
            const passwordReset = req.body.passwordReset ?? null;
            if (!password || !passwordReset) {
                throw new Error(`password and passwordReset is required`);
            }
            const updatedUser = await userAuthService.setUserPassword({
                user_id,
                password,
                passwordReset,
            });

            if ("errorMessage" in updatedUser) {
                throw new RequestError(
                    { status: updatedUser.statusCode },
                    updatedUser.errorMessage
                );
            }
            res.status(status.STATUS_200_OK).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);
userAuthRouter.get(
    "/users/:id",
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.id;
            const userInfo = await userAuthService.getUserInfo({
                user_id,
            });

            if ("errorMessage" in userInfo) {
                throw new RequestError(
                    { status: userInfo.statusCode },
                    userInfo.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json(userInfo);
        } catch (error) {
            next(error);
        }
    }
);
userAuthRouter.delete(
    "/users/:id",
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const user_id = req.params.id;
            if (user_id !== req.currentUserId) {
                throw new RequestError(
                    { status: status.STATUS_403_FORBIDDEN },
                    `Trying to set different user's comments`
                );
            }

            const currentUserInfo = await userAuthService.getUserInfo({
                user_id,
            });

            if ("errorMessage" in currentUserInfo) {
                throw new RequestError(
                    { status: currentUserInfo.statusCode },
                    currentUserInfo.errorMessage
                );
            }
            const result = await userAuthService.deleteUser({ user_id });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);
// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
    res.status(200).send(
        `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
