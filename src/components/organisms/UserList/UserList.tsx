import type { TUserFriend, TUserFriendDictionary } from '../../../types/users'
import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	users: TUserFriendDictionary
	highlightId?: number
	handleClick?: (user: TUserFriend) => void
}

const UserList = ({ users, highlightId, handleClick }: UserListProps) => {
	return (
		<ul>
			{Array.from(users.values()).map(({ id, username }) => (
				<li key={id} onClick={() => handleClick(users.get(id))}>
					<UserItem userName={username} highlight={highlightId === id} />
				</li>
			))}
		</ul>
	)
}

export default UserList
