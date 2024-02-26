import classNames from 'classnames'
import { $friends } from '../../../store/friends'
import { useStore } from '@nanostores/react'
import blankProfilePicture from '../../../assets/images/blank-profile-picture-640.png'
import { bgColorVariants } from '../../../config/style'

const MessagesHeader = () => {
	const friendsStore = useStore($friends)
	const classnames = classNames(
		bgColorVariants.card,
		'flex',
		'flex-nowrap',
		'gap-[8px]',
		'p-2',
		'bg-[--secondary]'
	)

	return (
		<div className={classnames}>
			{friendsStore.currentFriendChat && (
				<>
					<img
						src={blankProfilePicture.src}
						alt="Generic blank user picture"
						className="rounded-full w-[48px]"
					/>
					<div className="grow flex flex-col overflow-hidden">
						<span className="font-semibold truncate">
							{friendsStore.currentFriendChat.username}
						</span>
						<span className="text-[--muted-foreground] truncate"></span>
					</div>
					<div className="self-center"></div>
				</>
			)}
		</div>
	)
}

export default MessagesHeader
