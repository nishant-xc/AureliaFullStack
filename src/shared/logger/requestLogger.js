import pinoHttp from "pino-http";
import logger from "./logger.js";

const requestLogger = pinoHttp({
    logger,

    customSuccessMessage(req, res) {
        return `${req.method} ${req.url} completed with ${res.statusCode}`;
    },

    customErrorMessage(req, res, error) {
        return `${req.method} ${req.url} failed: ${error.message}`;
    },

    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
            };
        },

        res(res) {
            return {
                statusCode: res.statusCode,
            };
        },
    },
});

export default requestLogger;
