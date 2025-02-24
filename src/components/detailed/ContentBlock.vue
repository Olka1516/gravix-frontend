<template>
  <div class="container">
    <div class="detailed">
      <div class="detailed-content">
        <img class="detailed-album" :src="song.image" alt="Album cover" />
        <div class="detailed-content-inner">
          <div>
            <h3>{{ song.author }}</h3>
            <h4>{{ song.username }}</h4>
            <i>{{ song.description }}</i>
            <p>{{ song.duration }}&emsp;&emsp;{{ song.releaseYear }}</p>
          </div>
          <div class="detailed-info">
            <div class="detailed-rating">
              <strong>{{ song.ratingCount }}</strong>
              <button class="border-button">
                <img src="@/assets/images/icons/like.svg" alt="Like" />
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
    id: '',
  },
})

const song = ref(detailedSong)

const chooseSong = () => {
  if (song.value) songInject?.updateSong(song.value)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.detailed-view;
</style>
