import request from "supertest";
import app from "../src/app.js";

describe("Health Endpoints", () => {
    test("GET / should return backend info", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);
    });

    test("GET /health should return healthy status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);

        expect(response.body.status).toBe("Healthy");
    });
});
