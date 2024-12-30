<template>
  <div class="container">
    <BaseColoredCircle size="280px" top="180px" />
    <div class="rhythm">
      <h2>Find Your Rhythm</h2>
      <div class="rhythm-cards">
        <BaseCard v-for="rhythm in rhythms" :key="rhythm.id" :rhythm="rhythm" />
      </div>
    </div>
    <BaseColoredCircle size="200px" top="180px" right="50px" />
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../general/BaseCard.vue'
import BaseColoredCircle from '../general/BaseColoredCircle.vue'
import { rhythms } from '@/constants'
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.rhythm;
</style>
