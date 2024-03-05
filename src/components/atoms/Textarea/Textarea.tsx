import type { ReactNode, TextareaHTMLAttributes } from 'react'
import { specialColorVariants } from '../../../config/style'
import './Textarea.module.css'
import classNames from 'classnames'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string
	name: string
	rows?: number
	boxSize?: 'sm' | 'md' | 'lg'
	disabled?: boolean
	classes?: string
	children?: ReactNode
}

const Textarea = ({
	id,
	name,
	rows = 1,
	boxSize = 'md',
	disabled = false,
	classes,
	children,
	...rest
}: TextareaProps) => {
	const classnames: string = classNames(
		classes,
		disabled
			? specialColorVariants.muted
			: 'bg-[--background] hover:opacity-80',
		'border-[--border]',
		'border-2',
		'rounded-[--radius]',
		'm-0',
		'px-[10px]',
		'py-[5px]'
	)

	return (
		<div className="flex flex-col flex-nowrap grow">
			<label className="text-[--secondary-foreground]" htmlFor={id}>
				{children}
			</label>
			<textarea
				className={classnames}
				id={id}
				name={name}
				rows={rows}
				disabled={disabled}
				data-size={boxSize}
				{...rest}
			/>
		</div>
	)
}

export default Textarea
