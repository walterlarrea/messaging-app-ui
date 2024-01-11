/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLeaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	core: { builder: '@storybook/builder-vite' },
	docs: {
		autodocs: 'tag',
	},
}
export default config
