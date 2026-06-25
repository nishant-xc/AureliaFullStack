import { logger } from "../logger/index.js";

export default function errorHandler(err, req, res) {
    logger.error({
        error: err.message,
        stack: err.stack,
    });

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}
