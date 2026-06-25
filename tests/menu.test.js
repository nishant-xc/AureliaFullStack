import request from "supertest";
import app from "../src/app.js";

describe("Menu Routes", () => {
    test("GET /api/v1/menu/items should return success", async () => {
        const response = await request(app).get("/api/v1/menu/items");

        expect(response.statusCode).toBe(200);
    });
});
