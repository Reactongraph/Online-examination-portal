module.exports = {
	plugins: ['prettier'],
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'prettier'],
	parserOptions: {
		ecmaVersion: 2020,
		ecmaFeatures: {},
	},
	rules: {
		'no-console': 'error',
		'prettier/prettier': 'error',
		'react/prop-types': 0,
		'linebreak-style': ['error', 'unix'],
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'react/no-unescaped-entities': 0,
	},
}
