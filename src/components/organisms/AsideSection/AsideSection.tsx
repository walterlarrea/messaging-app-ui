import Button from '../../atoms/Button/Button'
import UserList from '../UserList/UserList'

const AsideSection = () => {
	return (
		<aside>
			<div className="flex justify-between">
				<h2>APP ASIDE</h2>
				<Button>+</Button>
			</div>
			<UserList userNames={['walter', 'eduardo', 'gabriel']} />
		</aside>
	)
}

export default AsideSection
