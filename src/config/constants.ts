const apiUrls = {
	development: 'http://127.0.0.1:3001',
	production: 'http://127.0.0.1:8080',
	test: 'http://127.0.0.1:3002',
}

export const API_URI: string =
	apiUrls[process.env.NODE_ENV] ?? 'http://127.0.0.1:8080'
