import { getArtistsByGenres, saveUserAnswers } from '@/services'
import { getPopularAuthors } from '@/services/recommendations'
import type { IAllUserData } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuestionsStore = defineStore('questions', () => {
  const genres = ref<string[]>([])
  const artists = ref<string[]>([])

  const setGenres = (tempGenres: string[]) => {
    genres.value = tempGenres
  }

  const setArtists = (tempGenres: string[]) => {
    artists.value = tempGenres
  }

  const getArtists = async () => {
    let data
    if (genres.value.length) data = await getArtistsByGenres(genres.value)
    else {
      const temp = await getPopularAuthors()
      data = temp.map((user: IAllUserData) => ({
        image: user.avatar,
        text: user.username,
        id: user.id,
      }))
    }
    return data
  }

  const saveData = async () => {
    await saveUserAnswers(genres.value, artists.value)
  }

  return { genres, setGenres, getArtists, artists, saveData, setArtists }
})
