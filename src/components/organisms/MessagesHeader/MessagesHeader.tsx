import classNames from 'classnames'
import { $chat } from '../../../store/chat'
import { useStore } from '@nanostores/react'
import blankProfilePicture from '../../../assets/images/blank-profile-picture-640.png'
import { bgColorVariants } from '../../../config/style'

const MessagesHeader = () => {
	const chatStore = useStore($chat)
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
			{chatStore.currentUser && (
				<>
					<img
						src={blankProfilePicture.src}
						alt="Generic blank user picture"
						className="rounded-full w-[48px]"
					/>
					<div className="grow flex flex-col overflow-hidden">
						<span className="font-semibold truncate">
							{chatStore.currentUser.username}
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
