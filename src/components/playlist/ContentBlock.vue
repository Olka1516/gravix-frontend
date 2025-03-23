<template>
  <div class="container">
    <BaseColoredCircle size="160px" top="40%" right="80%" />
    <BaseColoredCircle size="180px" top="30%" right="10%" />
    <div class="playlist">
      <div class="playlist-content">
        <img class="playlist-img" src="../../assets/images/album_1.jpg" alt="" />
        <h3>Playlist Name</h3>
        <div class="playlist-btns">
          <button v-for="item in playlistActions" :key="item.icon" class="circle-button">
            <img :src="getImage(item.icon)" alt="" />
          </button>
        </div>
      </div>
      <div class="playlist-songs">
        <BaseSong v-for="(song, index) in store.state" :key="song.id" :song></BaseSong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseColoredCircle from '../general/BaseColoredCircle.vue'
import BaseSong from '../songs/BaseSong.vue'
import { songStore } from '@/stores'

const store = songStore()

const playlistActions = [
  {
    icon: 'plus',
  },
  {
    icon: 'play',
  },
  {
    icon: 'like',
  },
]

const getImage = (icon: string) => {
  const st = new URL(`../../assets/images/icons/${icon}.svg`, import.meta.url)
  return st.href
}

onMounted(async () => {
  const username = localStorage.getItem('username') || ''
  await store.getSongs(username)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist-page;
</style>
