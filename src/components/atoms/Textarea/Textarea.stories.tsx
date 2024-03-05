import type { StoryObj } from '@storybook/react'
import Textarea from './Textarea'

export default {
	title: 'Atoms / Textarea',
	component: Textarea,
}

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
	args: {
		children: 'Your message ...',
	},
}

export const DefaultMoreRows: Story = {
	args: {
		children: 'Your message ...',
		rows: 3,
	},
}

export const Small: Story = {
	args: {
		children: 'E-mail',
		boxSize: 'sm',
	},
}

export const Large: Story = {
	args: {
		children: 'E-mail',
		boxSize: 'lg',
	},
}

export const Disabled: Story = {
	args: {
		children: 'Your message ...',
		disabled: true,
	},
}
