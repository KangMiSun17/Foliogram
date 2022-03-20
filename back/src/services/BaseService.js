import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../db";

/**
 * @typedef {string} field
 * @typedef {Object.<string, any>} record
 * @typedef {Object.<string, string>} populator
 * @typedef {[string, any]} kvpair
 * @typedef {string} uuid
 */

/** Base class for Services. Mainly verifies the data fields passing through.
 * @todo check unique in [ ] add, [ ] set
 *
 * @prop {BaseModel} Model
 * @prop {string} name
 * @prop {Boolean} deletable - If true, this Service allows deletion of records.
 * @prop {field[]} requiredFields - Required field names.
 * @prop {field[]} optionalFields - Optional field names.
 * @prop {field[]} settableFields
 *  - Field names that are allowed to be modified.
 * @prop {field[]} uniqueFields
 *  - Field names that should not happen twice in the db.
 * @prop {field[]} searchableFields
 *  - Field names that are searchable with substring.
 * @prop {populator} refFields
 *  - Indicates that KEY fields need to be populated with VALUEs.
 * @prop {field[]} allFields - All existing fields, only these are allowed in.
 *
 * @method static async add(record) - Add a record to the user.
 * @method static async get({ id })
 *  - Find the first record that exactly matches the id.
 * @method static async getAll(query)
 *  - Find every last record there is (that matches the optional query).
 * @method static async getUserOwned({ user_id })
 *  - Find all records that belong to the user.
 * @method static async set({ id, ...record }) - Modify a record.
 * @method static async del({ id }) - Remove a project.
 */
class BaseService {
    static Model = BaseModel;

    static name = "base";
    // #_user_id_amend silently amends the mistake in Award, Project schemas
    // whose owner field names are set to some overcomplicated names instead of
    // just 'user_id'.
    static #_user_id_amend = null;
    static deletable = true;

    static requiredFields = Object.freeze([]);
    static optionalFields = Object.freeze([]);
    static settableFields = Object.freeze([]);
    static uniqueFields = Object.freeze([]);
    static searchableFields = Object.freeze([]);

    static refFields = Object.freeze({});

    static allFields = Object.freeze([
        ...this.requiredFields,
        ...this.optionalFields,
    ]);

    /** Add a record to the user.
     *
     * @static
     * @async
     * @param {record} record
     * @returns {record} added
     */
    static async add(record) {
        console.log(`${this.name}.add >`, arguments[0]);

        // Squash unnecessary fields first.
        const data = Object.fromEntries(
            Object.entries(record).filter(([k, v]) => {
                return this.allFields.includes(k);
            })
        );

        // Then see if it has all we need.
        // These fields are required.
        this.requiredFields.forEach((k) => {
            if (!(k in data)) {
                throw new Error(
                    `${k} field is required for ${this.name} record`
                );
            }
        });

        // So far, so good.
        data.id = uuidv4();

        const added = await this.Model.create(data);
        console.log(`${this.name}.add > added=`, added);

        return added;
    }

    /** Find the first record that exactly matches the id.
     *
     * @static
     * @async
     * @param {{id: uuid}} payload
     * @returns {record|null} found - If not found, just null.
     *      It will not emit error message.
     */
    static async get({ id }) {
        console.log(`${this.name}Service.get > `, arguments[0]);

        // Confirmed, null query is ok.
        // Probably because we don't have any null in the db.
        // Yet.
        // Hmm
        // if (!id) {
        //     throw new Error(`Bad query: ${arguments[0]}`)
        // }

        const found = await this.Model.find({ id });

        return found;
    }

    /** Find every last record there is (that matches the optional query).
     *
     * @static
     * @async
     * @param {record} [query]
     * @returns {record[]} found - If none, return an empty Array.
     *      It will not emit error message.
     */
    static async getAll(query) {
        console.log(`${this.name}Service.getAll > `, arguments[0]);

        // It's ok to omit query!
        if (!query) {
            query = {};
        }
        const found = await this.Model.findAll(query);
        return found;
    }

    /** Find all records that belong to the user.
     *
     * @static
     * @async
     * @param {{user_id: uuid}} payload
     * @returns {project[]} found - If none, return an empty Array.
     *  It will not emit error message.
     */
    static async getUserOwned({ user_id }) {
        console.log(`${this.name}Service.getUserOwned > `, arguments[0]);

        const query = {};
        if (this.#_user_id_amend) {
            // Passing this test means that at some point of the past I
            // fucked up hard and now facing the consequences.
            query[this.#_user_id_amend] = user_id;
        } else {
            query.user_id = user_id;
        }

        const found = await this.Model.findAll(query);

        return found;
    }

    /** Modify a record.
     *
     * @static
     * @async
     * @param {{id: uuid, record: record}} payload
     * @returns {record|null} updated
     */
    static async set({ id, ...record }) {
        console.log(`${this.name}Service.set > `, arguments[0]);

        // We're picking out uneditable entries here.
        const toUpdate = Object.fromEntries(
            Object.entries(record).filter(([k, v]) => {
                return this.settableFields.includes(k);
            })
        );

        const updated = await this.Model.update({ id, ...record });

        return updated;
    }

    /** Remove a project.
     *
     * @static
     * @async
     * @param {{id}} payload
     * @returns {record|null} removed
     *
     * It is an error to attempt to delete an undeletable record.
     */
    static async del({ id }) {
        console.log(`${this.name}.del > `, arguments[0]);
        if (this.deletable) {
            const removed = await this.Model.delete({ id });

            return removed;
        } else {
            throw new Error(`${this.name} is not deletable`);
        }
    }
}

export { BaseService };
