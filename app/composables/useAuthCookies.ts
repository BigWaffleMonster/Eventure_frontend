export const useAuthCookies = () => {
  const accessTokenCookie = useCookie('accessToken', { maxAge: 60 * 60 * 24 }) // Example: 1 day
  const refreshTokenCookie = useCookie('refreshToken', { maxAge: 60 * 60 * 24 * 7 }) // Example: 7 days
  return { accessTokenCookie, refreshTokenCookie }
}
