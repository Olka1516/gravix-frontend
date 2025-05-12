<template>
  <div class="card" @click="detailedSong?.setDitailedSong(song)" @mouseleave="closeSettings">
    <img class="card-img" :src="song.image" alt="Song image" />
    <div class="song-head">
      <button v-if="isCurrentUser" class="song-settings circle-button" @click="openSettings">
        <img src="@/assets/images/icons/dots.svg" alt="" />
      </button>
      <div v-if="open">
        <div class="settings">
          <button class="settings-btn" @click="changeVisibility">Change info</button>
          <button class="settings-btn" @click="deleteSongModal">Delete</button>
        </div>
      </div>
    </div>

    <div class="card-content">
      <h3>{{ song.title }}</h3>
      <p>{{ song.author }}</p>
    </div>

    <button class="circle-button card-play" @click="chooseSong($event)">
      <img
        v-show="songInject?.isSongPlay.value"
        src="../../assets/images/icons/pause.svg"
        alt="Pause"
      />
      <img
        v-show="!songInject?.isSongPlay.value"
        src="../../assets/images/icons/play.svg"
        alt="Play"
      />
    </button>
    <Teleport to="body">
      <Transition name="modal">
        <DeleteModal
          v-if="isDeleteModelopen"
          @close="closeDeleteModal"
          @delete="deleteSong"
          text="Song"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted, ISongItem } from '@/types'
import { inject, computed, type Ref, ref } from 'vue'
import DeleteModal from './BaseDeleteModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ song: ISongGetted; isCurrentUser?: boolean }>()
const emit = defineEmits<{ (e: 'deleteSong', value: string): void }>()

const detailedSong = inject<{ setDitailedSong: (item: ISongGetted) => void }>('detailedSong')
const songInject = inject<{ isSongPlay: Ref<boolean>; updateSong: (item: ISongItem) => void }>(
  'songPlayDetails',
)

const open = ref(false)
const isDeleteModelopen = ref(false)

const songData = computed(() => ({
  song: props.song.song,
  title: props.song.title,
  author: props.song.author,
  image: props.song.image,
}))

const deleteSong = () => {
  emit('deleteSong', props.song._id)
  isDeleteModelopen.value = false
}

const closeSettings = () => {
  open.value = false
}

const closeDeleteModal = () => {
  isDeleteModelopen.value = false
  document.body.style.overflow = ''
}

const chooseSong = (event: Event) => {
  event.stopPropagation()
  songInject?.updateSong(songData.value)
}

const openSettings = (event: Event) => {
  event.stopPropagation()
  open.value = !open.value
}

const changeVisibility = async (event: Event) => {
  event.stopPropagation()
  document.body.style.overflow = ''
  await router.push(`/change-song/${props.song._id}`)
}

const deleteSongModal = (event: Event) => {
  event.stopPropagation()
  isDeleteModelopen.value = true
  document.body.style.overflow = 'hidden'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.song-card;
</style>
