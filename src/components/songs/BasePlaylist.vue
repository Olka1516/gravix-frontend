<template>
  <div class="playlist-card" @click="changeRoute">
    <img :src="getPlaylistImage" alt="" />
    <div class="playlist-card-text">
      <p>
        {{ playlist.name }}
      </p>
      <button class="playlist-play circle-button" @click="changeRoute">
        <img src="@/assets/images/icons/play.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPlaylist } from '@/types/playlist'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ playlist: IPlaylist }>()

const getPlaylistImage = computed(() => {
  if (props.playlist.song[0]) return props.playlist.song[0].image
  const st = new URL(`../../assets/images/album_1.jpg`, import.meta.url)
  return st.href
})

const changeRoute = () => {
  router.push(`/playlist/${props.playlist._id}`)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist;
</style>
