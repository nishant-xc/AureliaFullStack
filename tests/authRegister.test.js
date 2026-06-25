import request from "supertest";
import app from "../src/app.js";

describe("Auth Registration", () => {
    test("Register user successfully", async () => {
        const uniqueEmail = `test_${Date.now()}@example.com`;

        const response = await request(app).post("/api/v1/auth/register").send({
            full_name: "Test User",
            email: uniqueEmail,
            password: "Password123",
            phone: "9876543210",
        });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data.token).toBeDefined();
    });
});
