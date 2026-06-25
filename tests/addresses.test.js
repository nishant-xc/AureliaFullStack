import request from "supertest";
import app from "../src/app.js";

describe("Address Routes", () => {
    test("GET /api/v1/addresses without token should return 401", async () => {
        const response = await request(app).get("/api/v1/addresses");

        expect(response.statusCode).toBe(401);
    });
});
