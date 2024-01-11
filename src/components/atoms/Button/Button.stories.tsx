import type { StoryObj } from '@storybook/react'
import Button from './Button'

export default {
	title: 'Atoms / Button',
	component: Button,
}

type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		children: 'Button',
	},
}

export const Secondary: Story = {
	args: {
		children: 'Button',
		variant: 'secondary',
	},
}

export const Danger: Story = {
	args: {
		children: 'Button',
		variant: 'danger',
	},
}

export const Small: Story = {
	args: {
		children: 'Button',
		size: 'sm',
	},
}

export const Large: Story = {
	args: {
		children: 'Button',
		size: 'lg',
	},
}

export const Disabled: Story = {
	args: {
		children: 'Button',
		disabled: true,
	},
}
