<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="top">
        <div class="modal-content top-content">
          <h3>Add to playlists</h3>
          <button @click="$emit('close')" class="modal-exit">
            <img src="@/assets/images/icons/exitWhite.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="modal-results">
        <div v-if="!store.state.length">
          <strong class="search-empty">It looks like you haven't created any playlists yet</strong>
        </div>
        <div
          v-else
          v-for="item in store.state"
          :key="item._id"
          class="search-result"
          @click="addToPlaylist(item._id)"
        >
          <div class="result-content">
            <img :src="getPhoto(item)" alt="" />
            <div>
              <h4>{{ item.name }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-content">
        <button class="modal-cancel" @click="$emit('close')">Cancel</button>
        <button class="border-button" @click="$emit('openCreate', $event)">Create Playlist</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPlaylist } from '@/types/playlist'
import { onMounted } from 'vue'
import { playlistStore } from '@/stores/playlist'
import { notificationStore } from '@/stores/notificationStore'
import { NotificationsEnum } from '@/types'

const props = defineProps<{ id: string }>()
const emit = defineEmits<{
  (e: 'close', name?: string): string | void
  (e: 'openCreate', event: Event): void
}>()

const storeNotification = notificationStore()
const store = playlistStore()

const addToPlaylist = async (playlistId: string) => {
  emit('close')
  await store.addSongToPlaylist(props.id, playlistId)
  storeNotification.sendSuccess(NotificationsEnum.songAddedSuccessful)
}

const getPhoto = (item: IPlaylist) => {
  if (item.song.length) return item.song[0].image

  const st = new URL(`../../assets/images/album_1.jpg`, import.meta.url)
  return st.pathname
}

onMounted(async () => {
  await store.getPlaylists()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.all-playlists-modal;
</style>
