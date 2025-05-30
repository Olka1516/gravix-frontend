<template>
  <BaseLoading v-if="loading" />
  <div v-else class="container">
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
        <div v-show="open" class="settings">
          <button class="settings-btn" @click="changeVisibility">Change info</button>
          <button class="settings-btn" @click="deletePlaylistModal">Delete</button>
        </div>
      </div>
      <div class="playlist-songs">
        <BaseSong
          ref="songRefs"
          v-for="(song, index) in songs"
          :index="index"
          :playedIndex
          :key="song._id"
          :song
          :isCurrentUser
          @changeSong="(i) => (playedIndex = i)"
          @deleteSong="(id) => deleteSongFromPlaylist(id)"
        ></BaseSong>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <CreatePlaylist
          v-if="isModalOpen"
          @close="(name?: string) => closeModal(name)"
          :isUpdate="true"
          :playlist
        />
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
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import BaseColoredCircle from '../general/BaseColoredCircle.vue'
import BaseSong from '../songs/BaseSong.vue'
import { useRoute, useRouter } from 'vue-router'
import { playlistStore } from '@/stores/playlist'
import type { IPlaylist } from '@/types/playlist'
import type { ISongGetted } from '@/types'
import CreatePlaylist from './CreatePlaylist.vue'
import DeleteModal from '../general/BaseDeleteModal.vue'
import BaseLoading from '../general/BaseLoading.vue'
import { notificationStore } from '@/stores/notificationStore'

const storeNotification = notificationStore()
const loading = ref(true)
const router = useRouter()
const open = ref(false)
const isModalOpen = ref(false)
const isDeleteModelopen = ref(false)
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
const playedIndex = ref(-1)
const songRefs = ref<InstanceType<typeof BaseSong>[]>([])

const { isCanBeChanged, isSongPlay } = inject<{
  isCanBeChanged: Ref<boolean>
  isSongPlay: Ref<boolean>
}>('songPlayDetails', { isCanBeChanged: ref(false), isSongPlay: ref(false) })

const playlistActions = [
  {
    icon: () => (isCurrentUser.value ? 'dots' : 'plus'),
    action: async () => {
      if (isCurrentUser.value) {
        open.value = !open.value
      } else {
        await store.createUserCopyPlaylist(playlist.value._id)
        storeNotification.sendSuccess('Playlist added successfully')
      }
    },
  },
  {
    icon: () => (isSongPlay.value && playedIndex.value >= 0 ? 'pauseWhite' : 'play'),
    action: (event: Event) => {
      songRefs.value[playedIndex.value === -1 ? 0 : playedIndex.value]?.chooseSong(event)
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

const isCurrentUser = computed(() => {
  return userId.value === playlist.value.ownerID
})

const deleteSongFromPlaylist = async (id: string) => {
  await store.deleteSongFromPlaylist(id, playlist.value._id)
  songs.value = songs.value.filter((item) => {
    return item._id !== id
  })
}

const changeVisibility = (event: Event) => {
  event.stopPropagation()
  isModalOpen.value = true
  open.value = false
  document.body.style.overflow = 'hidden'
}

const closeDeleteModal = () => {
  isDeleteModelopen.value = false
  document.body.style.overflow = ''
}

const deletePlaylistModal = (event: Event) => {
  event.stopPropagation()
  isDeleteModelopen.value = true
  open.value = false
  document.body.style.overflow = 'hidden'
}

const closeModal = (name?: string) => {
  if (name) playlist.value.name = name
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const deletePlaylist = async () => {
  isDeleteModelopen.value = false
  document.body.style.overflow = ''
  await store.deletePlaylist(playlist.value._id)
  router.push('/songs')
}

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
  loading.value = false
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist-page;
</style>
