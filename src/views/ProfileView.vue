<template>
  <div>
    <BaseHeader />
    <ContentBlock :username="data.username" :avatar="data.avatar" :email="data.email" />
    <SongsBlock :songs="songs" />
    <BaseFooter />
    <Teleport to="body">
      <Transition name="modal">
        <BaseAudio
          v-show="isSongPlay"
          :song="song.song"
          :title="song.title"
          :author="song.author"
          :image="song.image"
          @exit="isSongPlay = false"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/profile/ContentBlock.vue'
import SongsBlock from '@/components/profile/SongsBlock.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { onMounted, provide, reactive, ref, type Ref } from 'vue'
import { songStore, userStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { ISong, ISongItem, IUser } from '@/types'
import BaseAudio from '@/components/general/BaseAudio.vue'

const data = reactive<IUser>({
  username: '',
  email: '',
  avatar: null,
  id: '',
})

const song = reactive({
  song: '',
  title: '',
  author: '',
  image: '',
})

const songs: Ref<ISong[]> = ref([])
const isSongPlay = ref(false)

const route = useRoute()
const store = userStore()
const storeSongs = songStore()

const updateSong = (item: ISongItem) => {
  song.song = item.song
  song.title = item.title
  song.author = item.author
  song.image = item.image
}

const updateSongPlay = () => {
  isSongPlay.value = true
}

provide('song', { song, updateSong })
provide('isSongPlay', { isSongPlay, updateSongPlay })

const updateData = (user: IUser, userSongs: ISong[]) => {
  data.avatar = user.avatar
  data.username = user.username
  data.email = user.email
  data.id = user.id

  songs.value = userSongs
}

onMounted(async () => {
  const username = localStorage.getItem('username') || ''
  const routeUsername = route.params.username.toString()
  if (!store.username) {
    await store.getUserInfo(routeUsername)
    await storeSongs.getSongs(username)
    updateData(store, storeSongs.state)
  } else if (username === routeUsername) {
    updateData(store, storeSongs.state)
  } else {
    const tempData = await store.getAnotherUserInfo(routeUsername)
    const tempDataSongs = await storeSongs.getAnotherUserSongs(routeUsername)
    updateData(tempData, tempDataSongs)
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-view;
</style>
