import jwt from "jsonwebtoken";

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

export function verifyAccessToken(token) {
    return jwt.verify(token, config.jwt.secret);
}
