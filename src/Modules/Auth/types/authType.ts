export type authType = {
  id: string | null
  email: string | null
  nickName: string | null
  tokens: {
    accessToken: string | null
    refreshToken: string | null
  }
}
