import * as fs from "fs";
import * as util from "util";
import * as path from "path";
// import * as fsp from "fs/promises";
// import { Writable } from "stream";

/**
 * @typedef {string|number} filelike
 *  - Either string representing a writable file path or open file descriptor.
 */

// const { W_OK } = fs.constants;
// const { O_APPEND, O_SYNC } = fs.constants;
// const { S_IRWXU, S_IRWXG } = fs.constants;

/** @const {string} LOGDIR - Path where log files reside: `/back/log`. */
const LOGDIR = path.resolve(`${__dirname}`, "..", "..", "log");

/** @const {string} DEFAULT_LOG - Default log path: `/back/log/unified.log` */
const DEFAULT_LOG = path.resolve(LOGDIR, "unified.log");

/** Output logs to multiple streams, depending on debug level.
 *
 * ## Constructor
 * @constructor
 * @param {{
 *      name_: string,
 *      tee: filelike[],
 *      tee_ignore_level: boolean,
 *      debug_override: number
 * }} option
 *  ```js
 *  {
 *      name_: string = "",
 *      tee: filelike[] = [],
 *      tee_ignore_level: boolean = false,
 *      debug_override: number = null
 *  }
 *  ```
 *  - `name` will help identify which logger wrote it in your log.
 *  - `tee` is an iterable of either file paths or open file descriptors.
 *    Mixing them is fine.
 *  - `tee_ignore_level` if `true`, all tee streams (that are not `stdout`)
 *    will be written, ignoring `env.DEBUG`'s value.
 *  - `debug_override`, if set, overrides `DEBUG` set in the env.
 *
 * ## Methods
 * @method static resolvePaths(...paths)
 *  - Convenience path joining tool so that you don't need to.
 * @method log({ __level__ = 0 }, ...msgs)
 *  - Log messages. Output may or may not appear on stdout depending on env.
 *
 * ## Properties
 * @prop {number} debug
 *  - (static) Stored value of `process.env.DEBUG`; Defaults to 1.
 * @prop {number} stdout
 *  - (static) This is equal to `process.stdout.fd`.
 * @prop {string} name
 *  - This logger's name. Try to give it a reasonably descriptive one.
 * @prop {number[]} tee
 *  - Stored streams as file descriptors.
 * @prop {boolean} tee_ignore_level
 *  - If `true`, all tee streams (that are not `stdout`)
 *    will be written, ignoring `env.DEBUG`'s value.
 */
class Logger {
    stdout = process.stdout.fd;
    debug = process.env.DEBUG ? Number(process.env.DEBUG) : 1;

    name_ = "I AM TOO LAZY TO NAME MY LOGGER";
    tee = [];
    #_tee = [];
    tee_ignore_level = false;

    constructor({
        name_ = null,
        tee = [],
        tee_ignore_level = false,
        debug_override = null,
    }) {
        this.name_ = name_;
        this.tee_ignore_level = tee_ignore_level;

        if (debug_override) {
            this.debug = debug_override;
        }

        for (const filelike of tee) {
            let fd = filelike;

            if (typeof filelike === "string") {
                try {
                    if (!fs.existsSync(filelike)) {
                        fs.mkdirSync(path.dirname(filelike), {
                            recursive: true,
                        });
                    }

                    // Open file as append/sync, with group rwx permission.
                    fd = fs.openSync(filelike, "a");
                } catch (error) {
                    console.log(
                        `${this.name_} > Can't open file "${filelike}" for writing`
                    );
                    console.log(error);
                    continue;
                }
            }

            this.#_tee.push(fd);
        }

        this.#_init();
    }

    /** Convenience path joining tool so that you don't need to.
     *
     * @param {string[]} paths
     *  - Iterable of strings representing paths. Usually you will want
     *    something like: `Logger.resolvePaths(Logger.LOGDIR, "mylogfile.log")`
     * @returns {string} resolvedPath
     *  - The joined and resolved absolute path to your log file.
     */
    static resolvePaths(...paths) {
        return path.resolve(...paths);
    }

    /** Log messages. Output may or may not appear on stdout depending on env.
     *
     * @param {{__level__: number}} options
     *  ```js
     *  { __level__: number = 0 }
     * ```
     *  - `__level__` specifies the level of a message. A message will be
     *    written to streams only if its `__level__` is less than or equal to
     *    current `process.env.DEBUG` value.
     *  - Defaults to 0. **If you want to omit it, pass `{}` instead.**
     */
    log({ __level__ = 0 }, ...msgs) {
        const date = new Date();
        const msg = msgs.map((m) => util.inspect(m)).join(" ") + "\n";
        const consoleMsg = `${this.name_}$ ${msg}`;
        const fileMsg =
            `${this.name_} @` +
            `${date.toISOString().slice(2, 10)} / ` +
            `${date.toTimeString().slice(0, 8)} $\n${msg}`;

        // Write to the console. Will always follow rules.
        if (__level__ <= this.debug) {
            fs.writeSync(this.stdout, consoleMsg, "utf-8");
        }

        if (this.tee_ignore_level || __level__ <= this.debug) {
            this.#_tee.forEach((fd) => fs.writeSync(fd, fileMsg, "utf-8"));
        }
    }

    /** Write distiniguishable lines in the log files. */
    #_init() {
        const now = Date();
        const padding = " ".repeat(parseInt((79 - now.length) / 2));
        const msg = `\n\n${"=".repeat(79)}\n${padding}${now}\n${"=".repeat(
            79
        )}\n`;
        this.#_tee.forEach((fd) => fs.writeSync(fd, msg, "utf-8"));
    }
}

// Quick test code!
/* const logger = new Logger({
    name_: "myFirstLogger",
    tee: [DEFAULT_LOG, Logger.resolvePaths(LOGDIR, "mylogtest.log")],
});
// Test some basic object types.
logger.log({}, "I feel fine!");
logger.log({}, `LOGDIR is ${LOGDIR}`);
logger.log(
    { __level__: 1 },
    { ham: "jam", spam: "eggs", Camelot: "A silly place" }
);
logger.log({}, new Error("Something did not went wrong")); */

export { Logger, LOGDIR, DEFAULT_LOG };
