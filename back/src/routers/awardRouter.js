import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
// import { userAuthService } from "../services/userService";

const awardRouter = Router();

/** /award/create post router
 *
 * @implements POST /award/create
 * @returns {award} created
 *
 * headers = { "authorization": bearer }
 * body = {
 *  "user_id",
 *  "title",
 *  ["description",]
 * }
 *
 * Sample req.body = {
 *  "user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
 *  "title":"개근상 수상",
 *  "description":"하루도 빠짐없이 출석하였습니다."
 * }
 */
awardRouter.post(
    "/award/create",
    login_required,
    async function (req, res, next) {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요"
                );
            }

            const title = req.body.title ?? null;
            if (!title) {
                throw new Error("title field is required.");
            }

            // const user_id = req.currentUserId;
            const user_id = req.body.user_id ?? null;
            if (!user_id) {
                throw new Error("user_id is required in the request body");
            } else if (user_id !== req.currentUserId) {
                throw new Error("Trying to create different user's award");
            }

            const description = req.body.description ?? null;

            // const awardee = await userAuthService.getUser({ user_id });
            const newAward = await awardService.addAward({
                awardee_id: user_id,
                title,
                description,
            });

            res.status(201).json(newAward);
        } catch (why) {
            next(why);
        }
    }
);

/** /awards/:id get router
 *
 * @implements GET /awards/:id
 * @returns {award|null} award
 */
awardRouter.get("/awards/:id", login_required, async function (req, res, next) {
    // Here we get the id of an award and give back a single award.
    // It's possible to try first by exact name and retry with the id,
    // but it's a bit awkward.
    // On reflection, writing findByTitle wasn't all that smart after all.
    try {
        const award_id = req.params.id;
        console.log(`GET /awards/${award_id}`);
        const found = await awardService.getAward({ award_id });
        res.status(200).json(found);
    } catch (why) {
        next(why);
    }
});

/** /awards/:id put router
 *
 * @implements PUT /awards/:id
 * @returns {award} updated
 *
 * Sample body = {
 *  "title": "행복한 상",
 *  "description":"행복해서 상을 받았습니다."
 * }
 */
awardRouter.put("/awards/:id", login_required, async function (req, res, next) {
    try {
        const award_id = req.params.id;
        const user_id = req.currentUserId;

        const award = await awardService.getAward({ award_id });
        if (!award) {
            throw new Error(`Award id ${award_id} not found`);
        } else if (award.awardee_id !== user_id) {
            throw new Error(`User is not an owner of the award id ${award_id}`);
        }

        console.log(
            `PUT /awards/:${award_id},
user_id=${user_id},
awardee_id=${award.awardee_id}`
        );
        console.log(req.body);

        const updated = await awardService.setAward({
            award_id,
            pairs: Object.entries(req.body),
        });

        res.status(200).json(award);
    } catch (why) {
        next(why);
    }
});

/** /awardlist/:user_id get router
 *
 * @implements GET /awardlist/:user_id
 * @returns {[award]} awards
 */
awardRouter.get(
    "/awardlist/:user_id",
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.user_id;
            const awards = await awardService.getUserAwards({
                awardee_id: user_id,
            });

            res.status(200).json(awards);
        } catch (why) {
            next(why);
        }
    }
);

/** /awards/:id delete router
 *
 * @implements DELETE /awards/:id
 * @returns {Object} payload
 * @returns {Boolean} payload.result
 *
 * @todo The control layer must respond as {result: true/false}.
 */
awardRouter.delete(
    "/awards/:id",
    login_required,
    async function (req, res, next) {
        try {
            const award_id = req.params.id;

            console.log(`DELETE /awards/:${award_id}`);

            const deleted = await awardService.removeAward({ award_id });

            res.status(deleted ? 200 : 500).json({ result: !!deleted });
        } catch (why) {
            next(why);
        }
    }
);

export { awardRouter };
