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
      <SongsBlock :songs="songs" :playlists="playlists" :isCurrentUser />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/profile/ContentBlock.vue'
import SongsBlock from '@/components/profile/SongsBlock.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { onMounted, ref, watch, type Ref } from 'vue'
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

  if (username === routeUsername && !store.username) {
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

onMounted(async () => {
  await getUserInfo()
})
</script>
