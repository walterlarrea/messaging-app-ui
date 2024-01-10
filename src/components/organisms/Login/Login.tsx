import useAuth from '../../../hooks/useAuth'
import Button from '../../atoms/Button/Button'
import './login.css'
import { loginUser } from '../../../services/authService.ts'

const Login = () => {
	const { setAuth } = useAuth()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
			})
			.catch((reasons) =>
				reasons?.errors?.[0]
					? alert(reasons?.errors?.[0].msg)
					: alert('An unknown error occur')
			)
	}

	return (
		<>
			<form className="login-form" onSubmit={handleLogin}>
				<label htmlFor="login-email">E-mail</label>
				<input id="login-email" name="email" type="email" />

				<label htmlFor="login-password">Password</label>
				<input id="login-password" name="password" type="password" />

				<Button type="submit" variant="primary">
					Login
				</Button>
			</form>
		</>
	)
}

export default Login
