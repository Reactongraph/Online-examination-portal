{
	"plugins": ["prettier"],
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"next/babel",
		"eslint:recommended",
		"next",
		"next/core-web-vitals",
		"prettier"
	],
	"parserOptions": {
		"ecmaVersion": 2020
	},
	"rules": {
		"no-console": "error",
		"prettier/prettier": "error",
		"react/prop-types": 0,
		"linebreak-style": ["error", "unix"],
		"arrow-body-style": "off",
		"prefer-arrow-callback": "off"
	}
}
