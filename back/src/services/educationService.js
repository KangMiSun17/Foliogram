import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class educationService {
    /**
     * create new Education in DB using method of Education class
     *
     * @param {string} school school of education
     * @param {string} major major of education
     * @param {string} user_id id of user
     * @param {string} position position of education
     * @return {object} return new created education
     */
    static async addEducation({ school, major, user_id, position }) {
        //give a unique string
        const id = uuidv4();
        const newEducation = { id, user_id, school, position, major };

        // store in DB
        const createdNewEducation = await Education.create({
            newEducation,
        });

        return createdNewEducation;
    }

    /**
     * find and get one Education in DB using method of Education class
     *
     * @param {string} id id of education
     * @return {object} return finded education
     */
    static async getEducation({ id }) {
        const education = await Education.findById({ id });
        //if education is not exist in DB,return error message
        if (!education) {
            const errorMessage = "삭제 되었거나 존재하지 않는 학력입니다.";
            return { errorMessage };
        }
        return education;
    }

    /**
     * delete one Education in DB using method of Education class
     *
     * @param {string} id id of education
     * @return {object} return result of delete process
     */
    static async deleteEducation({ id }) {
        const { deletedCount } = await Education.delete({ id });
        return { result: true };
    }

    /**
     * find and get Educations of user in DB using method of Education class
     *
     * @param {string} user_id id of user
     * @return {object} return finded educations
     */
    static async getEducations({ user_id }) {
        const educations = await Education.searchByUserId({ user_id });
        return educations;
    }

    /**
     * update and get one Education in DB using method of Education class
     *
     * @param {string} id id of education
     * @param {object} toUpdate information to update with education
     * @return {object} return updated education
     */
    static async setEducation({ id, toUpdate, education }) {
        // update with keys which is not null
        if (toUpdate.school) {
            const fieldToUpdate = "school";
            const newValue = toUpdate.school;
            education = await Education.update({
                id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.major) {
            const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            education = await Education.update({
                id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.position) {
            const fieldToUpdate = "position";
            const newValue = toUpdate.position;
            education = await Education.update({
                id,
                fieldToUpdate,
                newValue,
            });
        }
        return education;
    }
}

export { educationService };
