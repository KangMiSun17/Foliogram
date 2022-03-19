/**
 * @typedef {any} Model - Mongoose model.
 * @typedef {[string, any]} kvpair - Key, value pair.
 */

/** Base class for Models. Implements simple CRUD interface.
 *
 * @prop {Model} Model - static
 * @method static async create(fields) {}
 * @method static async find(kvpairs) {}
 * @method static async findAll(kvpairs) {}
 * @method static async search({ op, regex, kvpairs }) {}
 * @method static async update({ id, kvpairs }) {}
 * @method static async delete({ id }) {}
 */
class BaseModel {
    static Model;

    static async create(fields) {}
    static async find(kvpairs) {}
    static async findAll(kvpairs) {}
    static async search({ op, regex, kvpairs }) {}
    static async update({ id, kvpairs }) {}
    static async delete({ id }) {}
}

export { BaseModel };
