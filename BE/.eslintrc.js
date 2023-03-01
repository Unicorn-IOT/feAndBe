module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
};
