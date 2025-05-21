<template>
  <div class="container">
    <div class="songs-head">
      <div class="field">
        <BaseSearch v-model="data.text" type="Search" />
      </div>
      <div class="field">
        <BaseSelector v-model="data.genres" :allSelections="songsGenres" type="Select genres" />
      </div>
    </div>

    <div class="songs-info">
      <h4>Songs Recommended For You</h4>
      <div class="songs-content">
        <BaseSongCard v-for="song in store.sGenres" :key="song._id" :song></BaseSongCard>
      </div>
    </div>

    <div class="songs-info">
      <h4>Playlists Recommended For You</h4>
      <div class="songs-content">
        <BasePlaylist v-for="playlist in store.pGenres" :key="playlist._id" :playlist />
      </div>
    </div>

    <div class="songs-info">
      <h4>A Quick Choice</h4>
      <div class="songs-content">
        <BaseQuickSongs :songs="store.random"></BaseQuickSongs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSearch from '@/components/inputs/BaseSearch.vue'
import BaseSelector from '@/components/inputs/BaseSelector.vue'
import { songsGenres } from '@/constants'
import { onMounted, reactive } from 'vue'
import BaseSongCard from '../general/BaseSongCard.vue'
import BasePlaylist from './BasePlaylist.vue'
import BaseQuickSongs from './BaseQuickSongs.vue'
import { useRecommendationsStore } from '@/stores/recommendations'

const data = reactive({
  text: '',
  genres: [],
})

const store = useRecommendationsStore()

onMounted(async () => {
  await store.getRecomendations()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.songs;
</style>
