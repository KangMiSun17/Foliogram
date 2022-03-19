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
 * @prop {fieldname[]} allFields -
 *      All existing fields, only these are allowed in.
 */
class BaseService {
    static Model = BaseModel;
    static requiredFields = Object.freeze([]);
    static optionalFields = Object.freeze([]);
    static uniqueFields = Object.freeze([]);
    static searchableFields = Object.freeze([]);

    static allFields = Object.freeze([
        ...this.requiredFields,
        ...this.optionalFields,
    ]);

    static async add(fields) {}
    static async get({ id, kvpair }) {}
    static async getAll(kvpair) {}
    static async getSiblings({ user_id }) {}
    static async set(fields) {}
    static async del({ id }) {}
}

export { BaseService };
