/**
 * @typedef {any} Model - Mongoose model.
 * @typedef {Object.<string, any>} record
 * @typedef {[string, any]} kvpair - Key, value pair.
 */

/** Base class for Models. Implements simple CRUD interface.
 *
 * @prop {Model} Model - static
 * @method static async create(fields) {}
 * @method static async find(fields) {}
 * @method static async findAll() {}
 * @method static async search({ op, regex, ...fields }) {}
 * @method static async update({ id, ...fields }) {}
 * @method static async delete({ id }) {}
 */
class BaseModel {
    static Model;

    static async create(record) {}
    static async find(record) {}
    static async findAll() {}
    static async search({ op, regex, ...record }) {}
    static async update({ id, ...record }) {}
    static async delete({ id }) {}
}

export { BaseModel };
