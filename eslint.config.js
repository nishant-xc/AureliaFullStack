import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**", "coverage/**", "dist/**", "build/**"],
    },

    js.configs.recommended,

    {
        files: ["src/**/*.js", "tests/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },

        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "no-undef": "error",
            semi: ["error", "always"],
            quotes: ["error", "double"],
        },
    },
];
