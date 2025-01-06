<template>
  <div class="container">
    <h2>What’s Trending</h2>
    <div class="triangle-demo"></div>
    <div class="trend-cards">
      <div
        v-for="trend in trends"
        v-bind:key="trend.id"
        class="trend-card"
        :id="`trend-card-${trend.id}`"
      >
        <img :src="trend.image" alt="" />
        <div class="trend-card-text">
          <p>
            {{ trend.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { trends } from '@/constants'
import { onMounted } from 'vue'

onMounted(() => {
  const rowHeight = 300
  const totalColumns = 3

  for (let i = 0; i < trends.length; i++) {
    const temp = document.getElementById(`trend-card-${i + 1}`)
    if (temp) {
      const column = i % totalColumns
      const row = Math.floor(i / totalColumns)

      temp.style.top = `${row * rowHeight}px`

      if (column === 1 || i === trends.length - 1) {
        temp.style.left = '50%'
        temp.style.transform = 'translateX(-50%)'
        temp.style.top = `${row * 0.85 * rowHeight}px`
        if (column === 1) {
          temp.style.height = '200px'
        }
      } else if (column === 0) {
        temp.style.left = '0'
      } else if (column === 2) {
        temp.style.right = '0'
      }
    }
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.trend;
</style>
