import jwt from "jsonwebtoken";

import { config } from "../shared/config/index.js";

export function socketAuth(io) {
    io.use((socket, next) => {
        try {
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.headers?.authorization?.replace("Bearer ", "");

            if (!token) {
                return next(new Error("Authentication required"));
            }

            const decoded = jwt.verify(token, config.jwt.secret);

            socket.user = decoded;

            next();
        } catch {
            next(new Error("Invalid token"));
        }
    });
}
