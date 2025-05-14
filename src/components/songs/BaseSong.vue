<template>
  <div class="base-song">
    <div class="song-content">
      <div class="song-assets">
        <img class="song-image" :src="song.image" alt="" />
        <button class="song-play" @click="chooseSong">
          <img
            v-show="songInject?.isSongPlay.value"
            src="../../assets/images/icons/pauseWhite.svg"
            alt="Pause"
          />
          <img
            v-show="!songInject?.isSongPlay.value"
            src="../../assets/images/icons/playWhite.svg"
            alt="Play"
          />
        </button>
      </div>
      <div>
        <h4>{{ song.title }}</h4>
        <p>{{ song.author }}</p>
      </div>
    </div>
    <div class="song-infos">
      <span class="song-duration">{{ song.duration }}</span>
      <div class="song-btns">
        <button @click="likeSong(song._id)">
          <img v-if="isUserLikeSong" src="@/assets/images/icons/fullLike.svg" alt="Like" />
          <img v-else src="@/assets/images/icons/like.svg" alt="Like" />
        </button>
        <button @click="openPlaylistsModal">
          <img src="@/assets/images/icons/plus.svg" alt="" />
        </button>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <div v-show="isModalOpen || isAllPlaylists">
          <CreatePlaylist v-if="isModalOpen" @close="closeModal" :songId="song._id" />
          <AllPlaylistsModal
            v-if="isAllPlaylists"
            :id="song._id"
            @close="closeModalPlaylists"
            @openCreate="openModal"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted, ISongItem } from '@/types'
import { computed, inject, ref, type Ref } from 'vue'
import CreatePlaylist from '../playlist/CreatePlaylist.vue'
import AllPlaylistsModal from '../general/AllPlaylistsModal.vue'

const props = defineProps<{ song: ISongGetted; index: number }>()
const emit = defineEmits<{
  (e: 'changeSong', id: number): void
}>()

const songLikes = ref(props.song.likes)
const isModalOpen = ref(false)
const isAllPlaylists = ref(false)

const songInject = inject<{
  isSongPlay: Ref<boolean>
  updateSong: (item: ISongItem) => void
  likeSong: (id: string) => void
}>('songPlayDetails')

const songData = computed(() => ({
  song: props.song.song,
  title: props.song.title,
  author: props.song.author,
  image: props.song.image,
}))

const chooseSong = () => {
  emit('changeSong', props.index)
  songInject?.updateSong(songData.value)
}

defineExpose({ chooseSong })

const isUserLikeSong = computed(() => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
  return songLikes.value.includes(userInfo.id)
})

const openPlaylistsModal = (event: Event) => {
  event.stopPropagation()
  isAllPlaylists.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const closeModalPlaylists = () => {
  isAllPlaylists.value = false
  document.body.style.overflow = ''
}

const openModal = (event: Event) => {
  event.stopPropagation()
  isModalOpen.value = true
  isAllPlaylists.value = false
  document.body.style.overflow = 'hidden'
}

const likeSong = (id: string) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
  songInject?.likeSong(id)
  songLikes.value = songLikes.value.includes(userInfo.id)
    ? songLikes.value.filter((userId) => userId !== userInfo.id)
    : [...songLikes.value, userInfo.id]
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.base-song;
</style>
