import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../db";
import { Logger } from "../utils/logging";
import * as status from "../utils/status";

/**
 * @typedef {string} field
 * @typedef {Object.<string, any>} record
 * @typedef {Object.<string, string>} populator
 * @typedef {[string, any]} kvpair
 * @typedef {string} uuid
 * @typedef {{errorMessage: string, statusCode: number}} errorinfo
 */

/** Base class for Services. Mainly verifies the data fields passing through.
 * @todo leave required field verification, check unique up to Router
 * @todo don't throw errors here; just error message and? status codes.
 *
 * ## Constructor
 * @constructor
 * @param {{Logger}} logger
 * ```js
 * { logger: Logger = console}
 * ```
 *  - logger instance to use. Defaults to console.
 *
 * ## Methods
 * Service layer doesn't directly throws error.
 * Instead they silently hand you an `errorinfo` object, which looks like:
 * ```js
 * {errorMessage: string, statusCode: number}
 * ```
 * ---
 * @method async add(record)
 *  - Add a record to the user.
 * @method async get({ id, ...query })
 *  - Find the first record that exactly matches the id.
 * @method async set({ id, currentUserId, ...record })
 *  - Modify a record.
 * @method async del({ id, currentUserId, ...query })
 *  - Remove a project.
 *
 * ## properties
 * @prop {BaseModel} Model
 * @prop {boolean} deletable
 *  - If true, this Service allows deletion of records.
 * @prop {field[]} requiredFields
 *  - Required field names.
 * @prop {field[]} optionalFields
 *  - Optional field names.
 * @prop {field[]} settableFields
 *  - Field names that are allowed to be modified.
 * @prop {field[]} uniqueFields
 *  - Field names that should not happen twice in the db.
 * @prop {field[]} searchableFields
 *  - Field names that are searchable with substring.
 * @prop {populator} refFields
 *  - Indicates that KEY fields need to be populated with VALUEs.
 * @prop {field[]} allFields
 *  - All existing fields, only these are allowed in.
 * @prop {Logger} logger
 *  - Instance of logger; Defaults to console.
 * @prop {field} authField
 *  - Used to check if any modification attempt is made by the record owner.
 *    Such as user_id.
 */
class BaseService {
    Model = BaseModel;

    deletable = true;

    requiredFields = Object.freeze([]);
    optionalFields = Object.freeze([]);
    settableFields = Object.freeze([]);
    uniqueFields = Object.freeze([]);
    searchableFields = Object.freeze([]);

    authField = "user_id";
    refFields = Object.freeze({});

    allFields = Object.freeze([...this.requiredFields, ...this.optionalFields]);

    logger;

    /**
     * @constructor
     * @param {{logger: Logger}} logger
     */
    constructor({ logger }) {
        this.logger = logger ?? console;
    }

    /** Add a record to the user.
     *
     * @static
     * @async
     * @param {record} record
     * @returns {?record|errorinfo} added
     *  - `record` when addition was successful.
     *  - `errorinfo` when something went south in a known way.
     *  - `null` when addtion was a failure for unexpected reason.
     */
    async add(record) {
        this.logger.log({}, `${this.name}.add >`, arguments[0]);

        const nonUniqueField = await this._notUnique(record);
        if (nonUniqueField) {
            return {
                errorMessage:
                    `${nonUniqueField}: ` +
                    `${record[nonUniqueField]} already exists`,
                statusCode: status.STATUS_403_FORBIDDEN,
            };
        }

        // Squash unnecessary fields.
        const data = this._tidy({ reference: this.allFields, ...record });

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

    /** Find the first record that exactly matches the id and optional query.
     *
     * @static
     * @async
     * @param {{id: uuid, query: record}} payload
     * @returns {?record|errorinfo} found - If not found, just null.
     *  It will not emit error message.
     *  - `record` when finding was successful.
     *  - `errorinfo` when something went south in a known way.
     *  - `null` when record could not be found.
     */
    async get({ id, ...query }) {
        this.logger.log({}, `${this.name}.get > `, arguments[0]);

        const found = await this.Model.find({ id, ...query });

        return found;
    }

    /** This is a placeholder to get populated? not? child refs.
     *
     * @param {field} path
     * @returns {record|record[]|errorinfo} children
     */
    async getChildren({ path }) {
        return {
            errorMessage: `getChildren is not implemented`,
            statusCode: status.STATUS_500_INTERNALSERVERERROR,
        };
    }

    /** Modify a record.
     *
     * @static
     * @async
     * @param {{id: uuid, currentUserId: uuid, record: record}} payload
     * @returns {?record|errorinfo} updated
     *  - `record` when update was successful.
     *  - `errorinfo` when something went south in a known way.
     *  - `null` when update was a failure for unexpected reason.
     */
    async set({ id, currentUserId, ...record }) {
        this.logger.log({}, `${this.name}.set > `, arguments[0]);

        const errorInfo = this._auth({ currentUserId, ...peek });
        if ("errorMessage" in errorInfo) {
            return errorInfo;
        }

        const nonUniqueField = await this._notUnique(record);
        if (nonUniqueField) {
            return {
                errorMessage:
                    `${nonUniqueField}: ` +
                    `${record[nonUniqueField]} already exists`,
                statusCode: status.STATUS_403_FORBIDDEN,
            };
        }

        // We're picking out uneditable entries here.
        const toUpdate = this._tidy({
            reference: this.settableFields,
            ...record,
        });

        const updated = await this.Model.update({ id, ...toUpdate });

        return updated;
    }

    /** Remove a project.
     *
     * @static
     * @async
     * @param {{id: uuid, currentUserId: uuid, query: record}} payload
     * @returns {record|null} removed
     *
     * It is an error to attempt to delete an undeletable record.
     */
    async del({ id, currentUserId, ...query }) {
        this.logger.log({}, `${this.name}.del > `, arguments[0]);
        if (this.deletable) {
            const peek = await this.Model.find({ id });
            if (!peek) {
                return {
                    errorMessage: `record {${id}} not found`,
                    statusCode: status.STATUS_404_NOTFOUND,
                };
            }

            const errorInfo = this._auth({ currentUserId, ...peek });
            if ("errorMessage" in errorInfo) {
                return errorInfo;
            }

            const removed = await this.Model.delete({ id, ...query });

            return removed;
        } else {
            return {
                errorMessage: `${this.name} is not deletable`,
                statusCode: status.STATUS_405_METHODNOTALLOWED,
            };
        }
    }

    /** Check fields that should be unique.
     *
     * @param {record} record
     * @returns {?field} nonUniqueField
     */
    async _notUnique(record) {
        if (this.uniqueFields.length) {
            const checkJobs = this.uniqueFields
                .filter((k) => k in record)
                .map((k) => {
                    return this.Model.find({ [k]: record[k] }).then((found) => {
                        return found ? k : null;
                    });
                });

            const nonUniqueField = await Promise.any(checkJobs);
            return nonUniqueField;
        } else {
            return null;
        }
    }

    /** Tidy up a record, removing unncecessary fields.
     *
     * @param {{reference: field[], record: record}} payload
     * @returns {record} tidied
     */
    _tidy({ reference, ...record }) {
        const tidied = Object.fromEntries(
            Object.entries(record).filter(([k, v]) => {
                return this.settableFields.includes(k);
            })
        );
        return tidied;
    }

    /** Only owner may modify his own records.
     *
     * @param {{currentUserId: uuid, record: record}} payload
     * @returns {Object|errorinfo}
     *  - Returns `{}` when good to go.
     */
    _auth({ currentUserId, ...record }) {
        if (currentUserId !== record[this.authField]) {
            return {
                errorMessage:
                    `User {${currentUserId}} is not allwed to ` +
                    `modify data of user {${record[this.authField]}}`,
                statusCode: status.STATUS_403_FORBIDDEN,
            };
        }
        return {};
    }
}

/** Service template for records that are a parent another records.
 *
 * @extends BaseService
 *
 * ## Methods
 * @method async getAll(query)
 *  - Find every last record there is (that matches the optional query).
 */
class ToprecordService extends BaseService {
    /** Find every last record there is (that matches the optional query).
     *
     * @static
     * @async
     * @param {record} [query]
     * @returns {record[]} found - If none, return an empty Array.
     *  It will not emit error message.
     */
    async getAll(query = {}) {
        this.logger.log({}, `${this.name}.getAll > `, arguments[0]);
        const found = await this.Model.findAll(query);
        return found;
    }
}

/** Service template for record kind that can be a child of another record.
 * That doesn't mean they shouldn't have children. They can.
 *
 * @extends BaseService
 *
 * ## Methods
 * @method async getParent({ id, ...query })
 *  - Find and return the *parent* of the found record.
 * @method async getSiblings({ user_id })
 *  - Find all records that belong to the owner, who isn't necessarily user.
 *
 * ## Properties
 * @prop {string} ownerField
 *  - Field name that indicaes this record's parent.
 */
class SubrecordService extends BaseService {
    ownerField = "user_id";

    async add({ currentUserId, ...record }) {
        const errorInfo = this._auth({ currentUserId, ...record });
        if ("errorMessage" in errorInfo) {
            return errorInfo;
        }
        return super.add(record);
    }

    /** Find and return the *parent* of the found record.
     *
     * @param {{id: uuid, query: record}} payload
     *  - Aside from id, optional queries may be provided.
     * @returns {record|null} parent
     *  - `null`: The record itself exists and it just has no parent.
     *  - Error: The record was not found.
     */
    async getParent({ id, ...query }) {
        this.logger.log({}, `${this.name}.getParent > `, arguments[0]);

        const me = await this.Model.find({ id, ...query });
        if (!me) {
            return {
                errorMessage: `parent record {${id}} not found`,
                statusCode: status.STATUS_404_NOTFOUND,
            };
        }

        const parent = await this.Model.find({
            [this.ownerField]: me[this.ownerField],
        });

        return parent;
    }

    /** Find all records that belong to the owner.
     *
     * @static
     * @async
     * @param {{user_id: uuid}} payload
     *  - The user_id field is named so because it's used a lot,
     *    but theoretically it can be any.
     * @returns {record[]} found
     *  - If none, return an empty Array. It will not emit error message.
     */
    async getSiblings({ user_id }) {
        this.logger.log({}, `${this.name}.getSiblings > `, arguments[0]);

        const query = { [this.ownerField]: user_id };
        const found = await this.Model.findAll(query);

        return found;
    }
}

export { BaseService, ToprecordService, SubrecordService };
