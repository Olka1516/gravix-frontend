<template>
  <div class="playlist-card">
    <img :src="playlist.image" alt="" />
    <div class="playlist-card-text">
      <p>
        {{ playlist.text }}
      </p>
      <button class="playlist-play circle-button" @click="changeRoute">
        <img src="@/assets/images/icons/play.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps<{ playlist: { id: number; image: string; text: string } }>()

const changeRoute = () => {
  router.push('/playlist')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist;
</style>
