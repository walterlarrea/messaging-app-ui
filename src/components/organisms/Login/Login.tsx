import { setAuth } from '../../../store/auth.ts'
import Button from '../../atoms/Button/Button'
import Input from '../../atoms/Input/Input.tsx'
import { loginUser } from '../../../services/authService.ts'
import { useState, type FormEvent } from 'react'
import Loader from '../../atoms/Loader/Loader.tsx'
import { toast } from 'react-toastify'
import type { TApiErrors } from '../../../types/error'

interface LoginProps {
	classes?: string
}

const Login = ({ classes }: LoginProps) => {
	const [loading, setLoading] = useState(false)

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		setLoading(true)

		const dataList = new FormData(form) as FormData
		const userEmail = dataList.get('email') as string
		const userPwd = dataList.get('password') as string

		const formInputs = form.getElementsByTagName('input')
		for (const input of formInputs) {
			input.value = ''
		}

		loginUser({
			email: userEmail,
			password: userPwd,
		})
			.then((result) => {
				const accessToken = result.accessToken
				const userId = result.userId
				const role = result.role

				setAuth({ userId, role, accessToken })
				//window.location.href = '/messages'
			})
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
				setLoading(false)
			})
	}

	return (
		<>
			<form
				className={`flex flex-wrap items-end gap-[10px] p-[15px] border-2 border-[--border] rounded-[20px] bg-[--background] ${classes}`}
				onSubmit={handleLogin}
			>
				<Input id="login-email" name="email" type="email">
					E-mail
				</Input>

				<Input id="login-password" name="password" type="password">
					Password
				</Input>

				<Button classes="ms-auto" type="submit">
					Sign in
				</Button>
			</form>
			{loading && <Loader />}
		</>
	)
}

export default Login
