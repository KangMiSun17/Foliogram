import { EducationModel } from '../schemas/education';

class Education {
    /**
     * create new Education in DB
     *
     * @param {object} newEducation new Education to create
     * @return {object} return new created Education
     */
    static async create({ newEducation }) {
        const createdEducation = await EducationModel.create(newEducation);
        return createdEducation;
    }

    /**
     *  find Educations with user_id of user in DB
     *
     * @param {string} user_id user_id of user
     * @return {object} return Educations of user
     */
    static async searchByUserId({ user_id }) {
        const educations = await EducationModel.find({ user_id });
        return educations;
    }

    /**
     * find One Education with id of Education in DB
     *
     * @param {string} id id of Education
     * @return {object} return finded Education with id
     */
    static async findById({ id }) {
        const education = await EducationModel.findOne({ id });
        return education;
    }

    /**
     * update Education in DB
     *
     * @param {string} id id of education
     * @param {string} fieldToUpdate field to update of education
     * @param {object} newValue information to update of education
     * @return {object} return updated education
     */
    static async update({ id, fieldToUpdate, newValue }) {
        const filter = { id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedEducation;
    }

    /**
     * delete Education with id in DB
     *
     * @param {string} id new education to create
     * @return {object} return result of delete process
     */
    static async delete({ id }) {
        const result = await EducationModel.deleteOne({ id });
        return result;
    }
}

export { Education };
