import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

/** /project/create post router
 *
 * @implements POST /project/create
 * @returns {project} created
 *
 * headers = { "authorization": bearer }
 * body = {
 *  "user_id",
 *  "title",
 *  "from_date",
 *  ["to_date",]
 *  ["description",]
 * }
 *
 * Sample req.body = {
 *  "user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
 *  "title":"react 프로젝트",
 *  "description":"프론트엔드 역량을 키웠습니다!",
 *  "from_date":"2021-03-20",
 *  "to_date":"2021-04-20"
}
 */
projectRouter.post(
    "/project/create",
    login_required,
    async function (req, res, next) {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요"
                );
            }
            console.log(`POST /project/create req.body=`, req.body);

            // These fields are required.
            ["user_id", "title", "from_date"].forEach((k) => {
                if (!(k in req.body)) {
                    throw new Error(`${k} field is required`);
                }
            });

            if (req.body.user_id !== req.currentUserId) {
                throw new Error("Trying to create different user's project");
            }

            const payload = { ...req.body };
            payload.participant_id = payload.user_id;
            delete payload.user_id;

            const newProject = await projectService.addProject(payload);

            res.status(201).json(newProject);
        } catch (why) {
            next(why);
        }
    }
);

/** /projects/:id get router
 *
 * @implements GET /projects/:id
 * @returns {project|null} project
 */
projectRouter.get(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        // Here we get the id of a project and give back a single project.
        // It's possible to try first by exact name and retry with the id,
        // but it's a bit awkward.
        // On reflection, writing findByTitle wasn't all that smart after all.
        try {
            const project_id = req.params.id;
            console.log(`GET /projects/${project_id}`);
            const found = await projectService.getProject({ project_id });
            res.status(200).json(found);
        } catch (why) {
            next(why);
        }
    }
);

/** /projects/:id put router
 *
 * @implements PUT /projects/:id
 * @returns {project} updated
 *
 * Sample body = {
 *  "title":"express 프로젝트",
 *  "description":"프론트엔드 말고 백엔드 역량을 키웠습니다!",
 *  "from_date":"2021-05-20",
 *  "to_date":"2021-06-20"
}
 */
projectRouter.put(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        try {
            const project_id = req.params.id;
            const user_id = req.currentUserId;

            const project = await projectService.getProject({ project_id });
            if (!project) {
                throw new Error(`Project id ${project_id} not found`);
            } else if (project.participant_id !== user_id) {
                throw new Error(
                    `User is not an owner of the project id ${project_id}`
                );
            }

            console.log(
                `PUT /projects/:${project_id},
user_id=${user_id},
participant_id=${project.participant_id}`
            );
            console.log(req.body);

            const updated = await projectService.setProject({
                project_id,
                pairs: Object.entries(req.body),
            });

            res.status(200).json(updated);
        } catch (why) {
            next(why);
        }
    }
);

/** /projectlist/:user_id get router
 *
 * @implements GET /projectlist/:user_id
 * @returns {[project]} projects
 */
projectRouter.get(
    "/projectlist/:user_id",
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.user_id;
            const projects = await projectService.getUserProjects({
                participant_id: user_id,
            });

            res.status(200).json(projects);
        } catch (why) {
            next(why);
        }
    }
);

/** /projects/:id delete router
 *
 * @implements DELETE /projects/:id
 * @returns {Object} payload
 * @returns {Boolean} payload.result
 *
 * @todo The control layer must respond as {result: true/false}.
 */
projectRouter.delete(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        try {
            const project_id = req.params.id;

            console.log(`DELETE /projects/:${project_id}`);

            const deleted = await projectService.removeProject({ project_id });

            res.status(deleted ? 200 : 500).json({ result: !!deleted });
        } catch (why) {
            next(why);
        }
    }
);

export { projectRouter };
