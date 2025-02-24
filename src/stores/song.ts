import { createUserSong, getSongById, getSongsByUsername } from '@/services'
import type { ISong, ISongGetted } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const songStore = defineStore('songInfo', () => {
  const state: Ref<ISongGetted[]> = ref([])

  const songs = new Map<string, ISongGetted[]>()
  const selectedSongs = new Map<string, ISongGetted>()

  const createSong = async (songData: ISong) => {
    await createUserSong(songData)
    state.value = await getSongsByUsername(songData.username)
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
    selectedSongs.set(data.id, data)
  }

  const getSong = async (id: string) => {
    if (selectedSongs.has(id)) return selectedSongs.get(id)

    const data = await getSongById(id)
    setSong(data)
    return data
  }

  return {
    state,
    createSong,
    getSongs,
    getAnotherUserSongs,
    setSong,
    getSong,
  }
})
