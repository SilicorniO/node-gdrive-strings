module.exports = {
	root: true,
	extends: [
		"prettier",
		"prettier/@typescript-eslint",
	],
	"parserOptions": {
			"ecmaVersion": 6,
			"sourceType": "module",
			"ecmaFeatures": {
					"jsx": true
			}
	},
	rules: {
		"import/no-unresolved": "off",
	}
}
