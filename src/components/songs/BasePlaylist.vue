<template>
  <div class="playlist-card">
    <img :src="playlist.image" alt="" />
    <div class="playlist-card-text">
      <p>
        {{ playlist.text }}
      </p>
      <button class="playlist-play circle-button">
        <img src="@/assets/images/icons/play.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ playlist: { id: number; image: string; text: string } }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist;
</style>
