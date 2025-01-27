export const ENDPOINTS = {
  REGISTRATION: '/users/register',
  LOGIN: '/users/login',
  PROFILE: '/users/profile',
  USERS: '/users/all',
  USERS_INFO: (username: string) => `/users/info/${username}`,
}
