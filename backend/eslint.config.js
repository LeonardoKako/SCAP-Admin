import js from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Ignorar pastas desnecessárias
  {
    ignores: ["dist/", "node_modules/", "build/", "coverage/"]
  },

  // 2. Configuração Base
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    // Aplicando as regras recomendadas do ESLint
    rules: {
      ...js.configs.recommended.rules,
      
      // Regras de Qualidade de Código (Subjetivas mas comuns em empresas)
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "arrow-body-style": ["error", "as-needed"],
    },
  },

  // 3. Configuração específica para arquivos de teste (ex: Jest/Vitest)
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "no-unused-expressions": "off",
    },
  },
];