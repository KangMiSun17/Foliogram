import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../db";

/**
 * @typedef {string} fieldname
 * @typedef {[string, any]} kvpair
 */

/** Base class for Services. Mainly verifies the data fields passing through.
 *
 * @prop {BaseModel} Model
 * @prop {fieldname[]} requiredFields - Required field names.
 * @prop {fieldname[]} optionalFields - Optional field names.
 * @prop {fieldname[]} uniqueFields -
 *      Field names that should not happen twice in the db.
 * @prop {fieldname[]} searchableFields -
 *      Field names that are searchable with substring.
 * @prop {{fieldname}} populatableFields -
 *      Indicates that KEY fields need to be populated with VALUEs.
 * @prop {fieldname[]} allFields -
 *      All existing fields, only these are allowed in.
 *
 * @method static async add(fields) {}
 * @method static async get({ id, ...fields }) {}
 * @method static async getAll(fields) {}
 * @method static async getSiblings({ user_id }) {}
 * @method static async set(fields) {}
 * @method static async del({ id }) {}
 */
class BaseService {
    static Model = BaseModel;
    static requiredFields = Object.freeze([]);
    static optionalFields = Object.freeze([]);
    static uniqueFields = Object.freeze([]);
    static searchableFields = Object.freeze([]);
    static popoulatableFields = Object.freeze({});

    static allFields = Object.freeze([
        ...this.requiredFields,
        ...this.optionalFields,
    ]);

    /**
     *
     * @param {Object.<string, string>} fields
     */
    static async add(fields) {}
    static async get({ id, ...fields }) {}
    static async getAll(fields) {}
    static async getSiblings({ user_id }) {}
    static async set(fields) {}
    static async del({ id }) {}
}

export { BaseService };
