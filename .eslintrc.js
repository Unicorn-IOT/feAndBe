module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'next',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
	env: {
		'shared-node-browser': true,
		commonjs: true,
		es6: true,
		node: true,
	},
};
