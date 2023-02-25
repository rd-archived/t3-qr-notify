/** @type {import("eslint").Linter.Config} */

function isProduction() {
  return process.env.NODE_ENV == "production";
}

module.exports = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": isProduction() ? "error" : "off",
    "@typescript-eslint/no-empty-function": isProduction() ? "error" : "off",
    "@typescript-eslint/require-await": isProduction() ? "error" : "warn",
  },
};
