import {
  createUserSong,
  dislikeSongById,
  getSongById,
  getSongsByUsername,
  likeSongById,
} from '@/services'
import type { ISong, ISongGetted } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const songStore = defineStore('songInfo', () => {
  const state: Ref<ISongGetted[]> = ref([])

  const songs = new Map<string, ISongGetted[]>()
  const selectedSongs = new Map<string, ISongGetted>()

  const setDefault = () => {
    state.value = []
  }

  const createSong = async (songData: ISong) => {
    const data = await createUserSong(songData)
    state.value.push(data)
  }

  const getSongs = async (username: string) => {
    if (state.value.length) return
    state.value = await getSongsByUsername(username)
  }

  const getAnotherUserSongs = async (username: string) => {
    if (!songs.has(username)) {
      songs.set(username, await getSongsByUsername(username))
    }
    return songs.get(username) ?? []
  }

  const setSong = (data: ISongGetted) => {
    selectedSongs.set(data._id, data)
  }

  const getSong = async (id: string) => {
    if (selectedSongs.has(id)) return selectedSongs.get(id)

    const data = await getSongById(id)
    setSong(data)
    return data
  }

  const likeSong = async (id: string) => {
    const data = await getSong(id)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')

    if (!data.likes.includes(userInfo.id)) await likeSongById(id)
    else await dislikeSongById(id)

    const updatedSong = await getSongById(id)
    setSong(updatedSong)
  }

  return {
    state,
    createSong,
    getSongs,
    getAnotherUserSongs,
    setSong,
    getSong,
    likeSong,
    setDefault,
  }
})
