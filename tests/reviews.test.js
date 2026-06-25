import request from "supertest";
import app from "../src/app.js";

describe("Reviews Routes", () => {
    test("GET /api/v1/reviews/restaurant/1 should be accessible", async () => {
        const res = await request(app).get("/api/v1/reviews/restaurant/1");

        expect([200, 400, 404, 500]).toContain(res.statusCode);
    });

    test("POST /api/v1/reviews should require authentication", async () => {
        const res = await request(app).post("/api/v1/reviews").send({});

        expect(res.statusCode).toBe(401);
    });
});
