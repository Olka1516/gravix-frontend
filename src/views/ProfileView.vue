<template>
  <div>
    <BaseHeader />
    <main>
      <ContentBlock :username="data.username" :avatar="data.avatar" :email="data.email" />
      <SongsBlock :songs="songs" />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/profile/ContentBlock.vue'
import SongsBlock from '@/components/profile/SongsBlock.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { onMounted, ref, type Ref } from 'vue'
import { songStore, userStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { ISongGetted, IUser } from '@/types'

const data = ref<IUser>({
  username: '',
  email: '',
  avatar: null,
  id: '',
})

const songs: Ref<ISongGetted[]> = ref([])

const route = useRoute()
const store = userStore()
const storeSongs = songStore()

const updateData = (user: IUser, userSongs: ISongGetted[]) => {
  data.value = { ...user }
  songs.value = userSongs
}

onMounted(async () => {
  const routeUsername = route.params.username.toString()
  const username = localStorage.getItem('username') || ''
  if (username === routeUsername) {
    await store.getUserInfo(username)
    await storeSongs.getSongs(username)
  }
  if (!store.username) {
    const [userInfo, userSongs] = await Promise.all([
      store.getAnotherUserInfo(routeUsername),
      storeSongs.getAnotherUserSongs(routeUsername),
    ])
    updateData(userInfo, userSongs)
  } else {
    updateData(store, storeSongs.state)
  }
})
</script>
