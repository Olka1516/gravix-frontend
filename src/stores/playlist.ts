import {
  createUserPlaylist,
  dislikePlaylistById,
  getMyPlayList,
  getPlayListById,
  getPlayListByUsername,
  likePlaylistById,
} from '@/services/playlist'
import type { IPlaylist, IPlaylistCreate } from '@/types/playlist'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const playlistStore = defineStore(
  'playlistInfo',
  () => {
    const state: Ref<IPlaylist[]> = ref([])

    const playlists = new Map<string, IPlaylist[]>()
    const selectedPlaylist = new Map<string, IPlaylist>()

    const createPlaylist = async (playlistData: IPlaylistCreate) => {
      const data = await createUserPlaylist(playlistData)
      state.value.push(data)
    }

    const getPlaylists = async () => {
      if (state.value.length) return
      state.value = await getMyPlayList()
    }

    const getAnotherUserPlaylists = async (username: string) => {
      if (!playlists.has(username)) {
        playlists.set(username, await getPlayListByUsername(username))
      }
      return playlists.get(username) ?? []
    }

    const setPlaylist = (data: IPlaylist) => {
      selectedPlaylist.set(data._id, data)
    }

    const getPlaylist = async (playlistId: string) => {
      if (selectedPlaylist.has(playlistId)) return selectedPlaylist.get(playlistId)

      const data = await getPlayListById(playlistId)
      setPlaylist(data)
      return data
    }

    const likePlaylist = async (id: string) => {
      const data = await getPlaylist(id)
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')

      let updatedSong
      if (!data.likes.includes(userInfo.id)) updatedSong = await likePlaylistById(id)
      else updatedSong = await dislikePlaylistById(id)

      setPlaylist(updatedSong)
    }

    return {
      state,
      createPlaylist,
      getPlaylists,
      getAnotherUserPlaylists,
      setPlaylist,
      getPlaylist,
      likePlaylist,
    }
  },
  {
    persist: true,
  },
)
