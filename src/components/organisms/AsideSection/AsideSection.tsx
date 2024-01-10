import { useEffect, useState } from 'react'
import Button from '../../atoms/Button/Button'
import UserList from '../UserList/UserList'
import { getFriends } from '../../../services/friendsService'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { TUserFriend } from '../../../types/users'

const AsideSection = () => {
	const [friends, setFriends] = useState<TUserFriend[]>([])
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

	return (
		<aside>
			<div className="flex justify-between">
				<h2>APP ASIDE</h2>
				<Button>+</Button>
			</div>
			<UserList friends={friends} />
		</aside>
	)
}

export default AsideSection
