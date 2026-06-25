import request from "supertest";
import app from "../src/app.js";

describe("404 Handler", () => {
    test("Unknown route should return 404", async () => {
        const response = await request(app).get("/this-route-does-not-exist");

        expect(response.statusCode).toBe(404);

        expect(response.body.success).toBe(false);
    });
});
