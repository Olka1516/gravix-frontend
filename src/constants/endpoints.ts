export const ENDPOINTS = {
  REGISTRATION: '/users/register',
  LOGIN: '/users/login',
  PROFILE: '/users/profile',
  USERS: '/users/all',
  CREATE_SONG: '/songs/create',
  GET_SONGS: (username: string) => `/songs/all/${username}`,
  GET_SONG: (id: string) => `/songs/${id}`,
  USERS_INFO: (username: string) => `/users/info/${username}`,
}
