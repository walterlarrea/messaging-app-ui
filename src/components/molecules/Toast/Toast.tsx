import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { $theme } from '../../../store/theme'
import { useStore } from '@nanostores/react'

const Toast = () => {
	const theme = useStore($theme)

	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss
			draggable={false}
			pauseOnHover
			theme={theme || 'light'}
			transition={Bounce}
		/>
	)
}

export default Toast
