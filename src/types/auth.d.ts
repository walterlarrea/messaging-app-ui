export type TLoginCredentials = {
	email: string
	password: string
}

export interface IAuth {
	accessToken: string
	userId: number
	role: string
}

// export type AuthStoreType = {
// 	$auth: IAuthLocal
// 	setAuth: (auth: IAuthLocal) => void
// }
