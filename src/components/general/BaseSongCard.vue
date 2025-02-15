<template>
  <div class="card" @click="detailedSong.setDitailedSong(song)">
    <img class="card-img" :src="song.image" alt="Song image" />

    <div class="card-content">
      <h3>{{ song.title }}</h3>
      <p>{{ song.author }}</p>
    </div>

    <button class="circle-button card-play" @click="chooseSong($event)">
      <img src="../../assets/images/icons/play.svg" alt="Play" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted, ISongItem } from '@/types'
import { inject, computed } from 'vue'

const props = defineProps<{ song: ISongGetted }>()

const detailedSong = inject<{ setDitailedSong: (item: ISongGetted) => void }>('detailedSong')
const songPlayInject = inject<{ updateSongPlay: () => void }>('isSongPlay')
const songInject = inject<{ updateSong: (item: ISongItem) => void }>('song')

const songData = computed(() => ({
  song: props.song.song,
  title: props.song.title,
  author: props.song.author,
  image: props.song.image,
}))

const chooseSong = (event: Event) => {
  event.stopPropagation()
  songInject?.updateSong(songData.value)
  songPlayInject?.updateSongPlay()
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.song-card;
</style>
