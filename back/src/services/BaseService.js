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
 *
 * @prop {BaseModel} Model
 * @prop {string} name
 * @prop {field[]} requiredFields - Required field names.
 * @prop {field[]} optionalFields - Optional field names.
 * @prop {field[]} uniqueFields -
 *      Field names that should not happen twice in the db.
 * @prop {field[]} searchableFields -
 *      Field names that are searchable with substring.
 * @prop {populator} refFields -
 *      Indicates that KEY fields need to be populated with VALUEs.
 * @prop {field[]} allFields -
 *      All existing fields, only these are allowed in.
 *
 * @method static async add(record) {} -
 *      Add a record to the user.
 * @method static async get({ id, ...record }) {}
 * @method static async getAll(record) {}
 * @method static async getSiblings({ user_id }) {}
 * @method static async set(record) {}
 * @method static async del({ id }) {}
 */
class BaseService {
    static Model = BaseModel;

    static name = "base";
    // _user_id_amend silently amends the mistake in Award, Project schemas
    // whose owner field names are set to some overcomplicated names instead of
    // just 'user_id'.
    static #_user_id_amend = null;

    static requiredFields = Object.freeze([]);
    static optionalFields = Object.freeze([]);
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
            Object.entries(record).filter(([k, v]) =>
                this.allowedFields.includes(k)
            )
        );

        // Then see if it has all we need.
        // These fields are required.
        this.requiredFields.forEach((k) => {
            if (!(k in data)) {
                throw new Error(`${k} field is required`);
            }
        });

        // So far, so good.
        data.id = uuidv4();

        const added = await this.Model.create(data);
        console.log(`${this.name}.add > added=`, added);

        return added;
    }

    static async get({ id, ...record }) {}
    static async getAll(record) {}
    static async getUserOwned({ user_id }) {}
    static async set(record) {}
    static async del({ id }) {}
}

export { BaseService };
