import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../db";

/**
 * @typedef {string} field
 * @typedef {Object.<string, any>} record
 * @typedef {Object.<string, string>} populator
 * @typedef {[string, any]} kvpair
 */

/** Base class for Services. Mainly verifies the data fields passing through.
 *
 * @prop {BaseModel} Model
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
 * @method static async add(record) {}
 * @method static async get({ id, ...record }) {}
 * @method static async getAll(record) {}
 * @method static async getSiblings({ user_id }) {}
 * @method static async set(record) {}
 * @method static async del({ id }) {}
 */
class BaseService {
    static Model = BaseModel;
    static requiredFields = Object.freeze([]);
    static optionalFields = Object.freeze([]);
    static uniqueFields = Object.freeze([]);
    static searchableFields = Object.freeze([]);

    static refFields = Object.freeze({});

    static allFields = Object.freeze([
        ...this.requiredFields,
        ...this.optionalFields,
    ]);

    /**
     *
     * @param {record} record
     */
    static async add(record) {}
    static async get({ id, ...record }) {}
    static async getAll(record) {}
    static async getSiblings({ user_id }) {}
    static async set(record) {}
    static async del({ id }) {}
}

export { BaseService };
