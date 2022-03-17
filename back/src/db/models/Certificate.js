import { CertificateModel } from "../schemas/certificate";

class Certificate {
    /**
     * create new Certificate in DB
     *
     * @param {object} newCertificate new certificate to create
     * @return {object} return new created certificate
     */
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(
            newCertificate
        );
        return createdNewCertificate;
    }

    /**
     *  find Certificates with user_id of user in DB
     *
     * @param {string} user_id user_id of user
     * @return {object} return certificates of user
     */
    static async searchByUserId({ user_id }) {
        const certificates = await CertificateModel.find({ user_id });
        return certificates;
    }

    /**
     * find One Certificate with id of Certificate in DB
     *
     * @param {string} id id of certificate
     * @return {object} return finded certificate with id
     */
    static async findById({ id }) {
        const certificate = await CertificateModel.findOne({ id });
        return certificate;
    }

    /**
     * update Certificate in DB
     *
     * @param {string} id id of certificate
     * @param {string} fieldToUpdate field to update of certificate
     * @param {object} newValue information to update of certificate
     * @return {object} return updated certificate
     */
    static async update({ id, fieldToUpdate, newValue }) {
        const filter = { id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCertificate;
    }

    /**
     * delete Certificate with id in DB
     *
     * @param {string} newCertificate new certificate to create
     * @return {object} return result of delete process
     */
    static async delete({ id }) {
        const result = await CertificateModel.deleteOne({ id });
        return result;
    }
}

export { Certificate };
