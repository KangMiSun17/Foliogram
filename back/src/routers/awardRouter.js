import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { RequestError } from "../utils/errors";
import * as status from "../utils/status";
import { Logger, LOGDIR, DEFAULT_LOG } from "../utils/logging";

const awardRouter = Router();

/* ==========================================================================
 * -------------            CopyPasta Constants here            -------------
 * ========================================================================== */
const SERVICE = awardService;
const ROUTER = awardRouter;
const ROUTE_TOP = "award";

const logger = new Logger({
    name_: `${ROUTE_TOP}Router`,
    tee: [DEFAULT_LOG, Logger.resolvePaths(LOGDIR, `${ROUTE_TOP}router.log`)],
});

ROUTER.post(
    `/${ROUTE_TOP}/create`,
    login_required,
    async function (req, res, next) {
        try {
            logger.log({ __level__: 2 }, `POST /${ROUTE_TOP}/create`);

            if (is.emptyObject(req.body)) {
                throw new RequestError(
                    `headers["Content-Type] needs to be "application/json"`
                );
            }

            const payload = { ...req.body };
            const created = await SERVICE.add({
                currentUserId: req.currentUserId,
                ...payload,
            });
            // See if the create contains errorinfo instead.
            if ("errorMessage" in created) {
                throw new RequestError(
                    { status: created.statusCode },
                    created.errorMessage
                );
            }

            res.status(status.STATUS_201_CREATED).json(created);
        } catch (error) {
            next(error);
        }
    }
);

ROUTER.get(
    `/${ROUTE_TOP}s/:id`,
    login_required,
    async function (req, res, next) {
        // Here we get the id of an award and give back a single award.
        try {
            const id = req.params.id;
            logger.log({ __level__: 2 }, `GET /${ROUTE_TOP}s/${id}`);

            const found = await SERVICE.get({ id });
            if ("errorMessage" in found) {
                throw new RequestError(
                    { status: found.statusCode },
                    found.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json(found);
        } catch (error) {
            next(error);
        }
    }
);

awardRouter.get(
    `/${ROUTE_TOP}list/:user_id`,
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.user_id;
            logger.log({ __level__: 2 }, `GET /${ROUTE_TOP}list/${user_id}`);

            const found = await SERVICE.getSiblings({ user_id });

            res.status(status.STATUS_200_OK).json(found);
        } catch (error) {
            next(error);
        }
    }
);

ROUTER.put(
    `/${ROUTE_TOP}s/:id`,
    login_required,
    async function (req, res, next) {
        try {
            const payload = {
                id: req.params.id,
                currentUserId: req.currentUserId,
                ...req.body,
            };

            logger.log(
                { __level__: 2 },
                `PUT /${ROUTE_TOP}s/:${req.params.id}`
            );
            logger.log({}, `payload =`, payload);

            const updated = await SERVICE.set(payload);
            if ("errorMessage" in updated) {
                throw new RequestError(
                    { status: updated.statusCode },
                    updated.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json(updated);
        } catch (error) {
            next(error);
        }
    }
);

ROUTER.delete(
    `/${ROUTE_TOP}s/:id`,
    login_required,
    async function (req, res, next) {
        try {
            const payload = {
                id: req.params.id,
                currentUserId: req.currentUserId,
            };

            logger.log(
                { __level__: 2 },
                `DELETE /${ROUTE_TOP}s/:${payload.id}`
            );

            const deleted = await SERVICE.del(payload);
            if ("errorMessage" in deleted) {
                throw new RequestError(
                    { status: deleted.statusCode, payload: { result: false } },
                    deleted.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json({ result: true });
        } catch (error) {
            next(error);
        }
    }
);

export { awardRouter };
