import type React from 'react'
import useAuth from '../../../hooks/useAuth'
import Button from '../../atoms/Button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import type { AxiosResponse } from 'axios'

const MainSection = () => {
	const { auth } = useAuth()
	const axiosPrivate = useAxiosPrivate()

	const handleNewChannel = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const dataList = new FormData(e.target as HTMLFormElement) as FormData
		const title = dataList.get('title') as string
		const description = dataList.get('description') as string

		const response = (await axiosPrivate
			.post('/api/channel', {
				title,
				description,
			})
			.catch((error) => {
				console.log('API ERROR MSG', error.response.data)
			})) as AxiosResponse

		if (response.status >= 200 && response.status < 300) {
			console.log('CHN CREATED', response.status, JSON.stringify(response.data))
		}
	}

	return (
		<main>
			<h1>MAIN Chat</h1>

			<Button>Test button</Button>

			<h2>New channel! {auth.email}</h2>
			<form onSubmit={handleNewChannel}>
				<label htmlFor="title">Title</label>
				<input id="title" name="title" />

				<label htmlFor="description">Description</label>
				<input id="description" name="description" />
				<Button type="submit">
					Create
					<span>→</span>
				</Button>
			</form>
		</main>
	)
}

export default MainSection
