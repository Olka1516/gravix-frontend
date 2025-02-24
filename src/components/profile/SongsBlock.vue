<template>
  <div class="container">
    <div class="navs">
      <button
        v-for="(nav, index) in navs"
        :key="index"
        @click="changeActiveNav(index)"
        :class="{ 'border-button': activeNav === nav }"
      >
        {{ nav }}
      </button>
    </div>

    <div class="songs" v-if="isContent()">
      <BaseSongCard
        v-for="song in songs"
        :key="song.id"
        :title="song.title"
        :author="song.author"
        :image="song.image as string"
        :song="song.song as string"
      />
    </div>

    <div class="empty" v-else>
      <h2>There are no {{ activeNav }} here</h2>
    </div>

    <button class="border-button" @click="changeRoute">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSongCard from '../general/BaseSongCard.vue'
import type { ISong } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ songs: ISong[] }>()

const navs = ['Songs', 'Playlists']
const activeNav = ref('Songs')

const changeActiveNav = (nav: number) => {
  activeNav.value = navs[nav]
}

const changeRoute = () => {
  if (activeNav.value === 'Songs') router.push('/modify')
}

const isContent = () => {
  return (
    (activeNav.value === 'Songs' && props.songs.length) ||
    (activeNav.value === 'Playlists' && false)
  )
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-songs;
</style>
