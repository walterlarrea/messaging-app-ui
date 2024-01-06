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
			files: ['.eslintrc.{js,cjs}', '.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				sourceType: 'script',
				extraFileExtensions: ['.astro'],
			},
		},
	],
	extends: ['eslint:recommended', 'prettier', 'plugin:astro/recommended'],
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
