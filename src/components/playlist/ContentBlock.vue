<template>
  <div class="container">
    <BaseColoredCircle size="160px" top="40%" right="80%" />
    <BaseColoredCircle size="180px" top="30%" right="10%" />
    <div class="playlist">
      <div class="playlist-content">
        <img class="playlist-img" :src="getPlaylistImage" alt="" />
        <h3>{{ playlist.name }}</h3>
        <div class="playlist-btns">
          <button
            v-for="item in playlistActions"
            :key="item.icon"
            @click="item.action"
            class="circle-button"
          >
            <img :src="getImage(item.icon())" alt="" />
          </button>
        </div>
      </div>
      <div class="playlist-songs">
        <BaseSong
          ref="songRefs"
          v-for="(song, index) in songs"
          :index="index"
          :key="song._id"
          :song
          @changeSong="(i) => (playedIndex = i)"
        ></BaseSong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import BaseColoredCircle from '../general/BaseColoredCircle.vue'
import BaseSong from '../songs/BaseSong.vue'
import { useRoute } from 'vue-router'
import { playlistStore } from '@/stores/playlist'
import type { IPlaylist } from '@/types/playlist'
import type { ISongGetted } from '@/types'

const route = useRoute()
const store = playlistStore()
const playlist: Ref<IPlaylist> = ref({
  _id: '',
  ownerID: '',
  name: '',
  visibility: '',
  song: [],
  likes: [],
})
const userId = ref('')
const songs: Ref<ISongGetted[]> = ref([])
const playedIndex = ref(0)
const songRefs = ref<InstanceType<typeof BaseSong>[]>([])

const { isCanBeChanged } = inject<{
  isCanBeChanged: Ref<boolean>
}>('songPlayDetails', { isCanBeChanged: ref(false) })

const playlistActions = [
  {
    icon: () => 'plus',
  },
  {
    icon: () => 'play',
    action: () => {
      songRefs.value[playedIndex.value]?.chooseSong()
    },
  },
  {
    icon: () =>
      playlist.value.likes && playlist.value.likes.includes(userId.value) ? 'fullLike' : 'like',
    action: async () => {
      await store.likePlaylist(playlist.value._id)
      playlist.value = await store.getPlaylist(playlist.value._id)
    },
  },
]

const getImage = (icon: string) => {
  const st = new URL(`../../assets/images/icons/${icon}.svg`, import.meta.url)
  return st.href
}

const getPlaylistImage = computed(() => {
  if (songs.value[0] && songs.value[0].image) return songs.value[0].image
  const st = new URL(`../../assets/images/album_1.jpg`, import.meta.url)
  return st.href
})

watch(
  () => isCanBeChanged.value,
  () => {
    if (isCanBeChanged.value && route.path.includes('playlist')) {
      playedIndex.value++
      songRefs.value[playedIndex.value]?.chooseSong()
      isCanBeChanged.value = false
    }
  },
)

onMounted(async () => {
  const playlistId = route.params.id.toString()
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
  playlist.value = await store.getPlaylist(playlistId)
  songs.value = playlist.value.song
  userId.value = userInfo.id
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist-page;
</style>
