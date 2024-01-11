import { useEffect, useRef, useState } from 'react'
import Button from '../../atoms/Button/Button'
import UserList from '../UserList/UserList'
import { getFriends } from '../../../services/friendsService'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { TUserFriend } from '../../../types/users'
import Dialog from '../../molecules/Dialog/Dialog'
import AddFriendForm from '../AddFriendForm/AddFriendForm'

const AsideSection = () => {
	const [friends, setFriends] = useState<TUserFriend[]>([])
	const friendDialog = useRef<HTMLDialogElement>(null)
	const getUserFriend = useAxiosPrivate(getFriends)

	useEffect(() => {
		getUserFriend()
			.then((result: TUserFriend[]) => {
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

	return (
		<aside>
			<div className="flex justify-between">
				<h2>APP ASIDE</h2>
				<Button onClick={openFriendDialog}>+</Button>
				<Dialog title="Friend request" Ref={friendDialog}>
					<AddFriendForm />
				</Dialog>
			</div>
			<UserList friends={friends} />
		</aside>
	)
}

export default AsideSection
