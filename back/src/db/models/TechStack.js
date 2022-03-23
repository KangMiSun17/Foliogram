import { TechStackModel } from "../schemas/techstack";
import { BaseModel } from "./BaseModelWrapper";

/** Base class for Models. Implements simple CRUD interface.
 *
 * @prop {TechStackModel} Model
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
class TechStack extends BaseModel {
    static Model = TechStackModel;
}

export { TechStack };
