import type { TUserFriend } from '../../../types/users'
import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	users: TUserFriend[]
	highlightId?: number
	handleClick?: (user: TUserFriend) => void
}

const UserList = ({ users, highlightId, handleClick }: UserListProps) => {
	return (
		<ul>
			{users.map(({ id, username }, i) => (
				<li key={id} onClick={() => handleClick(users[i])}>
					<UserItem userName={username} highlight={highlightId === id} />
				</li>
			))}
		</ul>
	)
}

export default UserList
