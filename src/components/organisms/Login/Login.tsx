import useAuth from '../../../hooks/useAuth'
import Button from '../../atoms/Button/Button'
import Input from '../../atoms/Input/Input.tsx'
import { loginUser } from '../../../services/authService.ts'
import type { FormEvent } from 'react'

interface LoginProps {
	classes?: string
}

const Login = ({ classes }: LoginProps) => {
	const { setAuth } = useAuth()

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const dataList = new FormData(e.target as HTMLFormElement) as FormData
		const userEmail = dataList.get('email') as string
		const userPwd = dataList.get('password') as string

		loginUser({
			email: userEmail,
			password: userPwd,
		})
			.then((result) => {
				const accessToken = result.accessToken
				const role = result.role
				const email = userEmail

				setAuth({ email, role, accessToken })
				window.location.href = '/messages'
			})
			.catch((reasons) =>
				reasons?.errors?.[0]
					? alert(reasons?.errors?.[0].msg)
					: alert('An unknown error occur')
			)
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
		</>
	)
}

export default Login
