export interface AuthI {
  isAuth: boolean,
  isFetch: boolean,
}

export interface LoginRequestI {
  email: string,
  password: string
}

export interface SignUpRequestI {
  email: string
}
