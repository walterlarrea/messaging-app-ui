import type { TUserPublic } from '../../../types/users'
import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	users: TUserPublic[]
}

const UserList = ({ users }: UserListProps) => {
	return (
		<ul>
			{users.map(({ id, username }) => (
				<UserItem key={id} userName={username} />
			))}
		</ul>
	)
}

export default UserList
