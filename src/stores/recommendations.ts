import {
  getPopularAuthors,
  getPopularPlaylists,
  getPopularSongs,
  getRecommendPlaylistsAuthors,
  getRecommendPlaylistsGenres,
  getRecommendSongsAuthors,
  getRecommendSongsGenres,
  getRecommendSongsRandom,
  searchDataByValue,
} from '@/services/recommendations'
import type { IAllUserData, ISongGetted } from '@/types'
import type { IPlaylist } from '@/types/playlist'
import { defineStore } from 'pinia'
import { reactive, toRefs, type Reactive } from 'vue'

export const useRecommendationsStore = defineStore('recommendations', () => {
  const playlists: Reactive<{ pGenres: IPlaylist[]; pAuthors: IPlaylist[] }> = reactive({
    pGenres: [],
    pAuthors: [],
  })

  const songs: Reactive<{
    sGenres: ISongGetted[]
    sAuthors: ISongGetted[]
    random: ISongGetted[]
  }> = reactive({
    sGenres: [],
    sAuthors: [],
    random: [],
  })

  const popular: Reactive<{
    popularSongs: ISongGetted[]
    popularPlaylists: IPlaylist[]
    popularAuthors: IAllUserData[]
    searchedSongs: ISongGetted[]
    searchedPlaylists: IPlaylist[]
    searchedAuthors: IAllUserData[]
  }> = reactive({
    popularSongs: [],
    popularPlaylists: [],
    popularAuthors: [],
    searchedSongs: [],
    searchedPlaylists: [],
    searchedAuthors: [],
  })

  const getRecomendations = async () => {
    playlists.pGenres = await getRecommendPlaylistsGenres()
    playlists.pAuthors = await getRecommendPlaylistsAuthors()
    songs.sGenres = await getRecommendSongsGenres()
    songs.sAuthors = await getRecommendSongsAuthors()
    songs.random = await getRecommendSongsRandom()
  }

  const getPopular = async () => {
    if (!popular.popularAuthors.length) {
      popular.popularAuthors = await getPopularAuthors()
    }
    if (!popular.popularPlaylists.length) {
      popular.popularPlaylists = await getPopularPlaylists()
    }
    if (!popular.popularSongs.length) {
      popular.popularSongs = await getPopularSongs()
    }
  }

  const searchValue = async (data: string, selectedValue: string) => {
    const result = await searchDataByValue(data, selectedValue)
    if (selectedValue === 'Songs') {
      popular.searchedSongs = result
    } else if (selectedValue === 'Playlists') {
      popular.searchedPlaylists = result
    } else if (selectedValue === 'Artists') {
      popular.searchedAuthors = result
    }
  }

  return {
    ...toRefs(playlists),
    ...toRefs(songs),
    ...toRefs(popular),
    getRecomendations,
    searchValue,
    getPopular,
  }
})
