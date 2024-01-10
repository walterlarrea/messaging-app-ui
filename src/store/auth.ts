import { atom } from 'nanostores'
import type { IAuthLocal } from '../types/auth'

export const $auth = atom<IAuthLocal>()

export function setAuth(auth: IAuthLocal) {
	$auth.set(auth)
}
