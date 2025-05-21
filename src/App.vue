<template>
  <main>
    <RouterView />
    <Teleport to="body">
      <Transition name="modal">
        <BaseAudio v-show="isSongModal" @exit="closeSongModal" :isSongModal />
      </Transition>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import BaseAudio from '@/components/general/BaseAudio.vue'
import { provide, ref } from 'vue'
import type { ISongGetted, ISongItem } from './types'
import { useRouter } from 'vue-router'
import { songStore } from './stores'

const router = useRouter()
const storeSongs = songStore()

const isSongModal = ref(false)
const isSongPlay = ref(false)
const isCanBeChanged = ref(false)
const song = ref<ISongItem>({
  song: '',
  title: '',
  author: '',
  image: '',
})

const detailedSong = ref<ISongGetted>({
  song: '',
  title: '',
  author: '',
  image: '',
  description: '',
  lyrics: '',
  genres: [],
  duration: '',
  releaseYear: '',
  rating: 0,
  ratingCount: 0,
  _id: '',
  likes: [],
})

const closeSongModal = () => {
  isSongModal.value = false
  setTimeout(() => {
    song.value = {
      song: '',
      title: '',
      author: '',
      image: '',
    }
  }, 300)
}

const updateSong = (item: ISongItem | ISongGetted) => {
  if (item.title === song.value.title) {
    isSongPlay.value = !isSongPlay.value
    return
  }
  closeSongModal()
  setTimeout(() => {
    song.value = { ...item }
    isSongModal.value = true
    isSongPlay.value = true
  }, 320)
}

const setDitailedSong = (data: ISongGetted) => {
  storeSongs.setSong(data)
  detailedSong.value = data
  router.push('/detailed/' + data._id)
}

provide('songPlayDetails', { song, isSongModal, isSongPlay, isCanBeChanged, updateSong })
provide('detailedSong', { detailedSong, setDitailedSong })
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.modal-view;
</style>
