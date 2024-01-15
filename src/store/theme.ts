import { atom } from 'nanostores'

export const $theme = atom(window.localStorage.fbmapp_theme)

export function initTheme() {
	if (
		$theme.get() === 'dark' ||
		(!('fbmapp_theme' in window.localStorage) &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
}

export function changeTheme(theme: string) {
	if (theme === 'system') {
		window.localStorage.removeItem('fbmapp_theme')
	} else {
		window.localStorage.fbmapp_theme = String(theme)
	}
	$theme.set(theme)
	initTheme()
}

initTheme()
