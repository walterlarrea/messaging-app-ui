import { approveFriendRequest } from '../../../services/friendsService'
import type { TApiErrors } from '../../../types/error'
import UserListItem from '../../molecules/UserListItem/UserListItem'
import { FaCheck } from 'react-icons/fa6'
import Loader from '../../atoms/Loader/Loader'
import Button from '../../atoms/Button/Button'
import { toast } from 'react-toastify'
import { useStore } from '@nanostores/react'
import { $friends } from '../../../store/friends'

const FriendRequestList = () => {
	const { friendRequests } = useStore($friends)

	if (!friendRequests) {
		return <Loader />
	}

	const handleFriendRequest = (targetUserId: number) => () => {
		toast.promise(approveFriendRequest(targetUserId), {
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
