<template>
  <div class="card">
    <img class="card-img" :src="song.image" alt="Song image" />
    <div>
      <h3>{{ song.song }}</h3>
      <p>{{ song.singer }}</p>
    </div>
    <button class="circle-button card-play">
      <img src="../../assets/images/icons/play.svg" alt="" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ song: { song: string; image: string; singer: string } }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.song-card;
</style>
