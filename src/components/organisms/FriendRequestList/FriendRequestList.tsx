import {
	approveFriendRequest,
	markFriendRequestAsSeen,
} from '../../../services/friendsService'
import type { TApiErrors } from '../../../types/error'
import UserListItem from '../../molecules/UserListItem/UserListItem'
import { FaCheck } from 'react-icons/fa6'
import Loader from '../../atoms/Loader/Loader'
import Button from '../../atoms/Button/Button'
import { toast } from 'react-toastify'
import { useStore } from '@nanostores/react'
import {
	$friends,
	approvedFriendRequest,
	changeSeenFriendRequest,
} from '../../../store/friends'

const FriendRequestList = () => {
	const { friendRequests } = useStore($friends)

	if (!friendRequests) {
		return <Loader />
	}

	const acceptFriendRequest = (targetUserId: number) => () => {
		approveFriendRequest(targetUserId)
			.then(() => {
				approvedFriendRequest()
				toast.success('Friend request accepted')
			})
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
			})
	}

	const markSeenFriendRequest =
		(targetUserId: number, unseen: boolean) => () => {
			if (!unseen) return
			changeSeenFriendRequest(targetUserId)

			markFriendRequestAsSeen(targetUserId)
				.then()
				.catch((error: TApiErrors) => {
					const message = error?.errors?.[0]
						? error?.errors?.[0].msg
						: 'An unknown error occur'
					toast.error(message)
				})
		}

	return (
		<ul className="relative">
			{friendRequests.map(({ id, username, unseen }) => (
				<li
					key={id}
					onMouseOver={markSeenFriendRequest(id, unseen)}
					className={
						unseen
							? 'after:content-[" "] after:absolute after:rounded-full after:bg-[--primary] after:top-2 after:left-2 after:w-4 after:h-4'
							: ''
					}
				>
					<UserListItem userName={username}>
						<Button
							onClick={acceptFriendRequest(id)}
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
