<template>
  <header class="container header">
    <div class="header-content">
      <img src="@/assets/images/logo.png" alt="" @click="navigateTo('')" />
      <button @click="navigateTo('songs')" class="nav">All songs</button>
    </div>
    <div>
      <div v-if="!username" class="header-content">
        <button @click="navigateTo('sign-in')" class="nav">Sign in</button>
        <button @click="navigateTo('sign-up')" class="border-button nav">Sign up</button>
      </div>
      <div v-else class="header-content">
        <button class="border-button nav" @click="navigateTo(`profile/${username}`)">
          {{ username }}
        </button>
        <button class="nav" @click="logOut">Log out</button>
      </div>

      <button class="nav-menu" @click="changeSidebarStatus">
        <img src="@/assets/images/icons/menu.svg" alt="" />
      </button>
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="isSidebarOpen" class="modal-mask">
            <div class="modal-container">
              <button @click="changeSidebarStatus" class="modal-exit">
                <img src="@/assets/images/icons/exitWhite.svg" alt="" />
              </button>
              <img
                src="@/assets/images/logo.png"
                class="modal-logo"
                alt=""
                @click="navigateTo('')"
              />
              <hr />
              <div class="top-content">
                <button @click="navigateTo('songs')">All songs</button>
                <div v-if="!username" class="modal-content">
                  <button @click="navigateTo('sign-in')">Sign in</button>
                  <button @click="navigateTo('sign-up')">Sign up</button>
                </div>
                <div v-else class="modal-content">
                  <button class="border-button" @click="navigateTo(`profile/${username}`)">
                    {{ username }}
                  </button>
                  <button @click="logOut">Log out</button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </header>
</template>

<script setup lang="ts">
import { logOutUser } from '@/services'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSidebarOpen = ref(false)

const navigateTo = async (route: string) => {
  await router.push(`/${route}`)
  document.body.style.overflow = ''
}

const username = localStorage.getItem('username')
const logOut = async () => {
  document.body.style.overflow = ''
  logOutUser()
  await navigateTo('')
}

const changeSidebarStatus = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  if (isSidebarOpen.value) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.header;
</style>
