<template>
  <div
    :style="{
      '--top': top,
      '--right': right,
      '--size': size,
    }"
    class="circle"
  ></div>
</template>

<script setup lang="ts">
defineProps<{ size: string; top: string; right?: string }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.colored-circle;
</style>
