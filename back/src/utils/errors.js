/** Request Error Class that blames (mostly) bad request kind.
 *
 * ## Constructor
 * @constructor
 * @param {{status: number}} status
 * @param {any[]} params
 * ```js
 * { status: number = 400 }, ...params
 * ```
 *  - `status`: This is sent to errorMiddleware and then sent to the browser.
 *  - `params`: Anything that you would otherwise pass to an Error.
 */
class RequestError extends Error {
    constructor({ status = 400 }, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NetworkError);
        }

        this.name = "RequestError";
        this.status = status;
    }
}

export { RequestError };
