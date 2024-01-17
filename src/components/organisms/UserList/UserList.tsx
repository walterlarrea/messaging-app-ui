import type { TUserPublic } from '../../../types/users'
import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	users: TUserPublic[]
	highlightId?: number
	handleClick?: (id: number) => void
}

const UserList = ({ users, highlightId, handleClick }: UserListProps) => {
	return (
		<ul>
			{users.map(({ id, username }) => (
				<li key={id} onClick={() => handleClick(id)}>
					<UserItem userName={username} highlight={highlightId === id} />
				</li>
			))}
		</ul>
	)
}

export default UserList
