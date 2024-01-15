import { useEffect, useState } from 'react'
// import Button from '../../atoms/Button/Button'
import { getFriendRequests } from '../../../services/friendsService'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { TUserPublic } from '../../../types/users'
import FriendRequestItem from '../../molecules/FriendRequestItem/FriendRequestItem'

const FriendRequestList = () => {
	const [friendRequests, setFriendRequests] = useState<TUserPublic[]>([])
	const getUserFriendRequests = useAxiosPrivate(getFriendRequests)

	useEffect(() => {
		getUserFriendRequests()
			.then((result: TUserPublic[]) => {
				setFriendRequests(result)
			})
			.catch((reasons) => {
				reasons?.errors?.[0]
					? alert(reasons?.errors?.[0].msg)
					: alert('An unknown error occur')
			})
	}, [])

	return (
		<ul>
			{friendRequests.map(({ id, username }) => (
				<FriendRequestItem key={id} userName={username} />
			))}
		</ul>
	)
}

export default FriendRequestList
