/**
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export function log(req, res, next) {
    let current = Temporal.Now.plainTimeISO().toString().substring(0,8)

    console.log(`[${current}]: ${req.method} at ${req.originalUrl} from ${req.ip}`);

    // log req.params?
    next()
}