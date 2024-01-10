import type { InputHTMLAttributes, ReactNode } from 'react'
import { variants } from '../../../config/style'
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
	variant?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark'
	classes?: string
	children: ReactNode
}

const Input = ({
	id,
	name,
	boxSize = 'md',
	type,
	variant = 'light',
	classes,
	children,
	...rest
}: InputProps) => {
	const classnames: string = classNames(classes, variants[variant])

	return (
		<div className="flex flex-col flex-nowrap grow">
			<label htmlFor={id}>{children}</label>
			<input
				className={classnames}
				id={id}
				name={name}
				type={type}
				data-size={boxSize}
				{...rest}
			/>
		</div>
	)
}

export default Input
