import request from "supertest";
import app from "../src/app.js";

describe("Cart Validation", () => {
    test("POST /api/v1/cart without token should fail", async () => {
        const response = await request(app).post("/api/v1/cart").send({});

        expect(response.statusCode).toBe(401);

        expect(response.body.success).toBe(false);
    });
});
