<template>
  <header class="container header">
    <div class="header-content">
      <img src="@/assets/images/logo.png" alt="" @click="navigateTo('')" />
      <button @click="navigateTo('songs')">All songs</button>
    </div>
    <div>
      <div v-if="!username" class="header-content">
        <button @click="navigateTo('sign-in')">Sign in</button>
        <button @click="navigateTo('sign-up')" class="border-button">Sign up</button>
      </div>
      <div v-else class="header-content">
        <button class="border-button" @click="navigateTo(`profile/${username}`)">
          {{ username }}
        </button>
        <button @click="logOut">Log out</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { logOutUser } from '@/services'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = async (route: string) => {
  await router.push(`/${route}`)
}

const username = localStorage.getItem('username')
const logOut = async () => {
  logOutUser()
  await navigateTo('')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.header;
</style>
