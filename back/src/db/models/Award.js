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
     * @param {Object} newAward
     * @param {uuid} newAward.id
     * @param {String} newAward.title
     * @param {user} newAward.awardee
     * @param {String} [newAward.description]
     * @returns {award|null} created
     */
    static async create({ newAward }) {
        const created = await AwardModel.create(newAward);
        return created;
    }

    /** Find an award by id.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.award_id
     * @returns {award|null} award
     */
    static async findById({ award_id }) {
        const award = await AwardModel.findOne({ id: award_id });
        return award;
    }

    /** Find an award by exact title.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {String} payload.title - must be exact.
     * @returns {award|null} award
     */
    static async findByTitle({ title }) {
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
     * @param {Object} payload
     * @param {RegExp|String} payload.title
     * @param {RegExp|String} payload.description
     * @returns {[award]} awards
     *
     * Query keysords may either be RegExp literal or compiled RegExp object.
     * Regex options, if any, will have to be added inline.
     * Because I feel too lazy at the moment.
     * You can omit either, or both of them, in which case it will fetch just
     * all of them.
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
    static async search({ title, description }) {
        const query = {};
        if (title) {
            query["title"] = { $regex: title };
        }
        if (description) {
            query["description"] = { $regex: description };
        }
        const awards = await AwardModel.find(query);
        return awards;
    }

    /** Find awards that were given to specific user using uuid.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.user_id - As RegExp literal or compiled RegExp Object.
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
     * @param {uuid} payload.award_id
     * @param {field} payload.fieldToUpdate
     * @param {any} payload.newValue
     * @returns {award} updated
     */
    static async update({ award_id, fieldToUpdate, newValue }) {
        const filter = { id: award_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updated = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updated;
    }

    /** Delete an award.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.award_id
     * @returns {award} deleted
     *
     * @todo The control layer must respond as {result: true/false}.
     */
    static async delete({ awrad_id }) {
        const deleted = await Award.findOneAndDelete({ id: award_id });
        return deleted;
    }
}

export { Award };
