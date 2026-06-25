describe("Environment", () => {
    test("Print NODE_ENV", () => {
        console.log("NODE_ENV =", process.env.NODE_ENV);

        expect(true).toBe(true);
    });
});
