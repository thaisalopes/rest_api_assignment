module.exports = [
  // global ignores
  {
    ignores: [
      'node_modules/**',
      '.vscode/**',
      '.env',
      '.env.*',
      'package-lock.json',
      'src/config/serviceAccountKey.json',
    ],
  },

  // main rules
  {
    files: ['src/**/*.js', 'test.js'],
    rules: {
      'no-console': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['src/server.js', 'src/app.js'],
    rules: {
      'no-console': 'off',
    },
  },
  require('eslint-config-prettier'),
];
