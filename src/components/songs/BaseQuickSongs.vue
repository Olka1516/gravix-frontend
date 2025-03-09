<template>
  <div class="form">
    <BaseSong v-for="song in songs" :key="song.id" :song> </BaseSong>
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
