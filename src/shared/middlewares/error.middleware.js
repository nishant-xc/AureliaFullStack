import { logger } from "../logger/index.js";

export default function errorMiddleware(err, req, res) {
    const status = err.statusCode || err.status || 500;

    // Log only unexpected server errors as ERROR.
    // Expected client errors are logged as WARN.
    if (status >= 500) {
        logger.error({
            status,
            error: err.message,
            stack: err.stack,
            method: req.method,
            url: req.originalUrl,
        });
    } else {
        logger.warn({
            status,
            error: err.message,
            method: req.method,
            url: req.originalUrl,
        });
    }

    return res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors ?? null,
        ...(process.env.NODE_ENV === "development" &&
            status >= 500 && {
                stack: err.stack,
            }),
    });
}
