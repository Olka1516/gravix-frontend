<template>
  <div>
    <BaseHeader />
    <main>
      <ContentBlock
        :username="data.username"
        :avatar="data.avatar"
        :email="data.email"
        :subscribers="data.subscribers"
        :isCurrentUser
        @updateSubscribers="updateSubscribers"
      />
      <SongsBlock
        :songs="songs"
        :playlists="playlists"
        :isCurrentUser
        @deletePlaylist="(id: string) => deletePlaylist(id)"
        @deleteSong="(id: string) => deleteSong(id)"
      />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/profile/ContentBlock.vue'
import SongsBlock from '@/components/profile/SongsBlock.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { songStore, userStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { IAllUserData, ISongGetted } from '@/types'
import { playlistStore } from '@/stores/playlist'
import type { IPlaylist } from '@/types/playlist'

const data = ref<IAllUserData>({
  username: '',
  email: '',
  avatar: null,
  id: '',
  subscribers: [],
  following: [],
  preferences: [],
})

const isCurrentUser = ref(true)

const songs: Ref<ISongGetted[]> = ref([])
const playlists: Ref<IPlaylist[]> = ref([])

const route = useRoute()
const store = userStore()
const storeSongs = songStore()
const storePlaylist = playlistStore()

const updateData = (user: IAllUserData, userSongs: ISongGetted[], userPlaylists: IPlaylist[]) => {
  data.value = { ...user }
  songs.value = userSongs
  console.log(userPlaylists)
  playlists.value = userPlaylists
}

const deletePlaylist = async (id: string) => {
  await storePlaylist.deletePlaylist(id)
  document.body.style.overflow = ''
}

const deleteSong = async (id: string) => {
  await storeSongs.deleteSong(id)
  document.body.style.overflow = ''
}

const updateSubscribers = async () => {
  const routeUsername = route.params.username.toString()
  await store.updateSubscribers(store.username, routeUsername)
  const [userInfo, userSongs, userPlaylists] = await Promise.all([
    store.getAnotherUserInfo(routeUsername),
    storeSongs.getAnotherUserSongs(routeUsername),
    storePlaylist.getAnotherUserPlaylists(routeUsername),
  ])
  updateData(userInfo, userSongs, userPlaylists)
}

const getUserInfo = async () => {
  const routeUsername = route.params.username.toString()
  const username = localStorage.getItem('username') || ''

  if (username === routeUsername && (!store.username || storeSongs.state || storePlaylist.state)) {
    await store.getUserInfo(username)
    await storeSongs.getSongs(username)
    await storePlaylist.getPlaylists()
    updateData(store.$state, storeSongs.state, storePlaylist.state)
    isCurrentUser.value = true
  } else if (username === routeUsername) {
    updateData(store.$state, storeSongs.state, storePlaylist.state)
    isCurrentUser.value = true
  } else if (username !== routeUsername) {
    const [userInfo, userSongs, userPlaylists] = await Promise.all([
      store.getAnotherUserInfo(routeUsername),
      storeSongs.getAnotherUserSongs(routeUsername),
      storePlaylist.getAnotherUserPlaylists(routeUsername),
    ])
    updateData(userInfo, userSongs, userPlaylists)
    isCurrentUser.value = false
  }
}

watch(
  () => route.params.username.toString(),
  async () => {
    await getUserInfo()
  },
)

watch(
  () => storePlaylist.state,
  async () => {
    playlists.value = storePlaylist.state
  },
)

watch(
  () => storeSongs.state,
  async () => {
    songs.value = storeSongs.state
  },
)

onMounted(async () => {
  await getUserInfo()
})

onUnmounted(() => {
  data.value = {
    username: '',
    email: '',
    avatar: null,
    id: '',
    subscribers: [],
    following: [],
    preferences: [],
  }
  songs.value = []
  playlists.value = []

  store.setDefault()
  storeSongs.setDefault()
  storePlaylist.setDefault()
})
</script>
