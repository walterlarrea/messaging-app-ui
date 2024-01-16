import { atom } from 'nanostores'

export const $theme = atom(window.localStorage.fbmapp_theme)

export function initTheme() {
	if (
		window.localStorage.fbmapp_theme === 'dark' ||
		(!('fbmapp_theme' in window.localStorage) &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark')
		$theme.set('dark')
	} else {
		document.documentElement.classList.remove('dark')
		$theme.set('light')
	}

	window.localStorage.fbmapp_theme = String($theme.get())
}

export function changeTheme(theme: string) {
	if (
		theme === 'dark' ||
		(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)'))
			.matches
	) {
		document.documentElement.classList.add('dark')
		$theme.set('dark')
	} else {
		document.documentElement.classList.remove('dark')
		$theme.set('light')
	}

	window.localStorage.fbmapp_theme = String($theme.get())
}

initTheme()
