module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,jsx,ts,tsx,cjs}'], //, '.astro'],
			//parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
		},
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
        "eslint:recommended",
        "prettier",
        "plugin:astro/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended"
    ],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		// 'linebreak-style': [
		//   'error',
		//   'unix'
		// ],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		'no-console': 0,
	},
}
