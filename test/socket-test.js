import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    auth: {
        token: process.env.TOKEN,
    },
});

socket.on("connect", () => {
    console.log("✅ Connected");
    console.log(socket.id);
});

socket.on("notification:new", (notification) => {
    console.log("\n📩 NEW NOTIFICATION");
    console.log(notification);
});

socket.on("connect_error", (err) => {
    console.log("❌", err.message);
});
