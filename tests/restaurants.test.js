import request from "supertest";
import app from "../src/app.js";

describe("Restaurant Routes", () => {
    test("GET /api/v1/restaurants should return success", async () => {
        const response = await request(app).get("/api/v1/restaurants");

        expect(response.statusCode).toBe(200);
    });
});
