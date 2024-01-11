import blankProfilePicture from '../../../assets/images/blank-profile-picture-640.png'

interface ItemProps {
	userName: string
}

const UserListItem = ({ userName }: ItemProps) => {
	return (
		<li className="flex flex-nowrap gap-[8px] p-[5px] cursor-pointer bg-slate-200 hover:bg-slate-100 border rounded-lg">
			<img
				src={blankProfilePicture.src}
				alt="Generic blank user picture"
				className="rounded-full w-[48px]"
			/>
			<span className="font-semibold">{userName}</span>
		</li>
	)
}

export default UserListItem
