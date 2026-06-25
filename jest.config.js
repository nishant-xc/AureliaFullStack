export default {
    testEnvironment: "node",
    transform: {},
    testMatch: ["**/tests/**/*.test.js"],
    globalTeardown: "./tests/jest.teardown.js",
};
