import eslint from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import eslintConfigNextVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigNextTypescript from 'eslint-config-next/typescript';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const FlatConfig = tseslint.config(
  [
    globalIgnores([
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'coverage/**',
    ]),
  ],
  ...eslintConfigNextVitals,
  ...eslintConfigNextTypescript,
  eslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  eslintPluginUnicorn.configs.all,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...eslintPluginJsxA11y.flatConfigs.strict.rules,
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

      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
          labelAttributes: ['label'],
          controlComponents: ['Input'],
          depth: 3,
        },
      ],

      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-keyword-prefix': 'off',
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
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__mocks__/**/*.{js,jsx,ts,tsx}'],

    plugins: {
      jest: eslintPluginJest,
      'testing-library': eslintPluginTestingLibrary,
    },

    rules: {
      ...eslintPluginJest.configs['flat/recommended'].rules,
      ...eslintPluginTestingLibrary.configs['flat/react'].rules,
      'unicorn/filename-case': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
);

export default FlatConfig;
