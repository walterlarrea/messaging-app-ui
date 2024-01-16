import { useEffect, useRef, useState } from 'react'
import Button from '../../atoms/Button/Button'
import UserList from '../UserList/UserList'
import { getFriends } from '../../../services/friendsService'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { TUserPublic } from '../../../types/users'
import Dialog from '../../molecules/Dialog/Dialog'
import AddFriendForm from '../AddFriendForm/AddFriendForm'
import FriendRequestList from '../FriendRequestList/FriendRequestList'
import { FaUserPlus } from 'react-icons/fa6'
import Loader from '../../atoms/Loader/Loader'

const AsideSection = () => {
	const [friends, setFriends] = useState<TUserPublic[]>()
	const friendDialog = useRef<HTMLDialogElement>(null)
	const [dialogOpen, setDialogOpen] = useState(false)
	const getUserFriend = useAxiosPrivate(getFriends)

	useEffect(() => {
		getUserFriend()
			.then((result: TUserPublic[]) => {
				setFriends(result)
			})
			.catch((reasons) => {
				reasons?.errors?.[0]
					? alert(reasons?.errors?.[0].msg)
					: alert('An unknown error occur')

				window.location.href = '/'
			})
	}, [])

	const openFriendDialog = () => {
		friendDialog.current?.showModal()
		setDialogOpen(true)
	}
	const closeFriendDialog = () => {
		friendDialog.current?.close()
		setDialogOpen(false)
	}

	if (!friends) {
		return <Loader />
	}

	return (
		<aside className="flex flex-col gap-2 overflow-y-auto bg-[--card]">
			<div className="flex justify-between items-center p-2">
				<span>Messages</span>
				<Button
					size="lg"
					variant="secondary"
					classes="p-2"
					onClick={openFriendDialog}
				>
					<FaUserPlus />
				</Button>
			</div>

			<div className="overflow-y-auto">
				<UserList users={friends} />
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
