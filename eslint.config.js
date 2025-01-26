import globals from "globals";
import eslintPluginJest from "eslint-plugin-jest";
import airbnbBase from "eslint-config-airbnb-base";

export default [
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    plugins: {
      jest: eslintPluginJest,
    },
    rules: {
      ...airbnbBase.rules,
      "max-classes-per-file": "off",
      "no-underscore-dangle": "off",
      "no-console": "off",
      "no-shadow": "off",
      "no-restricted-syntax": [
        "error",
        "LabeledStatement",
        "WithStatement",
      ],

      // Syntax-related rules
      "no-undef": "error", // Variables must be defined before use
      "no-unreachable": "error", // Detect unreachable code
      "no-unused-vars": "warn", // Warn on unused variables
      "no-empty": "warn", // Warn on empty blocks
      "valid-typeof": "error", // Ensure valid `typeof` checks

      // Basic formatting rules
      "no-trailing-spaces": "error", // Disallow spaces at the end of lines
      "eol-last": ["error", "always"], // Require newline at the end of files
      "indent": ["error", 2], // Enforce consistent 2-space indentation
      "space-before-blocks": ["error", "always"], // Enforce space before `{`
      "keyword-spacing": ["error", { before: true, after: true }], // Enforce space around keywords
      "comma-spacing": ["error", { before: false, after: true }], // Enforce space after commas
      "semi": ["error", "always"], // Require semicolons
      "quotes": ["error", "double"], // Enforce double quotes
    },
  },
  {
    files: ["*.js"],
    ignores: ["babel.config.js"],
  },
];
