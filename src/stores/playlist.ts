import {
  createUserSong,
  dislikeSongById,
  getSongById,
  getSongsByUsername,
  likeSongById,
} from '@/services'
import { getMyPlayList } from '@/services/playlist'
import type { ISong, ISongGetted } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const playlistStore = defineStore(
  'playlistInfo',
  () => {
    const state: Ref<ISongGetted[]> = ref([])

    const playlists = new Map<string, ISongGetted[]>()
    const selectedPlaylist = new Map<string, ISongGetted>()

    const createPlaylist = async (playlistData: ISong) => {
      // await createUserSong(songData)
      // state.value = await getSongsByUsername(songData.username)
    }

    const getPlaylists = async () => {
      if (state.value.length) return
      state.value = await getMyPlayList()
    }

    const getAnotherUserPlaylists = async (username: string) => {
      if (!playlists.has(username)) {
        playlists.set(username, await getSongsByUsername(username))
      }
      return playlists.get(username) ?? []
    }

    const setPlaylist = (data: ISongGetted) => {
      selectedPlaylist.set(data._id, data)
    }

    const getPlaylist = async (id: string) => {
      if (selectedPlaylist.has(id)) return selectedPlaylist.get(id)

      const data = await getSongById(id)
      setPlaylist(data)
      return data
    }

    const likeSong = async (id: string) => {
      const data = await getPlaylist(id)
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')

      if (!data.likes.includes(userInfo.id)) await likeSongById(id)
      else await dislikeSongById(id)

      const updatedSong = await getSongById(id)
      setPlaylist(updatedSong)
    }

    return {
      state,
      createPlaylist,
      getPlaylists,
      getAnotherUserPlaylists,
      setPlaylist,
      getPlaylist,
      likeSong,
    }
  },
  {
    persist: true,
  },
)
