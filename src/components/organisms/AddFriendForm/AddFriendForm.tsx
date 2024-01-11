import type { FormEvent } from 'react'
import Button from '../../atoms/Button/Button'
import Input from '../../atoms/Input/Input.tsx'
import { requestFriend } from '../../../services/friendsService.ts'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import type { TApiErrors } from '../../../types/error'

interface LoginProps {
	classes?: string
}

const AddFriendForm = ({ classes }: LoginProps) => {
	const addFriend = useAxiosPrivate(requestFriend)

	const handleAddFriend = (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const targetUser = formData.get('username')

		addFriend(targetUser)
			.then((result) => {
				console.log('result', result)
			})
			.catch((error: TApiErrors) => {
				error?.errors?.[0]
					? alert(error?.errors?.[0])
					: alert('An unknown error occur')
			})
	}

	return (
		<>
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
