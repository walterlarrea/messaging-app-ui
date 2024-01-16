import type { FormEvent } from 'react'
import Button from '../../atoms/Button/Button.tsx'
import Input from '../../atoms/Input/Input.tsx'
import { HiPaperAirplane } from 'react-icons/hi2'
import Toast from '../../molecules/Toast/Toast.jsx'

const MessagesSection = () => {
	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<main className="p-4 bg-[--accent]">
			<div className="flex flex-col gap-4 h-full">
				<div className="grow">Messages</div>

				<form
					onSubmit={sendMessage}
					className="flex justify-between items-center gap-2"
				>
					<Input
						type="text"
						boxSize="lg"
						id="message-text"
						name="message"
						placeholder=" Message"
					/>
					<Button type="submit" size="lg" classes="h-full text-5xl">
						<HiPaperAirplane />
					</Button>
				</form>
			</div>

			<Toast />
		</main>
	)
}

export default MessagesSection
