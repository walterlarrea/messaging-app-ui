import { useRef, type ChangeEvent } from 'react'
import Button from '../../atoms/Button/Button'
import Dialog from '../../molecules/Dialog/Dialog'
import { GoGear } from 'react-icons/go'
import { useStore } from '@nanostores/react'
import { $theme, changeTheme } from '../../../store/theme'

const ConfigMenuDialog = () => {
	const theme = useStore($theme)
	const configDialog = useRef<HTMLDialogElement>(null)

	const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedTheme = e.target.value
		changeTheme(selectedTheme)
	}

	const openConfigDialog = () => {
		configDialog.current?.showModal()
	}
	const closeConfigDialog = () => {
		configDialog.current?.close()
	}
	return (
		<>
			<Button
				size="lg"
				classes="p-2 bg-transparent"
				variant="secondary"
				onClick={openConfigDialog}
			>
				<GoGear />
			</Button>
			<Dialog
				title="Configurations"
				ref={configDialog}
				handleClose={closeConfigDialog}
			>
				<ul>
					<li>
						<label htmlFor="change-theme">Color theme: </label>
						<select
							className="bg-[--background]"
							id="change-theme"
							onChange={handleThemeChange}
							defaultValue={theme || 'system'}
						>
							<option value="light">Light</option>
							<option value="dark">Dark</option>
							<option value="system">Use system's preference</option>
						</select>
					</li>
				</ul>
			</Dialog>
		</>
	)
}

export default ConfigMenuDialog
