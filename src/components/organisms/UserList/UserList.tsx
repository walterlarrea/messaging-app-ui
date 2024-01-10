import type { TUserFriend } from '../../../types/users'
import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	friends: TUserFriend[]
}

const UserList = ({ friends }: UserListProps) => {
	return (
		<ul>
			{friends.map(({ id, username }) => (
				<UserItem key={id} userName={username} />
			))}
		</ul>
	)
}

export default UserList
