<template>
  <div class="playlist-card" @click="changeRoute" @mouseleave="closeSettings">
    <img :src="getPlaylistImage" alt="" />
    <div class="playlist-head">
      <button v-if="isCurrentUser" class="playlist-settings circle-button" @click="openSettings">
        <img src="@/assets/images/icons/dots.svg" alt="" />
      </button>
      <div v-if="open">
        <div class="settings">
          <button class="settings-btn" @click="changeVisibility">Change info</button>
          <button class="settings-btn" @click="deletePlaylistModal">Delete</button>
        </div>
      </div>
    </div>
    <div class="playlist-card-text">
      <p>
        {{ playlist.name }}
      </p>
      <button class="playlist-play circle-button" @click="changeRoute">
        <img src="@/assets/images/icons/play.svg" alt="" />
      </button>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <CreatePlaylist v-if="isModalOpen" @close="closeModal" :isUpdate="true" :playlist />
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition name="modal">
        <DeleteModal
          v-if="isDeleteModelopen"
          @close="closeDeleteModal"
          @delete="deletePlaylist"
          text="Playlist"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { type IPlaylist } from '@/types/playlist'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CreatePlaylist from '../playlist/CreatePlaylist.vue'
import DeleteModal from '../general/BaseDeleteModal.vue'

const router = useRouter()
const props = defineProps<{ playlist: IPlaylist; isCurrentUser?: boolean }>()
const emit = defineEmits<{ (e: 'deletePlaylist', value: string): void }>()
const open = ref(false)
const isDeleteModelopen = ref(false)
const isModalOpen = ref(false)

const getPlaylistImage = computed(() => {
  if (props.playlist.song[0]) return props.playlist.song[0].image
  const st = new URL(`../../assets/images/album_1.jpg`, import.meta.url)
  return st.href
})

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const closeDeleteModal = () => {
  isDeleteModelopen.value = false
  document.body.style.overflow = ''
}

const changeRoute = async (event: Event) => {
  event.stopPropagation()
  await router.push(`/playlist/${props.playlist._id}`)
}

const openSettings = (event: Event) => {
  event.stopPropagation()
  open.value = !open.value
}

const closeSettings = () => {
  open.value = false
}

const deletePlaylistModal = (event: Event) => {
  event.stopPropagation()
  isDeleteModelopen.value = true
  document.body.style.overflow = 'hidden'
}

const deletePlaylist = () => {
  emit('deletePlaylist', props.playlist._id)
}

const changeVisibility = (event: Event) => {
  event.stopPropagation()
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist;
</style>
