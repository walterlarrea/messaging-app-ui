import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
	actionColorVariants,
	specialColorVariants,
} from '../../../config/style'
import './Button.module.css'
import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type?: 'button' | 'submit'
	size?: 'sm' | 'md' | 'lg'
	//outline?: boolean
	variant?: 'primary' | 'secondary' | 'danger'
	disabled?: boolean
	classes?: string
	children: ReactNode
}

const Button = ({
	type = 'button',
	size = 'md',
	//outline,
	variant = 'primary',
	disabled = false,
	classes,
	children,
	...rest
}: ButtonProps) => {
	const classnames: string = classNames(
		classes,
		//{ outline },
		disabled ? specialColorVariants.muted : actionColorVariants[variant],
		disabled && 'cursor-default',
		'h-fit',
		'text-nowrap',
		'rounded-[--radius]'
	)

	return (
		<button
			className={classnames}
			type={type}
			disabled={disabled}
			data-size={size}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
