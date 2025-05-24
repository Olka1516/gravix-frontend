<template>
  <div class="form">
    <BaseSong
      v-for="(song, index) in songs"
      :index="index"
      :key="song._id"
      :song
      :playedIndex
      :isCurrentUser="false"
      @changeSong="(index) => (playedIndex = index)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted } from '@/types'
import BaseSong from './BaseSong.vue'
import { ref } from 'vue'

defineProps<{ songs: ISongGetted[] }>()
const playedIndex = ref(-1)
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.quick-songs;
</style>
