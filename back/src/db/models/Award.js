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
     *      {String} title,
     *      {user} awardee,
     *      [
     *          {String} description
     *      ]
     *  }
     * @returns {award} award
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

    /** Find an award by exact title.
     *
     * @static
     * @async
     * @param {String} title - must be exact.
     * @returns {award} award
     */
    static async findByName({ title }) {
        const award = await AwardModel.findOne({ title });
        return award;
    }

    /** Fetch all the awards like there's no tomorrow.
     *
     * @static
     * @async
     * @returns {[award]} awards
     *
     * This method was named against the find/search convention for the sake of
     * consistency with the existing User MVP.
     */
    static async findAll() {
        const awards = await AwardModel.find({});
        return awards;
    }

    /** Find awards whose title contains the search keyword.
     *
     * @static
     * @async
     * @param {RegExp-like} title - As RegExp literal or compiled RegExp Object.
     * @returns {[award]} awards
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
    static async searchByName({ title }) {
        const awards = await AwardModel.find({ title: { $regex: title } });
        return awards;
    }

    /** Find awards whose description contains the search keyword.
     *
     * @static
     * @async
     * @param {RegExp-like} keyword - As RegExp literal or compiled RegExp Object.
     * @returns {[award]} awards
     */
    static async searchByDescription({ keyword }) {
        const awards = await AwardModel.find({
            description: { $regex: keyword },
        });
        return awards;
    }

    /** Find awards that were given to specific user using uuid.
     *
     * @static
     * @async
     * @param {uuid} user_id - As RegExp literal or compiled RegExp Object.
     * @returns {[award]} awards
     */
    static async searchByAwardee({ user_id }) {
        const awards = await AwardModel.find({});
        return awards;
    }

    /** Update an award.
     *
     * @static
     * @async
     * @param {Object} payload - An Object containing award id and data.
     *  payload = {award_id, filedToUpdate, newValue}
     * @returns {award} updated
     */
    static async update({ award_id, fieldToUpdate, newValue }) {
        const filter = { id: award_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updatedUser = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedAward;
    }

    /** Delete an award.
     *
     * @static
     * @async
     * @param {uuid} award_id
     * @returns {award} deleted
     */
    static async delete({ awrad_id }) {
        const deleted = await Award.findOneAndDelete({ id: award_id });
        return deleted;
    }
}

export { Award };
