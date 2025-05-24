import {
  addSongToPlaylistByIds,
  createCopyPlaylist,
  createUserPlaylist,
  deletePlaylistById,
  deleteSongFromPlaylistById,
  dislikePlaylistById,
  getMyPlayList,
  getMyPlayListById,
  getPlayListById,
  getPlayListByUsername,
  likePlaylistById,
  updateUserPlaylist,
} from '@/services/playlist'
import type { IPlaylist, IPlaylistCreate } from '@/types/playlist'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const playlistStore = defineStore('playlistInfo', () => {
  const state: Ref<IPlaylist[]> = ref([])

  const playlists = new Map<string, IPlaylist[]>()
  const selectedPlaylist = new Map<string, IPlaylist>()

  const setDefault = () => {
    state.value = []
  }

  const createPlaylist = async (playlistData: IPlaylistCreate) => {
    const data = await createUserPlaylist(playlistData)
    state.value.push(data)
    return data
  }

  const createUserCopyPlaylist = async (id: string) => {
    const data = await createCopyPlaylist(id)
    state.value.push(data)
  }

  const updatePlaylist = async (playlistData: IPlaylistCreate, id: string) => {
    await updateUserPlaylist(playlistData, id)
    await getPlaylists()
  }

  const getPlaylists = async () => {
    state.value = await getMyPlayList()
    state.value.forEach((item) => {
      selectedPlaylist.set(item._id, item)
    })
  }

  const deletePlaylist = async (id: string) => {
    await deletePlaylistById(id)
    state.value = state.value.filter((playlist) => playlist._id !== id)
  }

  const deleteSongFromPlaylist = async (songId: string, playlistId: string) => {
    await deleteSongFromPlaylistById(songId, playlistId)
  }

  const getAnotherUserPlaylists = async (username: string): Promise<IPlaylist[]> => {
    if (!playlists.has(username)) {
      try {
        const data = await getPlayListByUsername(username)
        playlists.set(username, data)
      } catch {
        playlists.set(username, [])
      }
    }
    return playlists.get(username) ?? []
  }

  const setPlaylist = (data: IPlaylist) => {
    selectedPlaylist.set(data._id, data)
  }

  const addSongToPlaylist = async (songId: string, playlistId: string) => {
    await addSongToPlaylistByIds(songId, playlistId)
    await getPlaylists()
  }

  const getPlaylist = async (playlistId: string) => {
    if (selectedPlaylist.has(playlistId)) return selectedPlaylist.get(playlistId)

    let data
    try {
      data = await getPlayListById(playlistId)
    } catch {
      if (!data) {
        data = await getMyPlayListById(playlistId)
      }
    }
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
    setDefault,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    createUserCopyPlaylist,
    deleteSongFromPlaylist,
  }
})
