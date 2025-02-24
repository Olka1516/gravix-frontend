<template>
  <div>
    <BaseHeader />
    <main>
      <ContentBlock :username="data.username" :avatar="data.avatar" :email="data.email" />
      <SongsBlock :songs="songs" />
    </main>
    <BaseFooter />
    <Teleport to="body">
      <Transition name="modal">
        <BaseAudio v-show="isSongPlay" @exit="closeSongModal" :isSongPlay />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/profile/ContentBlock.vue'
import SongsBlock from '@/components/profile/SongsBlock.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { onMounted, provide, ref, type Ref } from 'vue'
import { songStore, userStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import type { ISongGetted, ISongItem, IUser } from '@/types'
import BaseAudio from '@/components/general/BaseAudio.vue'

const data = ref<IUser>({
  username: '',
  email: '',
  avatar: null,
  id: '',
})

const song = ref<ISongItem>({
  song: '',
  title: '',
  author: '',
  image: '',
})

const songs: Ref<ISongGetted[]> = ref([])
const isSongPlay = ref(false)

const route = useRoute()
const router = useRouter()
const store = userStore()
const storeSongs = songStore()

const closeSongModal = () => {
  isSongPlay.value = false
  setTimeout(() => {
    song.value = {
      song: '',
      title: '',
      author: '',
      image: '',
    }
  }, 300)
}

const updateSong = (item: ISongItem) => {
  closeSongModal()
  setTimeout(() => {
    song.value = { ...item }
    isSongPlay.value = true
  }, 320)
}

const setDitailedSong = (data: ISongGetted) => {
  storeSongs.setSong(data)
  router.push('/detailed/' + data.id)
}

const updateData = (user: IUser, userSongs: ISongGetted[]) => {
  data.value = { ...user }
  songs.value = userSongs
}

provide('songPlayDetails', { song, isSongPlay, updateSong })
provide('detailedSong', { setDitailedSong })

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

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-view;
</style>
