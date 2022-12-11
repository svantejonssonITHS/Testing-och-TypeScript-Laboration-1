module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'turbo', 'prettier'],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'turbo/no-undeclared-env-vars': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/typedef': [
			'error',
			{
				arrowParameter: true,
				variableDeclaration: true,
				variableDeclarationIgnoreFunction: true
			}
		],
		'@typescript-eslint/explicit-function-return-type': 'error'
	}
};
