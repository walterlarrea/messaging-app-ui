import type { FormEvent } from 'react'
import Button from '../../atoms/Button/Button'
import Input from '../../atoms/Input/Input.tsx'
import { requestFriend } from '../../../services/friendsService.ts'
import type { TApiErrors } from '../../../types/error'
import { toast } from 'react-toastify'

interface LoginProps {
	classes?: string
}

const AddFriendForm = ({ classes }: LoginProps) => {
	const handleAddFriend = (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const targetUser = formData.get('username')

		requestFriend(String(targetUser))
			.then(() => {
				toast.success('Friend request sent')
			})
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
			})
	}

	return (
		<>
			<h3>Send friends request</h3>
			<form
				className={`flex flex-wrap items-end gap-[10px] p-[15px] border-2 border-gray-300 rounded-[20px] ${classes}`}
				onSubmit={handleAddFriend}
				method="dialog"
			>
				<Input
					id="request-username"
					name="username"
					type="text"
					placeholder="Friend's username"
				>
					Username
				</Input>

				<Button classes="ms-auto" type="submit">
					Send
				</Button>
			</form>
		</>
	)
}

export default AddFriendForm
