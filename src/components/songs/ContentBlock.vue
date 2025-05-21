<template>
  <div class="container">
    <div class="songs-head">
      <div class="field">
        <button class="circle-button" @click="openSearchModal">
          <img src="../../assets/images/icons/search.svg" alt="" />
        </button>
      </div>
    </div>

    <div class="songs-info">
      <h4>Songs Recommended For You</h4>
      <div class="songs-content">
        <BaseSongCard v-for="song in store.sGenres" :key="song._id" :song></BaseSongCard>
      </div>
    </div>

    <div class="songs-info">
      <h4>Songs Recommended For You</h4>
      <div class="songs-content">
        <BaseSongCard v-for="song in store.sAuthors" :key="song._id" :song></BaseSongCard>
      </div>
    </div>

    <div class="songs-info">
      <h4>Playlists Recommended For You</h4>
      <div class="songs-content">
        <BasePlaylist v-for="playlist in store.pGenres" :key="playlist._id" :playlist />
      </div>
    </div>

    <div class="songs-info">
      <h4>Playlists Recommended For You</h4>
      <div class="songs-content">
        <BasePlaylist v-for="playlist in store.pAuthors" :key="playlist._id" :playlist />
      </div>
    </div>

    <div class="songs-info">
      <h4>A Quick Choice</h4>
      <div class="songs-content">
        <BaseQuickSongs :songs="store.random"></BaseQuickSongs>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <SearchModal
        v-if="searchOpen"
        :songs="popular.popularSongs"
        :artists="popular.popularAuthors"
        :playlists="popular.popularPlaylists"
        @searchValue="(data: string, selectedValue: string) => searchValue(data, selectedValue)"
        @close="closeSearchModal"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import BaseSongCard from '../general/BaseSongCard.vue'
import BasePlaylist from './BasePlaylist.vue'
import BaseQuickSongs from './BaseQuickSongs.vue'
import { useRecommendationsStore } from '@/stores/recommendations'
import SearchModal from '../general/BaseSearchModal.vue'
import type { IAllUserData, ISongGetted } from '@/types'
import type { IPlaylist } from '@/types/playlist'

const searchOpen = ref(false)
const store = useRecommendationsStore()
const popular: Ref<{
  popularSongs: ISongGetted[]
  popularPlaylists: IPlaylist[]
  popularAuthors: IAllUserData[]
}> = ref({
  popularSongs: [],
  popularAuthors: [],
  popularPlaylists: [],
})

const openSearchModal = () => {
  searchOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeSearchModal = () => {
  searchOpen.value = false
  document.body.style.overflow = ''
}

const searchValue = async (data: string, selectedValue: string) => {
  await store.searchValue(data, selectedValue)
  popular.value.popularSongs = data ? store.searchedSongs : store.popularSongs
  popular.value.popularPlaylists = data ? store.searchedPlaylists : store.popularPlaylists
  popular.value.popularAuthors = data ? store.searchedAuthors : store.popularAuthors
  console.log(popular.value.popularPlaylists)
}

onMounted(async () => {
  await store.getRecomendations()
  await store.getPopular()
  popular.value.popularSongs = store.popularSongs
  popular.value.popularPlaylists = store.popularPlaylists
  popular.value.popularAuthors = store.popularAuthors
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.songs;
</style>
