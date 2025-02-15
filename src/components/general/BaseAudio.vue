<template>
  <div class="audio">
    <div class="audio-info">
      <img :src="song.image" alt="" />
      <div>
        <h4>{{ song.title }}</h4>
        <h5>{{ song.author }}</h5>
      </div>
    </div>
    <audio
      v-if="song.song"
      controls
      controlslist="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
    >
      <source :src="song.song" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <button @click="$emit('exit')"><img src="@/assets/images/icons/exitWhite.svg" alt="" /></button>
  </div>
</template>

<script setup lang="ts">
import type { ISongItem } from '@/types'
import { inject } from 'vue'

const { song } = inject<{ song: ISongItem }>('song', {
  song: { song: '', title: '', author: '', image: '' },
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.base-audio;
</style>
