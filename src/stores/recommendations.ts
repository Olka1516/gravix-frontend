import {
  getRecommendPlaylistsAuthors,
  getRecommendPlaylistsGenres,
  getRecommendSongsAuthors,
  getRecommendSongsGenres,
  getRecommendSongsRandom,
} from '@/services/recommendations'
import type { ISongGetted } from '@/types'
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

  const getRecomendations = async () => {
    playlists.pGenres = await getRecommendPlaylistsGenres()
    playlists.pAuthors = await getRecommendPlaylistsAuthors()
    songs.sGenres = await getRecommendSongsGenres()
    songs.sAuthors = await getRecommendSongsAuthors()
    songs.random = await getRecommendSongsRandom()
  }

  return { ...toRefs(playlists), ...toRefs(songs), getRecomendations }
})
