import { atom } from 'nanostores'
import type { IAuth } from '../types/auth'

export const $auth = atom<IAuth>({})

export function setAuth(auth: IAuth) {
	$auth.set(auth)
}
