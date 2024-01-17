import type { InputHTMLAttributes, ReactNode } from 'react'
import { specialColorVariants } from '../../../config/style'
import './Input.module.css'
import classNames from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string
	name: string
	boxSize?: 'sm' | 'md' | 'lg'
	type:
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'search'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
	disabled?: boolean
	classes?: string
	children?: ReactNode
}

const Input = ({
	id,
	name,
	boxSize = 'md',
	type,
	disabled = false,
	classes,
	children,
	...rest
}: InputProps) => {
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
			<input
				className={classnames}
				id={id}
				name={name}
				type={type}
				disabled={disabled}
				data-size={boxSize}
				{...rest}
			/>
		</div>
	)
}

export default Input
