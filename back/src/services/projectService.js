import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

/** Static container class for services related to projects.
 *
 * @class
 * @method static async addProject({
 *      participant_id,
 *      title,
 *      from_date,
 *      to_date,
 *      description,
 *  })
 * @method static async getProject({ id, title })
 * @method static async getAllProjects()
 * @method static async getUserProjects({ participant_id })
 * @method static async searchProjects({ title, description })
 * @method static async setProject({ project_id, pairs })
 * @method static async removeProject({ project_id })
 */
class projectService {
    /** Add a project to the user.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.participant_id
     * @param {String} payload.title
     * @param {String} payload.from_date - YYYY-MM-DD
     * @param {String} [payload.to_date] - YYYY-MM-DD
     * @param {String} [payload.description]
     * @returns {project} added
     */
    static async addProject({
        participant_id,
        title,
        from_date,
        to_date,
        description,
    }) {
        const allowedFields = [
            "participant_id",
            "title",
            "from_date",
            "to_date",
            "description",
        ];
        const newProject = Object.fromEntries(
            Object.entries(arguments[0]).filter(([k, v]) =>
                allowedFields.includes(k)
            )
        );

        const id = uuidv4();
        newProject.id = id;

        console.log(`service.addProject >`, arguments);
        const added = await Project.create({ newProject });
        console.log(`service.addProject > added=${added}`);
        return added;
    }

    /** Find the first project that exactly matches id/title.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} [payload.project_id]
     * @param {String} [payload.title] - Must be an exact match.
     * @returns {project|null} found - If not found, just null.
     *  It will not emit error message.
     *
     * Both `id` and `title` are optional, but one of them must be provided.
     * Or we'll be oh so confused that we'll bail out.
     */
    static async getProject({ project_id, title }) {
        console.log(`service.getAward > `, arguments[0]);
        let found = null;
        if (project_id) {
            found = await Project.findById({ project_id });
        } else if (title) {
            found = await Project.findByName({ title });
        }

        return found;
    }

    /** Find every last project there is.
     *
     * @static
     * @async
     * @returns {project[]} found - If none, return an empty Array.
     *  It will not emit error message.
     */
    static async getAllProjects() {
        const found = await Project.findAll();
        return found;
    }

    /** Find all projects given to the user.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.participant_id
     * @returns {project[]} found - If none, return an empty Array.
     *  It will not emit error message.
     */
    static async getUserProjects({ participant_id }) {
        // ???
        console.log(`service.getUserAwards > `, arguments[0]);
        const found = await Project.searchByAwardee({ participant_id });
        return found;
    }

    /** Search projects with title/desc keywords.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {String} [payload.title]
     * @param {String} [payload.description]
     * @returns {project[]} found, or an empty Array.
     *
     * @todo We're not implementing this until regex escaping can be done.
     */
    static async searchProjects({ title, description }) {
        return [];
    }

    /** Modify a project.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.project_id
     * @param {String[][]} payload.pairs - Array of [key, value] pairs.
     * @returns {project} updated
     *
     * payload.pairs is an iterable of [key, value] pairs.
     * key will be the field and value will be the... value!!
     */
    static async setProject({ project_id, pairs }) {
        console.log(`service.setProject > `, arguments[0]);

        const allowedFields = [
            "participant_id",
            "title",
            "from_date",
            "to_date",
            "description",
        ];
        const updated = await Project.update({
            project_id,
            pairs: pairs.filter(([k, v]) => {
                return allowedFields.includes(k);
            }),
        });

        return updated;
    }

    /** Remove a project.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.project_id
     * @returns {project} removed
     */
    static async removeProject({ project_id }) {
        console.log(`service.removeAward > `, arguments[0]);
        const removed = await Project.delete({ project_id });
        console.log(`removed: `, removed);
        return removed;
    }
}

export { projectService };
