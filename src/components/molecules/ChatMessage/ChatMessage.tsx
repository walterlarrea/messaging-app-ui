import classNames from 'classnames'
import {
	actionColorVariants,
	specialColorVariants,
} from '../../../config/style'

interface MessageProps {
	content: string
	date: Date
	isMine: boolean
	classes?: string
}

const ChatMessage = ({ content, date, isMine }: MessageProps) => {
	const messageStyle = isMine ? 'self-end' : 'self-start'

	const classnames = classNames(
		messageStyle,
		isMine ? specialColorVariants.accent : actionColorVariants.primary,
		'p-2',
		'max-w-[400px]',
		'rounded-[--radius]'
	)

	return (
		<section className={`flex ${classnames}`}>
			<span className="self-start">{content}</span>
			<small className="ps-2 self-end text-[--muted-foreground]">
				{String(date)}
			</small>
		</section>
	)
}

export default ChatMessage
