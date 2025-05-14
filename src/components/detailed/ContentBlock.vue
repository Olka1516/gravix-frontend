<template>
  <div class="container">
    <div class="detailed">
      <div class="detailed-container">
        <div class="detailed-content">
          <img class="detailed-album" :src="song.image" alt="Album cover" />
          <div class="detailed-content-inner">
            <div>
              <h3 @click="changeRoute">{{ song.author }}</h3>
              <i>{{ song.description }}</i>
              <p>{{ song.duration }}&emsp;&emsp;{{ song.releaseYear }}</p>
            </div>
            <div class="detailed-info">
              <div class="detailed-rating">
                <strong>{{ song.likes.length }}</strong>
                <button class="border-button" @click="$emit('likeSong', song._id)">
                  <img
                    v-if="isUserLikeSong()"
                    src="@/assets/images/icons/fullLike.svg"
                    alt="Like"
                  />
                  <img v-else src="@/assets/images/icons/like.svg" alt="Like" />
                </button>
              </div>
              <div class="detailed-genres">
                <span v-for="genre in song.genres" :key="genre">{{ genre }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detailed-end">
          <div>
            <button v-if="isUser" @click="modalDeleteSong">
              <img src="@/assets/images/icons/trash.png" alt="" />
            </button>
          </div>
          <button class="border-button" @click="chooseSong">
            <img src="@/assets/images/icons/play.svg" alt="Play" />
          </button>
        </div>
      </div>
    </div>
    <div>
      <h5>Lyrics:</h5>
      <p>{{ song.lyrics }}</p>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <DeleteModal
          v-if="isDeleteModelopen"
          @close="closeDeleteModal"
          @delete="deleteSong"
          text="Song"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { songStore } from '@/stores'
import type { ISongGetted } from '@/types'
import { computed, inject, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import DeleteModal from '../general/BaseDeleteModal.vue'

const store = songStore()
const router = useRouter()
const songInject = inject<{ song: ISongGetted; updateSong: (item: ISongGetted) => void }>(
  'songPlayDetails',
)
const { detailedSong } = inject<{ detailedSong: Ref<ISongGetted> }>('detailedSong', {
  detailedSong: ref({
    title: '',
    description: '',
    lyrics: '',
    image: '',
    song: '',
    genres: [],
    author: '',
    duration: '',
    releaseYear: '',
    rating: 0,
    ratingCount: 0,
    _id: '',
    likes: [],
  }),
})

const song = ref(detailedSong)
const isDeleteModelopen = ref(false)

const isUserLikeSong = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
  return song.value.likes.includes(userInfo.id)
}

const chooseSong = () => {
  if (song.value) songInject?.updateSong(song.value)
}

const modalDeleteSong = () => {
  isDeleteModelopen.value = true
  document.body.style.overflow = 'hidden'
}

const closeDeleteModal = () => {
  isDeleteModelopen.value = false
  document.body.style.overflow = ''
}

const deleteSong = async () => {
  document.body.style.overflow = ''
  await store.deleteSong(detailedSong.value._id)
  await router.push('/songs')
}

const changeRoute = async () => {
  await router.push(`/profile/${detailedSong.value.author}`)
}

const isUser = computed(() => {
  const username = localStorage.getItem('username')
  return song.value.author === username
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.detailed-view;
</style>
