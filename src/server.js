import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket/socket.js";
import logger from "./shared/logger/logger.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  logger.info(`
=========================================
🚀 Aurelia Backend Started Successfully
=========================================
Server      : http://localhost:${PORT}
Environment : ${process.env.NODE_ENV || "development"}
Socket.IO   : Enabled
=========================================
`);
});
