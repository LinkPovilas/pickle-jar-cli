import js from "@eslint/js";
import globals from "globals";
import { configs } from "eslint-plugin-unicorn";

export default [
  js.configs.recommended,
  configs["flat/all"],
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    ignores: ["node_modules/", "coverage/", "features/"],
  },
  {
    rules: {
      "unicorn/better-regex": "warn",
    },
  },
];
