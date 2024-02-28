import { setAuth } from '../../../store/auth.ts'
import Button from '../../atoms/Button/Button'
import Input from '../../atoms/Input/Input.tsx'
import { loginUser } from '../../../services/authService.ts'
import { useState, type FormEvent } from 'react'
import Loader from '../../atoms/Loader/Loader.tsx'
import { toast } from 'react-toastify'
import type { TApiErrors } from '../../../types/error'
import * as Yup from 'yup'

interface LoginProps {
	classes?: string
}

const { string, object } = Yup

const loginSchema = object().shape({
	// password: string()
	// 	.matches(
	// 		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/,
	// 		'Password must have one uppercase, one lowercase, and one numeric digit'
	// 	)
	// 	.required('A password is required'),
	email: string()
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]){2,3}$/,
			'E-mail is not valid'
		)
		.email()
		.required('E-mail is required')
		.max(60),
})

const Login = ({ classes }: LoginProps) => {
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		setLoading(true)

		const dataList = new FormData(form) as FormData
		const dataObject = {
			email: dataList.get('email') as string,
			password: dataList.get('password') as string,
		}

		const validation = await loginSchema
			.validate(dataObject, { abortEarly: false })
			.then((res) => res)
			.catch((err) => err)

		if (!validation.email) {
			validation.inner.map((v) => toast.error(v.message))
			setLoading(false)
			return
		}

		setLoading(false)

		loginUser(dataObject)
			.then((result) => {
				const accessToken = result.accessToken
				const userId = result.userId
				const role = result.role

				setAuth({ userId, role, accessToken })
				form.reset()
				window.location.href = '/messages'
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
				noValidate
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
