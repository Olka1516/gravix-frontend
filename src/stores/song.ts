import { createUserSong } from '@/services'
import type { ISong } from '@/types'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const songStore = defineStore('songInfo', () => {
  const state: ISong = reactive({
    username: '',
    title: '',
    description: '',
    lyrics: '',
    image: null,
    song: null,
    genres: [],
    author: '',
    duration: '',
    releaseYear: '',
    rating: 0,
    ratingCount: 0,
  })

  const createSong = async (songData: ISong) => {
    await createUserSong(songData)
  }

  return {
    ...toRefs(state),
    createSong,
  }
})
