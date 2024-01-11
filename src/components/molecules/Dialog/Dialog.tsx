import classNames from 'classnames'
import {
	forwardRef,
	type DialogHTMLAttributes,
	type ReactNode,
	type Ref,
} from 'react'
import Button from '../../atoms/Button/Button'

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
	title: string
	Ref: Ref<HTMLDialogElement>
	classes?: string
	children: ReactNode
}

const Dialog = forwardRef(
	({ title, classes, children, Ref, ...rest }: DialogProps) => {
		const classnames = classNames(
			'backdrop-blur',
			'backdrop-opacity-50',
			classes
		)

		const handleDialogClose = () => {
			console.log(Ref)
		}

		return (
			<dialog
				ref={Ref}
				className={`p-[15px] border-2 border-gray-300 rounded-[20px] backdrop-blur backdrop-opacity-50 ${classnames}`}
				{...rest}
			>
				<div className="flex items-center justify-between mb-[8px]">
					<h1>{title}</h1>
					<Button variant="light" onClick={handleDialogClose} type="button">
						X
					</Button>
				</div>
				{children}
			</dialog>
		)
	}
)

export default Dialog
