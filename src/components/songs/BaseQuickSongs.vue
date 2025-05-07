<template>
  <div class="form">
    <BaseSong v-for="(song, index) in songs" :index="index" :key="song._id" :song> </BaseSong>
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted } from '@/types'
import BaseSong from './BaseSong.vue'

defineProps<{ songs: ISongGetted[] }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.quick-songs;
</style>
