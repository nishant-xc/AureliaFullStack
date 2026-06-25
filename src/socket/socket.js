import { Server } from "socket.io";
import { socketAuth } from "./socketAuth.js";
import { logger } from "../shared/logger/index.js";

let io = null;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
        },
    });

    socketAuth(io);

    io.on("connection", (socket) => {
        logger.info(`Socket Connected: ${socket.id} User: ${socket.user.id}`);

        socket.join(`user:${socket.user.id}`);

        socket.on("disconnect", () => {
            logger.info(`Socket Disconnected: ${socket.id}`);
        });
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }

    return io;
}
