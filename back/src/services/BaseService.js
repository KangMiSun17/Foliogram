import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../db";
import { Logger } from "../utils/logging";

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
 * @param {Logger} logger
 *  - logger instance to use. Defaults to console.
 *
 * ## Methods
 * @constructor constructor({ logger })
 * @method async add(record)
 *  - Add a record to the user.
 * @method async get({ id, ...query })
 *  - Find the first record that exactly matches the id.
 * @method async set({ id, ...record })
 *  - Modify a record.
 * @method async del({ id, ...query })
 *  - Remove a project.
 *
 * ## Static properties
 * @prop {BaseModel} Model
 * @prop {string} name
 *  - The record kind's general name.
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
 * @prop {field[]} allFields - All existing fields, only these are allowed in.
 *
 * ## Properties
 * @prop {Logger} logger
 *  - Instance of logger; Defaults to console.
 */
class BaseService {
    Model = BaseModel;

    // name = "base";
    // #_user_id_amend silently amends the mistake in Award, Project schemas
    // whose owner field names are set to some overcomplicated names instead of
    // just 'user_id'.
    // static #_user_id_amend = null;
    deletable = true;

    requiredFields = Object.freeze([]);
    optionalFields = Object.freeze([]);
    settableFields = Object.freeze([]);
    uniqueFields = Object.freeze([]);
    searchableFields = Object.freeze([]);

    refFields = Object.freeze({});

    allFields = Object.freeze([...this.requiredFields, ...this.optionalFields]);

    logger;

    /**
     *
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
     * @returns {record} added
     */
    async add(record) {
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

    /** Find the first record that exactly matches the id and optional query.
     *
     * @static
     * @async
     * @param {{id: uuid, query: record}} payload
     * @returns {record|null} found - If not found, just null.
     *      It will not emit error message.
     */
    async get({ id, ...query }) {
        console.log(`${this.name}Service.get > `, arguments[0]);

        // Confirmed, null query is ok.
        // Probably because we don't have any null in the db.
        // Yet.
        // Hmm
        // if (!id) {
        //     throw new Error(`Bad query: ${arguments[0]}`)
        // }

        const found = await this.Model.find({ id, ...query });

        return found;
    }

    /** This is a placeholder to get populated? not? child refs.
     *
     * @param {field} path
     * @returns {record|record[]} children
     */
    async getChildren({ path }) {}

    /** Modify a record.
     *
     * @static
     * @async
     * @param {{id: uuid, record: record}} payload
     * @returns {record|null} updated
     */
    async set({ id, ...record }) {
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
     * @param {{id: uuid, query: record}} payload
     * @returns {record|null} removed
     *
     * It is an error to attempt to delete an undeletable record.
     */
    async del({ id, ...query }) {
        console.log(`${this.name}.del > `, arguments[0]);
        if (this.deletable) {
            const removed = await this.Model.delete({ id, ...query });

            return removed;
        } else {
            throw new Error(`${this.name} is not deletable`);
        }
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
     *      It will not emit error message.
     */
    async getAll(query = {}) {
        console.log(`${this.name}Service.getAll > `, arguments[0]);
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
 */
class SubrecordService extends BaseService {
    ownerField = "user_id";

    /** Find and return the *parent* of the found record.
     *
     * @param {{id: uuid, query: record}} payload
     *  - Aside from id, optional queries may be provided.
     * @returns {record|null} parent
     *  - `null`: The record itself exists and it just has no parent.
     *  - Error: The record was not found.
     */
    async getParent({ id, ...query }) {
        console.log(`${this.name}Service.getParent > `, arguments[0]);

        const me = await this.Model.find({ id, ...query });
        if (!me) {
            throw new Error(
                `${this.name} with query ${artuments[0]} not found`
            );
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
        console.log(`${this.name}Service.getSiblings > `, arguments[0]);

        const query = { [this.ownerField]: user_id };
        const found = await this.Model.findAll(query);

        return found;
    }
}

export { BaseService, ToprecordService, SubrecordService };
