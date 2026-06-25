import request from "supertest";
import app from "../src/app.js";

describe("Order Routes", () => {
    test("POST /api/v1/orders/checkout without token should return 401", async () => {
        const response = await request(app).post("/api/v1/orders/checkout");

        expect(response.statusCode).toBe(401);
    });
});
