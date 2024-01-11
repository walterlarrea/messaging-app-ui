/** @type { import('@storybook/react').Preview } */
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/styles/tailwind.css'
const preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
			},
			defaultTheme: 'light',
			// attributeName: 'data-theme',
		}),
		(Story) => (
			<div
				style={{
					backgroundColor: 'var(--background)',
					width: '100vw',
					height: '100vh',
					padding: '20px',
					margin: '-1rem',
				}}
			>
				<Story />
			</div>
		),
	],
}

export default preview
