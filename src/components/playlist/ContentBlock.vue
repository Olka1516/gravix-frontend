<template>
  <div class="container">
    <BaseColoredCircle size="160px" top="40%" right="80%" />
    <BaseColoredCircle size="180px" top="30%" right="10%" />
    <div class="playlist">
      <div class="playlist-content">
        <img class="playlist-img" src="../../assets/images/album_1.jpg" alt="" />
        <h3>Playlist Name</h3>
        <div class="playlist-btns">
          <button
            v-for="item in playlistActions"
            :key="item.icon"
            @click="item.action"
            class="circle-button"
          >
            <img :src="getImage(item.icon)" alt="" />
          </button>
        </div>
      </div>
      <div class="playlist-songs">
        <BaseSong
          ref="songRefs"
          v-for="(song, index) in store.state"
          :index="index"
          :key="song.id"
          :song
          @changeSong="(i) => (playedIndex = i)"
        ></BaseSong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import BaseColoredCircle from '../general/BaseColoredCircle.vue'
import BaseSong from '../songs/BaseSong.vue'
import { songStore } from '@/stores'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = songStore()
const playedIndex = ref(0)
const songRefs = ref<InstanceType<typeof BaseSong>[]>([])

const { isCanBeChanged } = inject<{
  isCanBeChanged: Ref<boolean>
}>('songPlayDetails', { isCanBeChanged: ref(false) })

const playlistActions = [
  {
    icon: 'plus',
  },
  {
    icon: 'play',
    action: () => {
      songRefs.value[playedIndex.value]?.chooseSong()
    },
  },
  {
    icon: 'like',
  },
]

const getImage = (icon: string) => {
  const st = new URL(`../../assets/images/icons/${icon}.svg`, import.meta.url)
  return st.href
}

watch(
  () => isCanBeChanged.value,
  () => {
    if (isCanBeChanged.value && route.path.includes('playlist')) {
      playedIndex.value++
      songRefs.value[playedIndex.value]?.chooseSong()
      isCanBeChanged.value = false
    }
  },
)

onMounted(async () => {
  const username = localStorage.getItem('username') || ''
  await store.getSongs(username)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist-page;
</style>
