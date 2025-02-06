<template>
  <div class="modify">
    <div>
      <div v-for="k in 3" :key="k" class="wave"></div>
    </div>
    <div class="form">
      <BaseDragFile @update="(item) => setImage(item)" />
      <div class="form-inputs">
        <div class="field">
          <BaseText v-model="data.title" type="Title" v="" />
        </div>
        <div class="field">
          <BaseTextarea v-model="data.description" type="Description" v="" />
        </div>
        <div class="field">
          <BaseMusic v-model="data.song" @update="(item) => setMusic(item)" type="Song" v="" />
        </div>
        <div class="field">
          <BaseText v-model="data.author" type="Author" v="" />
        </div>
        <div class="field">
          <BaseSelector v-model="data.genres" :allSelections="songsGenres" type="Genres" v="" />
        </div>
        <div class="field">
          <BaseTextarea v-model="data.lyrics" type="Lyrics" v="" />
        </div>
        <div class="field">
          <BaseTime v-model="data.releaseYear" type="date" name="Release year" v="" />
        </div>

        <button class="border-button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseMusic from '@/components/inputs/BaseMusic.vue'
import BaseSelector from '@/components/inputs/BaseSelector.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import BaseTextarea from '@/components/inputs/BaseTextarea.vue'
import BaseTime from '@/components/inputs/BaseTime.vue'
import { songsGenres } from '@/constants'
import type { ISong } from '@/types'
import { reactive } from 'vue'

const data: ISong = reactive({
  title: '',
  description: '',
  lyrics: '',
  image: null,
  song: null,
  genres: [],
  author: '',
  duration: '',
  releaseYear: '',
  rating: 0,
  ratingCount: 0,
})

const setMusic = (file: File) => {
  data.song = file

  const audio = new Audio()
  audio.src = URL.createObjectURL(file)

  audio.onloadedmetadata = () => {
    const minutes = Math.floor(audio.duration / 60)
    const seconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, '0')
    data.duration = `${minutes}:${seconds}`
  }
}

const setImage = (file: File) => {
  data.image = file
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.modify;
</style>
