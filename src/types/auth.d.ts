export type TLoginCredentials = {
	email: string
	password: string
}

export interface IAuth {
	accessToken: string
	role: string
}

export interface IAuthLocal extends IAuth {
	email: string
}

// export type AuthStoreType = {
// 	$auth: IAuthLocal
// 	setAuth: (auth: IAuthLocal) => void
// }
