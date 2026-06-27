import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/index.js";

export function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn,
            algorithm: "HS256",
        }
    );
}

export function generateRefreshToken(user) {
    const jti = crypto.randomUUID();

    const token = jwt.sign(
        {
            id: user.id,
            jti,
        },
        config.jwt.refreshSecret,
        {
            expiresIn: config.jwt.refreshExpiresIn,
            algorithm: "HS256",
        }
    );

    return {
        token,
        jti,
    };
}

export function verifyAccessToken(token) {
    return jwt.verify(token, config.jwt.secret, {
        algorithms: ["HS256"],
    });
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, config.jwt.refreshSecret, {
        algorithms: ["HS256"],
    });
}
