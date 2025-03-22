import { config } from "@repo/eslint/base";

/** @type {Array<import("eslint").Linter.Config>} */
export default [
  {
    ignores: [
      "/*/**/*",
      "!packages/**/*",
      "!apps/**/*",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
    ],
  },
  ...config,
  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    files: ["eslint.config.js"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
];
