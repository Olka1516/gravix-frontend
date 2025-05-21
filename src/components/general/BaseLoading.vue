<template>
  <div class="loading-container">
    <DotLottieVue
      class="loading"
      autoplay
      loop
      src="https://lottie.host/f4d5016f-9fcf-4a9a-b7ce-5d75372e72e4/r0h0V35bqZ.lottie"
    />
  </div>
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.loading;
</style>
