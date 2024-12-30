<template>
  <header class="container">
    <div class="header-content">
      <img src="@/assets/images/logo.png" alt="" />
      <button>All songs</button>
      <button>Songs for you</button>
    </div>
    <div class="header-content">
      <button>Sign in</button>
      <button class="border-button">Sign up</button>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.header;
</style>
