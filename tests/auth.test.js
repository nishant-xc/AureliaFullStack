import request from "supertest";
import app from "../src/app.js";

describe("Auth Validation", () => {
    test("POST /api/v1/auth/register should reject empty body", async () => {
        const response = await request(app).post("/api/v1/auth/register").send({});

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);
    });

    test("POST /api/v1/auth/login should reject empty body", async () => {
        const response = await request(app).post("/api/v1/auth/login").send({});

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);
    });
});
