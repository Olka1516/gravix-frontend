<template>
  <div class="container">
    <div class="navs">
      <button
        v-for="(nav, index) in navs"
        :key="index"
        @click="changeActiveNav(index)"
        :class="{ 'border-button': activeNav === nav }"
      >
        {{ nav }}
      </button>
    </div>

    <div v-if="hasContent">
      <div class="songs" v-if="activeNav === 'Songs'">
        <BaseSongCard v-for="song in songs" :key="song._id" v-bind:song="song" />
      </div>
      <div class="playlists" v-if="activeNav === 'Playlists'">
        <BasePlaylist v-for="playlist in playlists" :key="playlist._id" :playlist :isCurrentUser />
      </div>
    </div>

    <div class="empty" v-else>
      <h2>There are no {{ emptyMessage }} here</h2>
    </div>

    <button v-show="isCurrentUser" class="border-button" @click="changeRoute">Add</button>
    <Teleport to="body">
      <Transition name="modal">
        <CreatePlaylist v-if="open" @close="closeModal" />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseSongCard from '../general/BaseSongCard.vue'
import type { ISongGetted } from '@/types'
import { useRouter } from 'vue-router'
import type { IPlaylist } from '@/types/playlist'
import BasePlaylist from '../songs/BasePlaylist.vue'
import CreatePlaylist from '../playlist/CreatePlaylist.vue'

const router = useRouter()
const open = ref(false)
const props = defineProps<{
  songs: ISongGetted[]
  isCurrentUser: boolean
  playlists: IPlaylist[]
}>()

const navs = ['Songs', 'Playlists']
const activeNav = ref(navs[0])

const changeActiveNav = (index: number) => {
  activeNav.value = navs[index]
}

const hasContent = computed(() => {
  if (activeNav.value === 'Songs') return props.songs.length > 0
  else if (activeNav.value === 'Playlists') return props.playlists.length > 0
  return false
})

const emptyMessage = computed(() => {
  return activeNav.value.toLowerCase()
})

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const changeRoute = () => {
  if (activeNav.value === 'Songs') router.push('/modify')
  if (activeNav.value === 'Playlists') {
    open.value = true
    document.body.style.overflow = 'hidden'
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-songs;
@include index.playlist-effect;
</style>
