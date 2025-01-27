<template>
  <div class="container">
    <h2>Personalize Your Music Journey</h2>
    <div class="journey-cards">
      <div
        class="journey-card"
        v-for="data in journey"
        :key="data.id"
        :class="{ reverse: data.id % 2 == 0 }"
      >
        <BaseCard :rhythm="{ id: data.id, text: data.text }" :isTransparent="true"></BaseCard>
        <div v-if="data.id & 1">
          <div class="animated-lines line-1" style="background-image: url('/lines_1.png')"></div>
          <img class="line-2" src="@/assets/images/lines_2.png" alt="" />
        </div>
        <div class="circles" v-else>
          <BaseColoredCircle size="240px" top="40%" right="70%" />
          <BaseColoredCircle size="180px" top="50%" right="10%" />
        </div>
        <img class="jorney-img" :src="data.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseColoredCircle from '../general/BaseColoredCircle.vue'
import BaseCard from '../general/BaseCard.vue'
import { journey } from '@/constants'
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.journey;
</style>
