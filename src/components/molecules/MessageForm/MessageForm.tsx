import {
	useRef,
	useState,
	type ChangeEvent,
	type FormEvent,
	type KeyboardEvent,
} from 'react'
import Button from '../../atoms/Button/Button'
import { HiPaperAirplane } from 'react-icons/hi2'
import Textarea from '../../atoms/Textarea/Textarea'

interface MessageProps {
	submitNewMessage: (messageContent: string) => Promise<boolean>
}

const MessageForm = ({ submitNewMessage }: MessageProps) => {
	const [msgContent, setMsgContent] = useState('')
	const messageForm = useRef(null)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!msgContent || msgContent.length <= 0) return

		submitNewMessage(msgContent).then(() => setMsgContent(''))
	}

	const handleSubmitEnterKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			messageForm.current &&
				messageForm.current.dispatchEvent(
					new Event('submit', { bubbles: true, cancelable: true })
				)
		}
	}

	const handleMsgInputSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target
		setMsgContent(input.value)

		input.rows = input.value !== '' ? Math.floor(input.scrollHeight / 34) : 1
	}

	return (
		<form
			autoComplete="off"
			ref={messageForm}
			onSubmit={handleSubmit}
			className="flex justify-between gap-2"
		>
			<Textarea
				id="message-text"
				name="message"
				boxSize="lg"
				placeholder="Message"
				value={msgContent}
				onChange={handleMsgInputSize}
				onKeyDown={handleSubmitEnterKey}
			/>
			<Button
				type="submit"
				size="lg"
				classes="text-5xl"
				disabled={msgContent.length <= 0}
			>
				<HiPaperAirplane />
			</Button>
		</form>
	)
}

export default MessageForm
