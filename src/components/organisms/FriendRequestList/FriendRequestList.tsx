import { useEffect, useState } from 'react'
// import Button from '../../atoms/Button/Button'
import {
	getFriendRequests,
	approveFriendRequest,
} from '../../../services/friendsService'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { TUserPublic } from '../../../types/users'
import type { TApiErrors } from '../../../types/error'
import UserListItem from '../../molecules/UserListItem/UserListItem'
import { FaCheck } from 'react-icons/fa6'
import Loader from '../../atoms/Loader/Loader'
import Button from '../../atoms/Button/Button'
import { toast } from 'react-toastify'

const FriendRequestList = () => {
	const [friendRequests, setFriendRequests] = useState<TUserPublic[]>()
	const getUserFriendRequests = useAxiosPrivate(getFriendRequests)
	const acceptFriendRequest = useAxiosPrivate(approveFriendRequest)

	useEffect(() => {
		getUserFriendRequests()
			.then((result: TUserPublic[]) => {
				setFriendRequests(result)
			})
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
			})
	}, [])

	if (!friendRequests) {
		return <Loader />
	}

	const handleFriendRequest = (targetUserId: number) => () => {
		toast.promise(acceptFriendRequest(targetUserId), {
			pending: 'Approving friend request',
			success: 'Friend request successfully approved',
			error: {
				render({ data }) {
					const { errors } = data as TApiErrors
					return errors?.[0] ? errors?.[0].msg : 'An unknown error occur'
				},
			},
		})
	}

	return (
		<ul>
			{friendRequests.map(({ id, username }) => (
				<li key={id}>
					<UserListItem userName={username}>
						<Button
							onClick={handleFriendRequest(id)}
							classes="justify-self-end"
						>
							<FaCheck />
						</Button>
					</UserListItem>
				</li>
			))}
		</ul>
	)
}

export default FriendRequestList
