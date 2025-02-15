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

    <div class="songs" v-if="hasContent">
      <BaseSongCard v-for="song in songs" :key="song.id" v-bind:song="song" />
    </div>

    <div class="empty" v-else>
      <h2>There are no {{ emptyMessage }} here</h2>
    </div>

    <button class="border-button" @click="changeRoute">Add</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseSongCard from '../general/BaseSongCard.vue'
import type { ISongGetted } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ songs: ISongGetted[] }>()

const navs = ['Songs', 'Playlists']
const activeNav = ref(navs[0])

const changeActiveNav = (index: number) => {
  activeNav.value = navs[index]
}

const hasContent = computed(() => {
  if (activeNav.value === 'Songs') return props.songs.length > 0
  return false
})

const emptyMessage = computed(() => {
  return activeNav.value.toLowerCase()
})

const changeRoute = () => {
  if (activeNav.value === 'Songs') router.push('/modify')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-songs;
</style>
