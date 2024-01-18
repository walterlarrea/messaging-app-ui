import type { ButtonHTMLAttributes, ElementType } from 'react'
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
	Icon: ElementType
}

const Button = ({
	type = 'button',
	size = 'md',
	Icon,
	//outline,
	variant = 'secondary',
	disabled = false,
	classes,
	...rest
}: ButtonProps) => {
	const classnames: string = classNames(
		classes,
		//{ outline },
		disabled ? specialColorVariants.muted : actionColorVariants[variant],
		disabled && 'cursor-default',
		'h-fit',
		'rounded-[--radius]'
	)

	return (
		<Icon
			className={classnames}
			type={type}
			disabled={disabled}
			data-size={size}
			{...rest}
		/>
	)
}

export default Button
