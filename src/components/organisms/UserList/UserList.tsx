import type { TUserPublic } from '../../../types/users'
import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	users: TUserPublic[]
	highlightId?: number
	handleClick?: (user: TUserPublic) => void
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
