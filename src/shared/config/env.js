import dotenv from "dotenv";

dotenv.config();

const required =
  process.env.NODE_ENV === "test"
    ? []
    : [
        "PORT",
        "DATABASE_HOST",
        "DATABASE_PORT",
        "DATABASE_NAME",
        "DATABASE_USER",
        "JWT_SECRET",
      ];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    PORT: Number(process.env.PORT) || 3000,

    DATABASE: {
        HOST: process.env.DATABASE_HOST,
        PORT: Number(process.env.DATABASE_PORT),
        NAME: process.env.DATABASE_NAME,
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD || "",
    },

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

    REDIS_URL: process.env.REDIS_URL || "",

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || "",

    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY || "",

    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET || "",

    EMAIL_HOST: process.env.EMAIL_HOST || "",

    EMAIL_PORT: process.env.EMAIL_PORT || "",

    EMAIL_USER: process.env.EMAIL_USER || "",

    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
};

export default env;
