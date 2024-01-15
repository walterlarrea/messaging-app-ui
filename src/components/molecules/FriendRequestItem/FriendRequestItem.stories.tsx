import type { StoryObj } from '@storybook/react'
import FriendRequestItem from './FriendRequestItem'

export default {
	title: 'Molecules / Friend Request Item',
	component: FriendRequestItem,
}

type Story = StoryObj<typeof FriendRequestItem>

export const Default: Story = {
	args: { userName: 'WalliFTW' },
}
