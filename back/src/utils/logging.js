import * as fs from "fs";
import * as util from "util";
// import * as fsp from "fs/promises";
// import { Writable } from "stream";

/**
 * @typedef {string|number} filelike
 *  - Either string representing a writable file path or open file descriptor.
 */

const { W_OK } = fs.constants;
const { O_APPEND, O_SYNC } = fs.constants;
const { S_IRWXU, S_IRWXG } = fs.constants;

/** Output logs to multiple streams, depending on debug level.
 *
 * ## Constructor
 * @constructor
 * @param {{name: string, tee: filelike[], tee_ignore_level: boolean}} option
 *  ```js
 *  {
 *      name_: string = "",
 *      tee: filelike[] = [],
 *      tee_ignore_level: boolean = false,
 *  }
 *  ```
 *  - `name` will help identify which logger wrote it in your log.
 *  - `tee` is an iterable of either file paths or open file descriptors.
 *    Mixing them is fine.
 *  - `tee_ignore_level` if `true`, all tee streams (that are not `stdout`)
 *    will be written, ignoring `env.DEBUG`'s value.
 *
 * ## Properties
 * @prop {number} debug
 *  - (static) Stored value of process.env.DEBUG; Defaults to 1.
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
    static debug = process.env.DEBUG ? Number(process.env.DEBUG) : 1;
    static stdout = process.stdout.fd;

    name_ = "I AM TOO LAZY TO NAME MY LOGGER";
    tee = [];
    tee_ignore_level = false;

    constructor({ name_ = "", tee = [], tee_ignore_level = false }) {
        this.name_ = name_;
        this.tee_ignore_level = tee_ignore_level;

        tee.forEach((filelike) => {
            let fd = filelike;

            if (typeof filelike === "string") {
                try {
                    fd = fs.openSync(filelike, O_APPEND | O_SYNC, S_IRWXG);
                } catch (error) {
                    console.log(`${this.name} > Can't open file "${filelike}"`);
                }
            }

            if (!fs.accessSync(fd, W_OK)) {
                console.log(`${this.name} > "${filelike}" is not writable`);
            }

            this.tee.push(fd);
        });
    }

    /** Log messages. Output may or may not appear on stdout depending on env.
     *
     * @param {{__level__: number}} options
     *  ```js
     *  { __level__: number = 0 }
     * ```
     *  - `__level__` specifies the level of a message. A message will be
     *    written to streams only if its `__level__` is less or equal than
     *    current `process.env.DEBUG` value.
     */
    log({ __level__ = 0 }, ...msgs) {
        const consoleMsg =
            `<${this.name}>$ ` +
            msgs.map((m) => util.inspect(m)).join(" ") +
            "\n";
        const msg = `[${new Date().toISOString.slice(2, 10)}]` + consoleMsg;

        // Write to the console. Will always follow rules.
        if (__level__ <= this.debug) {
            fs.writeSync(this.stdout, consoleMsg, "utf-8");
        }

        if (this.tee_ignore_level || __level__ <= this.debug) {
            this.tee.forEach((fd) => fs.writeSync(fd, msg, "utf-8"));
        }
    }
}

export { Logger };
