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

    /** Find awards whose name contains the search keyword.
     *
     * @static
     * @async
     * @param {RegExp-like} name - As RegExp literal or compiled RegExp Object.
     *
     * @hack Apparently, it's not possible to query like `text.includes(pattern)`
     * in mongodb. Also apparently there is no such thing as RegEx.escape in js
     * which is a big bummer.
     * So, optional regex is not (quite) possible, and auto-escape is somewhat
     * hackish.
     * Will probably have to make our own escape funciton.
     * Tried $indexOfCP aggregation; atlas says the operator is not availble
     * for free clusters.
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
