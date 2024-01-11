import type { StoryObj } from '@storybook/react'
import Input from './Input'

export default {
	title: 'Atoms / Input',
	component: Input,
}

type Story = StoryObj<typeof Input>

export const Default: Story = {
	args: {
		children: 'Username',
	},
}

export const CheckBox: Story = {
	args: {
		children: 'Accept',
		type: 'checkbox',
	},
}

export const Radio: Story = {
	args: {
		children: 'Options',
		type: 'radio',
	},
}

export const Password: Story = {
	args: {
		children: 'Password',
		type: 'password',
	},
}

export const Search: Story = {
	args: {
		children: 'Search',
		type: 'search',
	},
}

export const Date: Story = {
	args: {
		children: 'Birthday',
		type: 'date',
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
		children: 'E-mail',
		disabled: true,
	},
}
