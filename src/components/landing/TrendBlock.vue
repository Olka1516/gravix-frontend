<template>
  <div class="container" ref="container">
    <h2>What’s Trending</h2>
    <div class="triangle-demo"></div>
    <div class="trend-cards">
      <div
        v-for="trend in trends"
        :key="trend.id"
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
import { onMounted, useTemplateRef } from 'vue'

const container = useTemplateRef('container')

onMounted(() => {
  const rowHeight = 300

  const calculateLayout = () => {
    if (!container) return

    const containerWidth = container.value?.offsetWidth || 0
    if (containerWidth <= 767) return
    const cardMinWidth = 250
    const gap = 16

    const totalColumns = Math.floor(containerWidth / (cardMinWidth + gap))
    if (totalColumns < 1) return

    for (let i = 0; i < trends.length; i++) {
      const temp = document.getElementById(`trend-card-${i + 1}`)
      if (temp) {
        const column = i % totalColumns
        const row = Math.floor(i / totalColumns)

        const leftPercent = (100 / totalColumns) * column
        temp.style.position = 'absolute'
        temp.style.top = `${row * rowHeight}px`
        temp.style.left = `${leftPercent}%`
        temp.style.width = `calc(${100 / totalColumns}% - ${gap}px)`
        temp.style.transform = 'none'
        temp.style.zIndex = '1'

        if (totalColumns === 3 && column === 1) {
          temp.style.top = `${row * 0.85 * rowHeight}px`
          temp.style.zIndex = '2'
          temp.style.height = '200px'
        } else {
          temp.style.height = '300px'
        }

        temp.style.right = ''
      }
    }
  }

  window.addEventListener('resize', calculateLayout)
  calculateLayout()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.trend;
</style>
