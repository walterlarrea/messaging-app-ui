import { useEffect, useRef, useState } from 'react'
import Button from '../../atoms/Button/Button'
import UserList from '../UserList/UserList'
import { getFriends } from '../../../services/friendsService'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { TUserPublic } from '../../../types/users'
import Dialog from '../../molecules/Dialog/Dialog'
import AddFriendForm from '../AddFriendForm/AddFriendForm'
import FriendRequestList from '../FriendRequestList/FriendRequestList'

const AsideSection = () => {
	const [friends, setFriends] = useState<TUserPublic[]>([])
	const friendDialog = useRef<HTMLDialogElement>(null)
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
			})
	}, [])

	const openFriendDialog = () => {
		friendDialog.current?.showModal()
	}
	const closeFriendDialog = () => {
		friendDialog.current?.close()
	}
	return (
		<aside>
			<div className="flex justify-between">
				<span>Chats</span>
				<Button onClick={openFriendDialog}>+</Button>
			</div>
			<Dialog
				title="Friends requests"
				ref={friendDialog}
				handleClose={closeFriendDialog}
			>
				<AddFriendForm />
				<FriendRequestList />
			</Dialog>
			<UserList users={friends} />
		</aside>
	)
}

export default AsideSection
