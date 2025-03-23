<template>
  <div class="card" @click="detailedSong?.setDitailedSong(song)">
    <img class="card-img" :src="song.image" alt="Song image" />

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
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted, ISongItem } from '@/types'
import { inject, computed, type Ref } from 'vue'

const props = defineProps<{ song: ISongGetted }>()

const detailedSong = inject<{ setDitailedSong: (item: ISongGetted) => void }>('detailedSong')
const songInject = inject<{ isSongPlay: Ref<boolean>; updateSong: (item: ISongItem) => void }>(
  'songPlayDetails',
)

const songData = computed(() => ({
  song: props.song.song,
  title: props.song.title,
  author: props.song.author,
  image: props.song.image,
}))

const chooseSong = (event: Event) => {
  event.stopPropagation()
  songInject?.updateSong(songData.value)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.song-card;
</style>
