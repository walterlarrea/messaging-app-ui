interface ItemProps {
	userName: string
}

const UserListItem = ({ userName }: ItemProps) => {
	return <li>{userName}</li>
}

export default UserListItem
