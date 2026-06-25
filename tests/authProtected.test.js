import request from "supertest";
import app from "../src/app.js";

describe("Protected Routes", () => {
    test("GET /api/v1/auth/me without token", async () => {
        const response = await request(app).get("/api/v1/auth/me");

        expect(response.statusCode).toBe(401);

        expect(response.body.success).toBe(false);
    });
});
