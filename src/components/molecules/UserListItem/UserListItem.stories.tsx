import type { StoryObj } from '@storybook/react'
import UserListItem from './UserListItem'
import Button from '../../atoms/Button/Button'

export default {
	title: 'Molecules / User List Item',
	component: UserListItem,
}

type Story = StoryObj<typeof UserListItem>

export const Default: Story = {
	args: { userName: 'WalliFTW' },
}

export const WithButtonChildren: Story = {
	args: { userName: 'WalliFTW', children: <Button>Action</Button> },
}
