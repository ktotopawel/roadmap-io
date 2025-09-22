import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 1) Base JS rules
  js.configs.recommended,

  // 2) Base TS rules (strict)
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,

  // 3) Ignore Prettier conflicts
  prettierConfig,

  // 4) Monorepo structure + ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/api/generated/prisma**',
      '**/tsup.config.ts',
    ],
  },

  // 5) Main rules for apps/packages
  {
    files: ['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: [
          './apps/*/tsconfig.json',
          './apps/*/tsconfig.*.json',
          './packages/*/tsconfig.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      // --- Core ESLint best practices ---
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // handled by TS
      '@typescript-eslint/no-unused-vars': ['error'],

      // --- TypeScript strictness ---
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: false }],
      '@typescript-eslint/consistent-type-imports': 'error',

      // --- React ---
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // --- Prettier ---
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
