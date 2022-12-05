module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    camelcase: 'off',
    'global-require': 'off',
    'no-underscore-dangle': 'off',
    'no-console': ['error', { allow: ['warn'] }]
  }
}
