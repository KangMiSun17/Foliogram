/**
 * @typedef {any} Model - Mongoose model.
 * @typedef {Object.<string, any>} record
 * @typedef {[string, any]} kvpair - Key, value pair.
 * @typedef {string} uuid
 */

/** Base class for Models. Implements simple CRUD interface.
 *
 * @prop {Model} Model
 * @method static async create(record)
 *  - Create new record.
 * @method static async find(query)
 *  - Find a record by the given query.
 * @method static async findAll(query)
 *  - Find multiple records by the given query.
 * @method static async update({ id, ...fields })
 *  - Update a record.
 * @method static async delete({ id })
 *  - Delete a record.
 */
class BaseModel {
    static Model;

    /** Create new record.
     *
     * @static
     * @async
     * @param {record} record
     * @returns {record|null} created
     */
    static async create(record) {
        console.log(`Model.create: received ${record}`);
        const created = await this.Model.create(record);
        return created;
    }

    /** Find a record by the given query.
     *
     * @static
     * @async
     * @param {record} query
     * @returns {record|null} found
     */
    static async find(query) {
        const found = await this.Model.findOne(query);
        return found;
    }

    /** Find multiple records by the given query.
     *
     * @static
     * @async
     * @param {record} query
     * @returns {record[]} found
     */
    static async findAll(query = {}) {
        const found = await this.Model.find(query);
        return found;
    }

    /** Update a record.
     *
     * @static
     * @async
     * @param {{id: uuid, record: record}} payload
     * @returns {record} updated
     *
     */
    static async update({ id, ...record }) {
        const filter = { id };
        // const update = { [fieldToUpdate]: newValue };
        const update = record;
        const option = { returnOriginal: false };

        const updated = await this.Model.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updated;
    }

    /** Delete a record.
     *
     * @static
     * @async
     * @param {{id: uuid, ...query: record}} payload
     * @returns {record} deleted
     */
    static async delete({ id, ...query }) {
        const deleted = await this.Model.findOneAndDelete({ id, ...query });
        return deleted;
    }
    static async deleteAll({ user_id, ...query }) {
        const deleted = await this.Model.deleteMany({ user_id, ...query });
        return deleted;
    }
}

export { BaseModel };
