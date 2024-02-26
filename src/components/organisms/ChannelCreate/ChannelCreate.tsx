import type React from 'react'
import Button from '../../atoms/Button/Button.tsx'
import { createNewChannel } from '../../../services/channelService.ts'

const MessagesSection = () => {
	const handleNewChannel = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const dataList = new FormData(e.target as HTMLFormElement) as FormData
		const title = dataList.get('title') as string
		const description = dataList.get('description') as string

		createNewChannel({
			title,
			description,
		})
			.then((result) => {
				console.log('Channel created = ', result)
			})
			.catch((reasons) =>
				reasons?.errors?.[0]
					? alert(reasons?.errors?.[0].msg)
					: alert('An unknown error occur')
			)
	}

	return (
		<main>
			<h1>MAIN Chat</h1>

			<Button>Test button</Button>

			<h2>New channel!</h2>
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

export default MessagesSection
