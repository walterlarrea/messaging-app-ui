import classNames from 'classnames'
import {
	forwardRef,
	type DialogHTMLAttributes,
	type MouseEvent,
	type ReactNode,
} from 'react'
import Button from '../../atoms/Button/Button'
import { bgColorVariants } from '../../../config/style'

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
	title: string
	classes?: string
	children: ReactNode
	handleClose: () => void
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
	({ title, classes, children, handleClose, ...rest }: DialogProps, ref) => {
		const classnames = classNames(
			bgColorVariants.card,
			'border-[--border]',
			'backdrop-blur',
			'backdrop-opacity-50',
			classes
		)

		const handleDialogClose = () => {
			handleClose()
		}
		const handleBackdropClick = (e: MouseEvent) => {
			const dialog = e.target as HTMLDialogElement
			if (dialog.nodeName === 'DIALOG') {
				dialog.close()
			}
		}

		return (
			<dialog
				ref={ref}
				onClick={handleBackdropClick}
				className={` border-2 border-gray-300 rounded-[20px] backdrop-blur backdrop-opacity-50 ${classnames}`}
				{...rest}
			>
				<div className="p-[15px]">
					<div className="flex items-center justify-between mb-[8px] w-full">
						<h1>{title}</h1>
						<Button
							variant="secondary"
							classes="uppercase font-bold"
							onClick={handleDialogClose}
							type="button"
						>
							X
						</Button>
					</div>
					<hr />
					{children}
				</div>
			</dialog>
		)
	}
)

export default Dialog
