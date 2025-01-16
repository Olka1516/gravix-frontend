<template>
  <div class="container">
    <h2>Power Of Music</h2>
    <div class="cards">
      <div v-for="singer in singers" v-bind:key="singer.id">
        <BaseSingerCard :singer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSingerCard from '../general/BaseSingerCard.vue'
import { singers } from '@/constants'
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.power;
</style>
