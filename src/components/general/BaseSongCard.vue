<template>
  <div class="card">
    <img class="card-img" :src="image" alt="Song image" />
    <div>
      <h3>{{ title }}</h3>
      <p>{{ author }}</p>
    </div>
    <button class="circle-button card-play" @click="chooseSong">
      <img src="../../assets/images/icons/play.svg" alt="" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ISongItem } from '@/types'
import { inject } from 'vue'

const props = defineProps<{ title: string; image: string; author: string; song: string }>()
const { updateSongPlay } = inject<{ updateSongPlay: () => void }>('isSongPlay', {
  updateSongPlay: () => {},
})

const { updateSong } = inject<{ updateSong: (item: ISongItem) => void }>('song', {
  updateSong: () => {},
})

const chooseSong = () => {
  updateSongPlay()
  updateSong({
    song: props.song,
    title: props.title,
    author: props.author,
    image: props.image,
  })
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.song-card;
</style>
