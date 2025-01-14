import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const FlatConfig = [
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'next/core-web-vitals',
    'prettier',
  ),
  {
    plugins: {
      prettier,
    },

    rules: {
      'prettier/prettier': 'error',
      'no-nested-ternary': 'error',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],

          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],

          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prevent-abbreviations': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.js?(x)'],

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['**/*.tsx', '**/*.jsx'],

    rules: {
      'unicorn/no-null': 'off',

      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase',
        },
      ],
    },
  },
  {
    files: ['**/app/**/*.tsx'],

    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },
  {
    files: ['**/hooks/**/*.ts', '**/use*.ts'],

    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
        },
      ],
    },
  },
  ...compat
    .extends(
      'plugin:jest/recommended',
      'plugin:jest-formatting/recommended',
      'plugin:testing-library/react',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.test.{js,jsx,ts,tsx}', '**/__mocks__/**/*.{js,jsx,ts,tsx}'],
    })),
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__mocks__/**/*.{js,jsx,ts,tsx}'],

    rules: {
      'unicorn/filename-case': 'off',
    },
  },
];

export default FlatConfig;
