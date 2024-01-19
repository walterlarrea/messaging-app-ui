import { useState, type FormEvent } from 'react'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import { HiPaperAirplane } from 'react-icons/hi2'

interface MessageProps {
	submitNewMessage: (messageContent: string) => Promise<boolean>
}

const MessageForm = ({ submitNewMessage }: MessageProps) => {
	const [msgContent, setMsgContent] = useState('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!msgContent || msgContent.length <= 0) return

		submitNewMessage(msgContent).then(() => setMsgContent(''))
	}

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit}
			className="flex justify-between items-center gap-2"
		>
			<Input
				type="text"
				boxSize="lg"
				id="message-text"
				name="message"
				placeholder=" Message"
				value={msgContent}
				onChange={(e) => setMsgContent(e.target.value)}
			/>
			<Button
				type="submit"
				size="lg"
				classes="h-full text-5xl"
				disabled={msgContent.length <= 0}
			>
				<HiPaperAirplane />
			</Button>
		</form>
	)
}

export default MessageForm
