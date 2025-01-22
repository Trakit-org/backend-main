import globals from "globals";
import pluginJest from "eslint-plugin-jest";
import airbnbBase from "eslint-config-airbnb-base";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Language Options
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    // Plugins
    plugins: {
      jest: pluginJest,
    },
    // Extends
    settings: {
      ...airbnbBase.settings,
    },
    rules: {
      "max-classes-per-file": "off",
      "no-underscore-dangle": "off",
      "no-console": "off",
      "no-shadow": "off",
      "no-restricted-syntax": [
        "error",
        "LabeledStatement",
        "WithStatement",
      ],
    },
  },
  {
    // Jest plugin configuration
    plugins: {
      jest: pluginJest,
    },
    rules: {
      ...pluginJest.configs.all.rules,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    // Overrides
    files: ["*.js"],
    ignores: ["babel.config.js"],
  },
];
