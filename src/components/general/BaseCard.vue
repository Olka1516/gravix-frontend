<template>
  <div
    class="card-container"
    :style="{
      '--height': rhythm.id & 1 ? '80%' : '50%',
    }"
  >
    <div class="card">
      <div class="card-id">
        <h4>
          {{ rhythm.id }}
        </h4>
        <hr />
      </div>
      <p>
        {{ rhythm.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ rhythm: { id: number; text: string } }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.card;
</style>
