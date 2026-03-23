export type authType = {
  id: string | null
  email: string | null
  nickName: string | null
  tokens: {
    accessToken: string | null
    refreshToken: string | null
  }
}

export type userResponse = {
  user_id: string | null
  email: string | null
  login: string | null
  access_token: string | null
  refresh_token: string | null
}
