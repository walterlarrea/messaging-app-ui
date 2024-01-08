import axios from '../../../utils/axios'
import useAuth from '../../../hooks/useAuth'
import Button from '../../atoms/Button/Button'
import './login.css'
import type { AxiosResponse } from 'axios'

const Login = () => {
	const { setAuth } = useAuth()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const dataList = new FormData(e.target as HTMLFormElement) as FormData
		const userEmail = dataList.get('email') as string
		const userPwd = dataList.get('password') as string

		const response = (await axios
			.post(
				'/api/login',
				{ email: userEmail, password: userPwd },
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			)
			.catch((error) => {
				console.log('API ERROR MSG', error.response.data)
			})) as AxiosResponse

		if (response.status >= 200 && response.status < 300) {
			console.log('LOGGED', response.status, JSON.stringify(response.data))

			const accessToken = response?.data?.accessToken
			const role = response?.data?.role
			const email = userEmail

			setAuth({ email, role, accessToken })

			window.location.href = '/messages'
		}
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
