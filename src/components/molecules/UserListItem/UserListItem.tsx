import classNames from 'classnames'
import blankProfilePicture from '../../../assets/images/blank-profile-picture-640.png'
import { bgColorVariants } from '../../../config/style'
import type { ReactNode } from 'react'

interface ItemProps {
	userName: string
	children?: ReactNode
}

const UserListItem = ({ userName, children }: ItemProps) => {
	const classnames = classNames(
		bgColorVariants.card,
		'flex flex-nowrap gap-[8px] p-2 cursor-pointer bg-[--transparent] hover:bg-[--background]'
	)

	return (
		<div className={classnames}>
			<img
				src={blankProfilePicture.src}
				alt="Generic blank user picture"
				className="rounded-full w-[48px]"
			/>
			<div className="grow flex flex-col overflow-hidden">
				<span className="font-semibold truncate">{userName}</span>
				<span className="text-[--muted-foreground] truncate"></span>
			</div>
			<div className="self-center">{children}</div>
		</div>
	)
}

export default UserListItem
