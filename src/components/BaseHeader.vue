<template>
  <header class="container header">
    <div class="header-content">
      <img src="@/assets/images/logo.png" alt="" />
      <button>All songs</button>
      <button>Songs for you</button>
    </div>
    <div class="header-content">
      <button @click="navigateTo('sign-in')">Sign in</button>
      <button @click="navigateTo('sign-up')" class="border-button">Sign up</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = async (route: string) => {
  await router.push(`/${route}`)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.header;
</style>
