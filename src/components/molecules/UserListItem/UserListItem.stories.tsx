import type { StoryObj } from '@storybook/react'
import UserListItem from './UserListItem'

export default {
	title: 'Molecules / User List Item',
	component: UserListItem,
}

type Story = StoryObj<typeof UserListItem>

export const Default = {
	args: { userName: 'WalliFTW' },
}
