import { useRef, useState } from 'react'
import Button from '../../atoms/Button/Button'
import UserList from '../UserList/UserList'
import type { TUserFriend } from '../../../types/users'
import Dialog from '../../molecules/Dialog/Dialog'
import AddFriendForm from '../AddFriendForm/AddFriendForm'
import FriendRequestList from '../FriendRequestList/FriendRequestList'
import { FaUserPlus } from 'react-icons/fa6'
import Loader from '../../atoms/Loader/Loader'
import { useStore } from '@nanostores/react'
import { $friends, setCurrentChat } from '../../../store/friends'
import classNames from 'classnames'

const AsideSection = () => {
	const { allFriends, currentFriendChat, unseenRequests } = useStore($friends)
	const friendDialog = useRef<HTMLDialogElement>(null)
	const [dialogOpen, setDialogOpen] = useState(false)

	if (!allFriends) {
		return <Loader />
	}

	const friendsMenuClasses = classNames(
		'p-2',
		unseenRequests >= 1
			? 'before:content-[attr(data-amount)]'
			: 'before:content-[]',
		'before:text-xs before:text-[--primary-foreground] before:absolute before:rounded-full before:bg-[--primary] before:top-[-.25rem] before:left-[-.25rem] before:w-4 before:h-4'
	)

	const openUserChat = (user: TUserFriend) => {
		setCurrentChat(user)
	}

	const openFriendDialog = () => {
		friendDialog.current?.showModal()
		setDialogOpen(true)
	}
	const closeFriendDialog = () => {
		friendDialog.current?.close()
		setDialogOpen(false)
	}

	return (
		<aside className="flex flex-col gap-2 overflow-y-auto bg-[--card]">
			<div className="flex justify-between items-center p-2">
				<span>Messages</span>
				<div className="relative">
					<Button
						size="lg"
						variant="secondary"
						data-amount={unseenRequests}
						classes={friendsMenuClasses}
						onClick={openFriendDialog}
					>
						<FaUserPlus />
					</Button>
				</div>
			</div>

			<div className="overflow-y-auto">
				<UserList
					users={allFriends}
					highlightId={currentFriendChat?.id}
					handleClick={openUserChat}
				/>
			</div>

			<Dialog
				title="Friends requests"
				ref={friendDialog}
				handleClose={closeFriendDialog}
			>
				<AddFriendForm />
				{dialogOpen && <FriendRequestList />}
			</Dialog>
		</aside>
	)
}

export default AsideSection
