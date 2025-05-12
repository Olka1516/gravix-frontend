import { ENDPOINTS } from '@/constants'
import http from '../http'

export const getRecommendPlaylistsGenres = async () => {
  const data = await http.get(ENDPOINTS.GET_RECOMMEND_PLAYLISTS_GENRES)
  return data.data
}

export const getRecommendPlaylistsAuthors = async () => {
  const data = await http.get(ENDPOINTS.GET_RECOMMEND_PLAYLISTS_AUTHORS)
  return data.data
}

export const getRecommendSongsGenres = async () => {
  const data = await http.get(ENDPOINTS.GET_RECOMMEND_SONGS_GENRES)
  return data.data
}

export const getRecommendSongsAuthors = async () => {
  const data = await http.get(ENDPOINTS.GET_RECOMMEND_SONGS_AUTHORS)
  return data.data
}

export const getRecommendSongsRandom = async () => {
  const data = await http.get(ENDPOINTS.GET_RECOMMEND_SONGS_RANDOM)
  return data.data
}

export const getPopularSongs = async () => {
  const data = await http.get(ENDPOINTS.GET_POPULAR_SONGS)
  return data.data
}

export const getPopularAuthors = async () => {
  const data = await http.get(ENDPOINTS.GET_POPULAR_AUTHORS)
  return data.data
}

export const getPopularPlaylists = async () => {
  const data = await http.get(ENDPOINTS.GET_POPULAR_PLAYLISTS)
  return data.data
}

export const searchDataByValue = async (text: string, selectedValue: string) => {
  const data = await http.get(ENDPOINTS.GET_DATA_BY_SEARCH + `?query=${text}&type=${selectedValue}`)
  return data.data
}
