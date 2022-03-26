import { CertificateModel } from "../schemas/certificate";
import { BaseModel } from "./BaseModelWrapper";

/** Base class for Models. Implements simple CRUD interface.
 *
 * @prop {CertificateModel} Model
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
class Certificate extends BaseModel {
    static Model = CertificateModel;
}

export { Certificate };
