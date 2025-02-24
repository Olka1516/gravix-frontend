<template>
  <div class="audio">
    <h1>
      <!-- {{ audioRef?. }} -->
    </h1>
    <div class="audio-info">
      <img :src="song.image" alt="" />
      <div>
        <h4>{{ song.title }}</h4>
        <h5>{{ song.author }}</h5>
      </div>
    </div>
    <audio
      v-if="song.song"
      ref="audioRef"
      @play="changeSongPlay(true)"
      @pause="changeSongPlay(false)"
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
import { inject, ref, useTemplateRef, watch, watchEffect, type Ref } from 'vue'

const audioRef = useTemplateRef('audioRef')

const { song, isSongPlay, isSongModal } = inject<{
  song: ISongItem
  isSongModal: Ref<boolean>
  isSongPlay: Ref<boolean>
}>('songPlayDetails', {
  song: { song: '', title: '', author: '', image: '' },
  isSongPlay: ref(false),
  isSongModal: ref(false),
})

const changeSongPlay = (value: boolean) => {
  isSongPlay.value = value
}

const playAudionChange = (value: boolean) => {
  if (value) audioRef.value?.play()
  else audioRef.value?.pause()
}

watch(isSongPlay, () => {
  playAudionChange(isSongPlay.value)
})

watchEffect(() => {
  playAudionChange(isSongModal.value)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.base-audio;
</style>
