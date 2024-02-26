export const API_URI: string = window
	? 'http://localhost:3001' // window.location.origin
	: import.meta.env.PUBLIC_SITE
