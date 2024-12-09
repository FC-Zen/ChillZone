module.exports = {
  ignores: ['node_modules', 'dist'], // Dossiers ignorés
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {},
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@constants', './src/constants'],
          ['@contexts', './src/contexts'],
          ['@enums', './src/enums'],
          ['@navigation', './src/navigation'],
          ['@services', './src/services'],
          ['@screens', './src/screens'],
          ['@theme', './src/theme'],
          ['@translations', './src/translations'],
          ['@types', './src/types'],
          ['@utils', './src/utils'],
        ],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: [],
        patterns: [
          '@enums/*',
          '@assets/*',
          '@constants/*',
          '@translations/*',
          '@utils/*',
          '@types/*',
          '@services/*',
          '@contexts/*',
          '@theme/*',
          '@hooks/*',
          '@components/*',
          '@screens/*',
          '@navigation/*',
        ],
        message:
          'You cannot import from this restricted layer. Check ARCHITECTURE.md for more information.',
      },
    ],
  },
  overrides: [
    {
      files: ['@assets/**/*'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [],
            patterns: [
              '@enums/**/*',
              '@constants/**/*',
              '@translations/**/*',
              '@utils/**/*',
              '@types/**/*',
              '@services/**/*',
              '@contexts/**/*',
              '@theme/**/*',
              '@hooks/**/*',
              '@components/**/*',
              '@screens/**/*',
              '@navigation/**/*',
            ],
            message:
              'You should not import from src/assets. Check ARCHITECTURE.md for help.',
          },
        ],
      },
    },
    {
      files: ['@constants/**/*'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [],
            patterns: [
              '@translations/**/*',
              '@utils/**/*',
              '@services/**/*',
              '@contexts/**/*',
              '@theme/**/*',
              '@hooks/**/*',
              '@components/**/*',
              '@screens/**/*',
              '@navigation/**/*',
            ],
            message:
              'You should not import from src/constants. Check ARCHITECTURE.md for help.',
          },
        ],
      },
    },
    {
      files: ['@translations/**/*'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [],
            patterns: [
              '@assets/**/*',
              '@enums/**/*',
              '@constants/**/*',
              '@utils/**/*',
              '@types/**/*',
              '@services/**/*',
              '@contexts/**/*',
              '@theme/**/*',
              '@hooks/**/*',
              '@components/**/*',
              '@screens/**/*',
              '@navigation/**/*',
            ],
            message:
              'You should not import from src/translations. Check ARCHITECTURE.md for help.',
          },
        ],
      },
    },
    {
      files: ['@utils/**/*'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [],
            patterns: [
              '@services/**/*',
              '@contexts/**/*',
              '@theme/**/*',
              '@hooks/**/*',
              '@components/**/*',
              '@screens/**/*',
              '@navigation/**/*',
            ],
            message:
              'You should not import from src/utils. Check ARCHITECTURE.md for help.',
          },
        ],
      },
    },
    {
      files: ['@hooks/**/*'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [],
            patterns: ['@components/**/*', '@screens/**/*', '@navigation/**/*'],
            message:
              'You should not import from src/hooks. Check ARCHITECTURE.md for help.',
          },
        ],
      },
    },
    {
      files: ['@components/**/*'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [],
            patterns: ['@screens/**/*', '@navigation/**/*'],
            message:
              'You should not import from src/components. Check ARCHITECTURE.md for help.',
          },
        ],
      },
    },
  ],
};
