module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['ser1ver.js', '**/tests/*.spec.js'],
  rules: {
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 0,
    'no-return-await': 0,
    'no-underscore-dangle': 0,
    'import/no-import-module-exports': 0,
    'class-methods-use-this': 0,
  },
};
