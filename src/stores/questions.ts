import { getArtistsByGenres, saveUserAnswers } from '@/services'
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
    const data = await getArtistsByGenres(genres.value)
    return data
  }

  const saveData = async () => {
    await saveUserAnswers(genres.value, artists.value)
  }

  return { genres, setGenres, getArtists, artists, saveData, setArtists }
})
