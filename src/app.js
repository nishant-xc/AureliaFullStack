import adminRoutes from "./modules/admin/routes/admin.routes.js";
import deliveryRoutes from "./modules/delivery/routes/delivery.routes.js";
import notificationRoutes from "./modules/notifications/routes/notification.routes.js";
import couponRoutes from "./modules/coupons/routes/coupon.routes.js";
import customerOrderRoutes from "./modules/customer-orders/routes/customerOrder.routes.js";
import reviewRoutes from "./modules/reviews/routes/review.routes.js";
import paymentRoutes from "./modules/payments/routes/payment.routes.js";
import restaurantOrderRoutes from "./modules/restaurant-orders/routes/restaurantOrder.routes.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import pool from "./database/database.js";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import restaurantRoutes from "./modules/restaurants/routes/restaurant.routes.js";
import menuRoutes from "./modules/menu/routes/menu.routes.js";
import cartRoutes from "./modules/cart/routes/cart.routes.js";
import orderRoutes from "./modules/orders/routes/order.routes.js";
import addressRoutes from "./modules/addresses/routes/address.routes.js";

import errorMiddleware from "./shared/middlewares/error.middleware.js";
import { requestLogger } from "./shared/logger/index.js";
import errorHandler from "./shared/middlewares/errorHandler.js";

dotenv.config({
    quiet: process.env.NODE_ENV === "test",
});

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(requestLogger);

/*
|--------------------------------------------------------------------------
| Root
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,

        application: "Aurelia Backend",

        version: "1.0.0",

        status: "Running",
    });
});

app.get("/health", (req, res) => {
    return res.status(200).json({
        success: true,
        service: "Aurelia Backend",
        status: "Healthy",
        timestamp: new Date().toISOString(),
    });
});

/*
|--------------------------------------------------------------------------
| Database Health
|--------------------------------------------------------------------------
*/

app.get("/health/database", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            success: true,

            database: "Connected",

            timestamp: result.rows[0].now,
        });
    } catch (error) {
        next(error);
    }
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/restaurants", restaurantRoutes);

app.use("/api/v1/menu", menuRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/addresses", addressRoutes);

app.use("/api/v1/restaurant/orders", restaurantOrderRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/reviews", reviewRoutes);

app.use("/api/v1/customer/orders", customerOrderRoutes);

app.use("/api/v1/coupons", couponRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.use("/api/v1/delivery", deliveryRoutes);

app.use("/api/v1/admin", adminRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
    res.status(404).json({
        success: false,

        message: "Route Not Found",
    });
});

/*
|--------------------------------------------------------------------------
| Global Error Middleware
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);
app.use(errorHandler);

export default app;
