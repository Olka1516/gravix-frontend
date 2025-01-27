<template>
  <div class="container">
    <div class="navs">
      <button v-for="nav in navs" :key="nav" :class="{ 'border-button': activeNav === nav }">
        {{ nav }}
      </button>
    </div>
    <div class="songs">
      <BaseSongCard v-for="song in songs" :key="song.id" :song="song" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { songs } from '@/constants'
import BaseSongCard from '../general/BaseSongCard.vue'

const navs = ref(['Songs', 'Playlists'])
const activeNav = ref('Songs')
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-songs;
</style>
