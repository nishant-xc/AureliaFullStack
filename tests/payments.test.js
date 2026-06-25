import request from "supertest";
import app from "../src/app.js";

describe("Payments Routes", () => {
    test("GET /api/v1/payments/1 should require authentication", async () => {
        const res = await request(app).get("/api/v1/payments/1");

        expect(res.statusCode).toBe(401);
    });
});
