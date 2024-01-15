import classNames from 'classnames'
import blankProfilePicture from '../../../assets/images/blank-profile-picture-640.png'
import { bgColorVariants } from '../../../config/style'

interface ItemProps {
	userName: string
}

const FriendRequestItem = ({ userName }: ItemProps) => {
	const classnames = classNames(
		bgColorVariants.card,
		'flex flex-nowrap gap-[8px] p-[5px] cursor-pointer hover:opacity-80 border rounded-lg'
	)
	return (
		<li className={classnames}>
			<img
				src={blankProfilePicture.src}
				alt="Generic blank user picture"
				className="rounded-full w-[48px]"
			/>
			<span className="font-semibold">{userName}</span>
		</li>
	)
}

export default FriendRequestItem
