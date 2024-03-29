import classNames from 'classnames'
import blankProfilePicture from '../../../assets/images/blank-profile-picture-640.png'
import { bgColorVariants } from '../../../config/style'
import type { ReactNode } from 'react'

interface ItemProps {
	userName: string
	highlight?: boolean
	children?: ReactNode
}

const UserListItem = ({ userName, highlight, children }: ItemProps) => {
	const containerClasses = classNames(
		bgColorVariants.card,
		'flex',
		'flex-nowrap',
		'gap-[8px]',
		'p-2',
		'cursor-pointer',
		highlight && 'bg-[--secondary]',
		'hover:bg-[--secondary]',
		'relative'
	)

	const infoClasses = classNames('grow', 'flex', 'flex-col', 'overflow-hidden')

	return (
		<div className={containerClasses}>
			<img
				src={blankProfilePicture.src}
				alt="Generic blank user picture"
				className="rounded-full w-[48px]"
			/>
			<div className={infoClasses}>
				<span className="font-semibold truncate">{userName}</span>
				<span className="text-[--muted-foreground] truncate"></span>
			</div>
			<div className="self-center">{children}</div>
		</div>
	)
}

export default UserListItem
