import { createUserSong, getSongsByUsername } from '@/services'
import type { ISong, ISongDictionary } from '@/types'
import { defineStore } from 'pinia'
import { reactive, type Reactive } from 'vue'

export const songStore = defineStore('songInfo', () => {
  const state: Reactive<ISong[]> = reactive([])

  const songs: ISongDictionary = reactive({})
  const createSong = async (songData: ISong) => {
    await createUserSong(songData)
  }

  const getSongs = async (username: string) => {
    const data = await getSongsByUsername(username)
    state.push(...data)
  }

  const getAnotherUserSongs = async (username: string) => {
    if (!songs[username]) {
      songs[username] = await getSongsByUsername(username)
    }
    return songs[username]
  }

  return {
    state,
    createSong,
    getSongs,
    getAnotherUserSongs,
  }
})
