import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateService {
    /**
     * create new Certificate in DB using method of Certificate class
     *
     * @param {string} title title of certificate
     * @param {string} description description of certificate
     * @param {string} user_id id of user
     * @param {string} when_date acquire date of certificate
     * @return {object} return new created certificate
     */
    static async addCertificate({ title, description, user_id, when_date }) {
        //give a unique string
        const id = uuidv4();
        const newCertificate = { id, user_id, title, when_date };

        // store in DB
        if (description) {
            newCertificate.description = description;
        }
        const createdNewCertificate = await Certificate.create({
            newCertificate,
        });

        return createdNewCertificate;
    }

    /**
     * find and get one Certificate in DB using method of Certificate class
     *
     * @param {string} id id of certificate
     * @return {object} return finded certificate
     */
    static async getCertificate({ id }) {
        const certificate = await Certificate.findById({ id });
        //if certificate is not exist in DB,return error message
        if (!certificate) {
            const errorMessage = "삭제 되었거나 존재하지 않는 자격증입니다.";
            return { errorMessage };
        }
        return certificate;
    }

    /**
     * delete one Certificate in DB using method of Certificate class
     *
     * @param {string} id id of certificate
     * @return {object} return result of delete process
     */
    static async deleteCertificate({ id }) {
        const { deletedCount } = await Certificate.delete({ id });
        return { result: true };
    }

    /**
     * find and get Certificates of user in DB using method of Certificate class
     *
     * @param {string} user_id id of user
     * @return {object} return finded certificates
     */
    static async getCertificates({ user_id }) {
        const certificates = await Certificate.searchByUserId({ user_id });
        return certificates;
    }

    /**
     * update and get one Certificate in DB using method of Certificate class
     *
     * @param {string} id id of certificate
     * @param {object} toUpdate information to update with certificate
     * @return {object} return updated certificate
     */
    static async setCertificate({ id, toUpdate, certificate }) {
        // update with keys which is not null
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            certificate = await Certificate.update({
                id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            certificate = await Certificate.update({
                id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.when_date) {
            const fieldToUpdate = "when_date";
            const newValue = toUpdate.when_date;
            certificate = await Certificate.update({
                id,
                fieldToUpdate,
                newValue,
            });
        }
        return certificate;
    }
}

export { certificateService };
