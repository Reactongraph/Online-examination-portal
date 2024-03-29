module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'standard-with-typescript',
		'prettier',
	],
	root: true,
	env: {
		node: true,
		jest: true,
		browser: true,
		es2021: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		camelcase: 'off',
		'global-require': 'off',
		'no-underscore-dangle': 'off',
		'no-console': 'error',
		'prettier/prettier': 'error',
		'react/prop-types': 0,
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'prettier/prettier': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/restrict-plus-operands': 'off',
		'array-callback-return': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-base-to-string': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
	},
}
