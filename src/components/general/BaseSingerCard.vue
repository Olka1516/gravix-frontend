<template>
  <div class="singer-card">
    <img class="singer-img" :src="singer.image" alt="" />
    <p>{{ singer.text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ singer: { id: number; text: string; image: string } }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.singer-card;
</style>
