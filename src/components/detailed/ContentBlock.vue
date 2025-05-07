<template>
  <div class="container">
    <div class="detailed">
      <div class="detailed-content">
        <img class="detailed-album" :src="song.image" alt="Album cover" />
        <div class="detailed-content-inner">
          <div>
            <h3>{{ song.author }}</h3>
            <i>{{ song.description }}</i>
            <p>{{ song.duration }}&emsp;&emsp;{{ song.releaseYear }}</p>
          </div>
          <div class="detailed-info">
            <div class="detailed-rating">
              <strong>{{ song.likes.length }}</strong>
              <button class="border-button" @click="$emit('likeSong', song._id)">
                <img v-if="isUserLikeSong()" src="@/assets/images/icons/fullLike.svg" alt="Like" />
                <img v-else src="@/assets/images/icons/like.svg" alt="Like" />
              </button>
            </div>
            <div class="detailed-genres">
              <span v-for="genre in song.genres" :key="genre">{{ genre }}</span>
            </div>
          </div>
        </div>
      </div>
      <button class="border-button" @click="chooseSong">
        <img src="@/assets/images/icons/play.svg" alt="Play" />
      </button>
    </div>
    <div>
      <h5>Lyrics:</h5>
      <p>{{ song.lyrics }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted } from '@/types'
import { inject, ref } from 'vue'

const songInject = inject<{ song: ISongGetted; updateSong: (item: ISongGetted) => void }>(
  'songPlayDetails',
)
const { detailedSong } = inject<{ detailedSong: ISongGetted }>('detailedSong', {
  detailedSong: {
    username: '',
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
  },
})

const song = ref(detailedSong)

const isUserLikeSong = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
  return song.value.likes.includes(userInfo.id)
}

const chooseSong = () => {
  if (song.value) songInject?.updateSong(song.value)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.detailed-view;
</style>
