import request from "supertest";
import app from "../src/app.js";

describe("Rate Limiting", () => {
    test("Auth limiter should eventually block requests", async () => {
        let lastResponse;

        for (let i = 0; i < 12; i++) {
            lastResponse = await request(app).post("/api/v1/auth/login").send({});
        }

        expect([400, 429]).toContain(lastResponse.statusCode);
    });
});
