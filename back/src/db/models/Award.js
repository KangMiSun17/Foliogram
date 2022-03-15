import { AwardModel } from "../schemas/award";

/** Static container class for award model.
 *
 * @class
 */
class Award {
    /** Create new Award.
     *
     * @static
     * @async
     * @param {award} {newAward} - Award schema fields.
     *  newAward = {
     *      {uuid} id,
     *      {String} name,
     *      {ref} awardee,
     *      [
     *          {String} description
     *      ]
     *  }
     */
    static async create({ newAward }) {
        const award = await AwardModel.create(newAward);
        return award;
    }

    /** Find an award by id.
     *
     * @static
     * @async
     * @param {uuid} award_id
     * @returns {award} award
     */
    static async findById({ award_id }) {
        const award = await AwardModel.findOne({ id: award_id });
        return award;
    }

    /** Find an award by exact name.
     *
     * @static
     * @async
     * @param {String} name - must be exact.
     */
    static async findByName({ name }) {
        const award = await AwardModel.findOne({ name });
        return award;
    }

    /** Find awards if its name contains the search keyword.
     *
     * @static
     * @async
     * @param {String} name
     *
     * @todo Implement optional regex match.
     */
    static async searchByName({ name }) {
        const award = await AwardModel.find({ $regex: "" });
    }

    static async searchByDescription({ keyword }) {
        // const award = await AwardModel.findOne({ id: award_id });
        // return award;
    }

    static async searchByAwardee({ user }) {
        // const awards = await AwardModel.find({});
        // return awards;
    }

    static async update({ award_id, fieldToUpdate, newValue }) {
        // const filter = { id: award_id };
        // const update = { [fieldToUpdate]: newValue };
        // const option = { returnOriginal: false };
        // const updatedUser = await AwardModel.findOneAndUpdate(
        //   filter,
        //   update,
        //   option
        // );
        // return updatedAward;
    }
}

export { Award };
