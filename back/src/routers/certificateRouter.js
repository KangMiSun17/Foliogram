import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";
import { RequestError } from "../utils/errors";
import * as status from "../utils/status";
import { Logger, UNIFIED_LOG } from "../utils/logging";

const certificateRouter = Router();

/* ==========================================================================
 * -------------            CopyPasta Constants here            -------------
 * ========================================================================== */
const SERVICE = certificateService;
const ROUTER = certificateRouter;
const ROUTE_TOP = "certificate";

const logger = new Logger({
    name: `${ROUTE_TOP}Router`,
    tee: [
        UNIFIED_LOG,
        Logger.generateLogPath(`${ROUTE_TOP}.log`),
        Logger.generateLogPath(`router.log`),
        Logger.generateLogPath(`${ROUTE_TOP}router.log`),
    ],
    default_level: 2,
});

ROUTER.post(
    `/${ROUTE_TOP}/create`,
    login_required,
    async function (req, res, next) {
        try {
            logger.log({}, `POST /${ROUTE_TOP}/create`);

            if (is.emptyObject(req.body)) {
                throw new RequestError(
                    `headers["Content-Type"] needs to be "application/json"`
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
            logger.log({}, `GET /${ROUTE_TOP}s/${id}`);

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

ROUTER.get(
    `/${ROUTE_TOP}list/:user_id`,
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.user_id;
            logger.log({}, `GET /${ROUTE_TOP}list/${user_id}`);

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
            if (is.emptyObject(req.body)) {
                throw new RequestError(
                    `headers["Content-Type"] needs to be "application/json"`
                );
            }

            const payload = {
                id: req.params.id,
                currentUserId: req.currentUserId,
                ...req.body,
            };

            logger.log({}, `PUT /${ROUTE_TOP}s/:${req.params.id}`);
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

            logger.log({}, `DELETE /${ROUTE_TOP}s/:${payload.id}`);

            const deleted = await SERVICE.del(payload);
            if ("errorMessage" in deleted) {
                throw new RequestError(
                    { status: deleted.statusCode },
                    deleted.errorMessage
                );
            }

            res.status(status.STATUS_200_OK).json({ result: true });
        } catch (error) {
            next(error);
        }
    }
);

export { certificateRouter };
