import env from "./env.js";

const config = {
    app: {
        name: "Aurelia Backend",
        env: env.NODE_ENV,
        port: env.PORT,
    },

    database: {
        host: env.DATABASE.HOST,
        port: env.DATABASE.PORT,
        name: env.DATABASE.NAME,
        user: env.DATABASE.USER,
        password: env.DATABASE.PASSWORD,
    },

    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: env.JWT_EXPIRES_IN,
    },

    redis: {
        url: env.REDIS_URL,
    },

    cloudinary: {
        cloudName: env.CLOUDINARY_NAME,
        apiKey: env.CLOUDINARY_KEY,
        apiSecret: env.CLOUDINARY_SECRET,
    },

    email: {
        host: env.EMAIL_HOST,
        port: env.EMAIL_PORT,
        user: env.EMAIL_USER,
        password: env.EMAIL_PASSWORD,
    },
};

export default config;
