import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import * as status from "../utils/status";

class userAuthService {
    static async addUser({ name, email, password }) {
        // 이메일 중복 확인
        const user = await User.findByEmail({ email });
        if (user) {
            return {
                errorMessage: `id : {${email}} is already exist`,
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
                errorMessage: `id : {${email}} is not found`,
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
        console.log(secretKey);
        const token = jwt.sign({ user_id: user.id }, secretKey);

        // 반환할 loginuser 객체를 위한 변수 설정
        const id = user.id;
        const name = user.name;
        const description = user.description;

        const loginUser = {
            token,
            id,
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
    static async setActivation({ user_id, active }) {
        let user = await User.findById({ user_id });
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            return {
                errorMessage: `id : {${user_id}} is not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }

        user = await User.update({ user_id, newValue: { active } });
        return user.active === active;
    }

    static async setUserPassword({ user_id, password, passwordReset }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect);
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
        const { deletedCount } = await User.delete({ id: user_id });
        return { result: true };
    }
}

export { userAuthService };
