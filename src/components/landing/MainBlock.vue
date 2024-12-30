<template>
  <div class="container">
    <BaseCircle />
    <div class="main-text">
      <h1 class="gradient-text">Welcome To Songs <br />Site</h1>
      <h1 class="border-text">Welcome To Songs <br />Site</h1>
    </div>

    <img class="main-note" src="@/assets/images/note.png" alt="" />
    <div class="animated-lines line-1" style="background-image: url('public/lines_1.png')"></div>
    <img class="line-2" src="@/assets/images/lines_2.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import BaseCircle from '../general/BaseCircle.vue'
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.main;
</style>
