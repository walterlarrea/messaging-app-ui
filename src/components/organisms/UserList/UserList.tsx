import UserItem from '../../molecules/UserListItem/UserListItem'

interface UserListProps {
	userNames: string[]
}

const UserList = ({ userNames }: UserListProps) => {
	return (
		<ul>
			{userNames.map((user, i) => (
				<UserItem key={i} userName={user} />
			))}
		</ul>
	)
}

export default UserList
