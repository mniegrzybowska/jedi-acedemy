import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import importX from "eslint-plugin-import-x";
import airbnbConfigs from "eslint-config-airbnb-flat/configs";

const eslintConfig = defineConfig([
  // --- Airbnb base rules (excluding imports — uses incompatible plugin) ---
  airbnbConfigs.bestPractices,
  airbnbConfigs.errors,
  airbnbConfigs.node,
  airbnbConfigs.style,
  airbnbConfigs.variables,
  airbnbConfigs.es2022,
  airbnbConfigs.strict,

  // --- Import rules via eslint-plugin-import-x (modern ESLint 9 compatible) ---
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  // --- TypeScript: strict type-checked ---
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // --- Next.js plugin (added directly to avoid conflicts with Airbnb's react plugins) ---
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"]?.rules,
    },
  },

  // --- Project-specific overrides for TS files ---
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": "error",
      // No unused vars (error, allow underscore prefix)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Prefer nullish coalescing & optional chaining
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      // No floating promises
      "@typescript-eslint/no-floating-promises": "error",
      // Require await in async functions
      "@typescript-eslint/require-await": "error",
      // Strict boolean expressions
      "@typescript-eslint/strict-boolean-expressions": "warn",

      // Relax Airbnb rules that conflict with modern React / Next.js / TS patterns
      "import-x/no-unresolved": "off", // handled by TypeScript
      "import-x/prefer-default-export": "off",
      "import-x/no-named-as-default-member": "off", // false positives with namespace imports
      "import-x/no-named-as-default": "off", // false positives with packages like better-sqlite3
      "no-use-before-define": "off", // TS handles this
      "no-restricted-syntax": [
        "error",
        "ForInStatement",
        "LabeledStatement",
        "WithStatement",
      ], // allow for...of (Airbnb bans it, but it's fine in modern runtimes)
      "no-bitwise": "off", // needed for hashing utilities
      "no-await-in-loop": "off", // often intentional for sequential async operations
      "class-methods-use-this": "off", // TS handles access control; arrow methods don't bind this
    },
  },

  // --- Disable type-checked rules for JS/config files ---
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "import-x/no-named-as-default-member": "off",
      "import-x/no-named-as-default": "off",
    },
  },

  // --- Test files: relax some strictness ---
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "src/test/**"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
