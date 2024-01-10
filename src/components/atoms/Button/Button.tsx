import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { variants } from '../../../config/style'
import './Button.module.css'
import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type?: 'button' | 'submit'
	size?: 'sm' | 'md' | 'lg'
	//outline?: boolean
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

const Button = ({
	type = 'button',
	size = 'md',
	//outline,
	variant = 'primary',
	classes,
	children,
	...rest
}: ButtonProps) => {
	const classnames: string = classNames(
		classes,
		//{ outline },
		variants[variant]
	)

	return (
		<button className={classnames} type={type} data-size={size} {...rest}>
			{children}
		</button>
	)
}

export default Button
