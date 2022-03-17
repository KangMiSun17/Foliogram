import { ProjectModel } from "../schemas/project";

/** Static container class for project model.
 *
 * @class
 * @method static async create({ newProject })
 * @method static async findById({ project_id })
 * @method static async findByTitle({ title })
 * @method static async findAll()
 * @method static async searchByParticipant({ participant_id })
 * @method static async update({ project_id, pairs })
 * @method static async delete({ project_id })
 */
class Project {
    /** Create new Project.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {Object} payload.newProject
     * @param {uuid} payload.newProject.id
     * @param {uuid} payload.newProject.participant_id
     * @param {String} payload.newProject.title
     * @param {String} payload.newProject.from_date - YYYY-MM-DD
     * @param {String} [payload.newProject.to_date] - YYYY-MM-DD
     * @param {String} [payload.newProject.description]
     * @returns {project|null} created
     */
    static async create({ newProject }) {
        console.log(`model.create: received ${newProject}`);
        const created = await ProjectModel.create(newProject);
        return created;
    }
    /** Find a project by id.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.project_id
     * @returns {project|null} found
     */
    static async findById({ project_id }) {
        const found = await ProjectModel.findOne({ id: project_id });
        return found;
    }

    /** Find a project by exact title.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {String} payload.title - must be exact.
     * @returns {project|null} found
     */
    static async findByTitle({ title }) {
        const found = await ProjectModel.findOne({ title });
        return found;
    }

    /** Fetch all the projects like there's no tomorrow.
     *
     * @static
     * @async
     * @returns {project[]} found
     *
     * This method was named against the find/search convention for the sake of
     * consistency with the existing User MVP.
     */
    static async findAll() {
        const found = await ProjectModel.find({});
        return found;
    }

    /** @todo Not implemented .search yet. */

    /** Find projects that were given to specific user using uuid.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.participant_id
     * @returns {project[]} found
     */
    static async searchByParticipant({ participant_id }) {
        const found = await ProjectModel.find({ participant_id });
        return found;
    }

    /** Update a project.
     *
     * @static
     * @async
     * @param {Object} payload - An Object containing project id and data.
     * @param {uuid} payload.project_id
     * @param {String[]} payload.pairs - Array of [key, value] pairs.
     * @returns {project} updated
     *
     */
    static async update({ project_id, pairs }) {
        const filter = { id: project_id };
        // const update = { [fieldToUpdate]: newValue };
        const update = Object.fromEntries(pairs);
        const option = { returnOriginal: false };

        const updated = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updated;
    }

    /** Delete a project.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.project_id
     * @returns {project} deleted
     */
    static async delete({ project_id }) {
        const deleted = await ProjectModel.findOneAndDelete({ id: project_id });
        return deleted;
    }
}

export { Project };
