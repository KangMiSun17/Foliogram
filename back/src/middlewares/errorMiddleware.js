import { RequestError } from "../utils/errors";
import * as status from "../utils/status";
import { Logger, UNIFIED_LOG } from "../utils/logging";

const logger = new Logger({
    name: "errorMiddleware",
    tee: [UNIFIED_LOG, Logger.generateLogPath("error.log")],
    tee_ignore_level: true,
    // debug_override: Math.max(1, Number(process.env.DEBUG ?? 0)),
});

function errorMiddleware(error, req, res, next) {
    // console.log("\x1b[33m%s\x1b[0m", error);
    logger.log({ __level__: 1 }, "\x1b[33m%s\x1b[0m", error);

    // res.status(400).send(error.message);
    if (error instanceof RequestError) {
        res.status(error.status ?? status.STATUS_400_BADREQUEST).json({
            errorMessage: error.message,
            payload: error.payload,
        });
    } else {
        res.status(status.STATUS_500_INTERNALSERVERERROR).json({
            errorMessage: error.message,
        });
    }
}

export { errorMiddleware };
