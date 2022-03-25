import {
    User,
    Award,
    Certificate,
    Education,
    Project,
    TechStack,
    Career,
    Comment,
} from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Logger, UNIFIED_LOG } from "../utils/logging";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import * as status from "../utils/status";

const logger = new Logger({
    name: "userService",
    tee: [
        UNIFIED_LOG,
        Logger.generateLogPath("user.log"),
        Logger.generateLogPath("service.log"),
        Logger.generateLogPath("userservice.log"),
    ],
});

class userAuthService {
    static async addUser({ name, email, password }) {
        // 이메일 중복 확인
        const user = await User.findByEmail({ email });
        if (user) {
            return {
                errorMessage: `email {${email}} already exists`,
                statusCode: status.STATUS_401_UNAUTHORIZED,
            };
        }

        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);

        // id 는 유니크 값 부여
        const id = uuidv4();
        const newUser = { id, name, email, password: hashedPassword };

        // db에 저장
        const createdNewUser = await User.create({ newUser });

        return createdNewUser;
    }

    static async getUser({ email, password }) {
        // 이메일 db에 존재 여부 확인
        const user = await User.findByEmail({ email });
        if (!user) {
            return {
                errorMessage: `email {${email}} not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(
            password,
            correctPasswordHash
        );
        if (!isPasswordCorrect) {
            return {
                errorMessage: `password is not correct`,
                statusCode: status.STATUS_401_UNAUTHORIZED,
            };
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        // console.log(secretKey);
        const token = jwt.sign({ user_id: user.id }, secretKey);

        // 반환할 loginuser 객체를 위한 변수 설정
        const id = user.id;
        const name = user.name;
        const description = user.description;
        const active = user.active;

        const loginUser = {
            token,
            id,
            active,
            email,
            name,
            description,
        };

        return loginUser;
    }

    static async getUsers() {
        const users = await User.findAll();
        return users;
    }

    static async setUser({ user_id, toUpdate }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            return {
                errorMessage: `id : {${user_id}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }
        Object.entries(toUpdate).forEach(([key, item]) => {
            //만약 업데이트내용이 없다면 업데이트할 데이터에 기존의 user데이터에 있던값으로 저장!
            //업데이트할 내용이 있는데 그 내용이 user_mvp일때만 조건문실행!(업데이트할 내용이있는 다른 key들은 이미 toUpdate에 저장되어있어 기존내용필요 X)
            if (item === null) {
                toUpdate[key] = user[key];
            } else if (key === "user_mvp") {
                const updateUserMvp = toUpdate.user_mvp;
                toUpdate.user_mvp = user.user_mvp.map(({ navName, state }) => {
                    if (navName === updateUserMvp.navName) {
                        return updateUserMvp;
                    } else {
                        return { navName, state };
                    }
                });
            }
        });
        user = await User.update({ user_id, newValue: toUpdate });

        return user;
    }

    /** 윤성준: 이메일 인증 전용 update 메서드입니다.
     * setUser 를 사용하지 않는 이유는 보안 때문입니다.
     * `setUser` 는 PUT 요청으로 일반 사용자 데이터를 수정할 때도 사용되므로 거기에서
     * `active` 필드를 통과시켜 주면 악의적인 PUT 요청으로 계정 활성화 상태를 바꿀 수 있습니다.
     * 그러니까 우리는 다른 데이터 필드는 허용하지 않는 전용 메서드를 사용합니다.
     */
    static async setActivation({ user_id, active, activation_key }) {
        let user = await User.findById({ user_id });
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            return {
                errorMessage: `id : {${user_id}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }

        let newValue = {};
        if (active) {
            newValue.active = active;
        }
        if (activation_key) {
            newValue.activation_key = activation_key;
        }

        user = await User.update({ user_id, newValue });
        return user.activation_key === activation_key;
    }

    static async setUserPassword({ user_id, password, passwordReset }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });

        if (!user) {
            return {
                errorMessage: `id : {${user_id}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // console.log(isPasswordCorrect);
        logger.log(
            { __level__: 2 },
            `.setUserPassword > `,
            `isPasswordCorrect = ${isPasswordCorrect}`
        );
        if (!isPasswordCorrect) {
            return {
                errorMessage: `password is not correct`,
                statusCode: status.STATUS_401_UNAUTHORIZED,
            };
        }
        const hashedPasswordReset = await bcrypt.hash(passwordReset, 10);
        const updatedUser = await User.update({
            user_id,
            newValue: { password: hashedPasswordReset },
        });
        return updatedUser;
    }
    static async setUserLikes({ user_id, following, state }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });
        let following_user = await User.findById({ user_id: following });

        if (!user) {
            return {
                errorMessage: `id : {${user_id}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }
        if (!following_user) {
            return {
                errorMessage: `following id : {${following}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }
        if (state === true) {
            if (!user.following.includes(following)) {
                user = await User.update({
                    user_id,
                    newValue: { $push: { following: following } },
                });
                await User.update({
                    user_id: following,
                    newValue: { $push: { follower: user_id } },
                });
            } else {
                return {
                    errorMessage: `you alredy following id : ${following}`,
                    statusCode: status.STATUS_403_FORBIDDEN,
                };
            }
        } else if (state === false) {
            if (user.following.includes(following)) {
                user = await User.update({
                    user_id,
                    newValue: { $pull: { following: following } },
                });
                await User.update({
                    user_id: following,
                    newValue: { $pull: { follower: user_id } },
                });
            } else {
                return {
                    errorMessage: `you alredy not following id : ${following}`,
                    statusCode: status.STATUS_403_FORBIDDEN,
                };
            }
        } else {
            return {
                errorMessage: `invalid state`,
                statusCode: status.STATUS_405_METHODNOTALLOWED,
            };
        }
        return user;
    }

    static async getUserInfo({ user_id }) {
        const user = await User.findById({ user_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            return {
                errorMessage: `id : {${user_id}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }

        return user;
    }
    static async deleteUser({ user_id }) {
        let user = await User.findById({ user_id });

        // for (const id of user.follower) {
        //     await User.update({
        //         user_id: id,
        //         newValue: { $pull: { following: user_id } },
        //     });
        // }
        // for (const id of user.following) {
        //     await User.update({
        //         user_id: id,
        //         newValue: { $pull: { follower: user_id } },
        //     });
        // }
        // const { deletedCount } = await User.delete({ id: user_id });
        // const awa = await Award.deleteAll({ user_id });
        // const cer = await Certificate.deleteAll({ user_id });
        // const edu = await Education.deleteAll({ user_id });
        // const pro = await Project.deleteAll({ user_id });
        // const tech = await TechStack.deleteAll({ user_id });
        // const car = await Career.deleteAll({ user_id });
        // const com = await Comment.deleteAll({ user_id });
        // console.log(awa, cer, edu, pro, tech, car, com);

        // 윤성준: await 은 동기화 키워드이기 때문에 줄줄이 쓰면 그만큼 오래 걸립니다.
        // 결과값을 위로 올릴 필요가 없으므로 딱히 기다리지 않아도 될 것 같습니다.
        Promise.allSettled([
            ...user.follower.map((id) => {
                return User.update({
                    user_id: id,
                    newValue: { $pull: { following: user_id } },
                });
            }),
            ...user.following.map((id) => {
                return User.update({
                    user_id: id,
                    newValue: {
                        $pull: { follower: user_id },
                    },
                });
            }),
            User.delete({ id: user_id }),
            Award.deleteAll({ user_id }),
            Career.deleteAll({ user_id }),
            Certificate.deleteAll({ user_id }),
            Comment.deleteAll({ user_id }),
            Education.deleteAll({ user_id }),
            Project.deleteAll({ user_id }),
            TechStack.deleteAll({ user_id }),
        ])
            .then((settled) => {
                logger.log({}, `deleteUser >`, settled);
            })
            .catch((error) => {
                logger.log({ __level__: 1 }, `deleteUser >`, error);
            });

        return { result: true };
    }
}

export { userAuthService };
