import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
    { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
    tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off"
        }
    }
]);