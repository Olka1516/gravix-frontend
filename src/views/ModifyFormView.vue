<template>
  <div class="modify">
    <div>
      <div v-for="k in 3" :key="k" class="wave"></div>
    </div>
    <div class="form">
      <BaseDragFile />
      <div class="form-inputs">
        <div class="field">
          <BaseText v-model="data.title" type="Title" v="" />
        </div>
        <div class="field">
          <BaseTextarea v-model="data.description" type="Description" v="" />
        </div>
        <div class="field">
          <BaseTextarea v-model="data.lyrics" type="Lyrics" v="" />
        </div>
        <div class="field">
          <BaseText v-model="data.author" type="Author" v="" />
        </div>
        <div class="field">
          <BaseSelector v-model="data.genres" :allSelections="songsGenres" type="Genres" v="" />
        </div>

        <button class="border-button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseSelector from '@/components/inputs/BaseSelector.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import BaseTextarea from '@/components/inputs/BaseTextarea.vue'
import { songsGenres } from '@/constants'
import { reactive } from 'vue'

const data = reactive({
  title: '',
  description: '',
  lyrics: '',
  image: null,
  genres: [],
  author: '',
  song: null,
  duration: 0,
  releaseYear: 0,
  rating: 0,
  ratingCount: 0,
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.modify;
</style>
