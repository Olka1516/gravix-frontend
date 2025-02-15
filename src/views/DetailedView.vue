<template>
  <div class="container">
    <div class="detailed">
      <button class="detailed-exit" @click="$router.push('/songs')">
        <img src="../assets/images/icons/exitWhite.svg" alt="Exit" />
      </button>
      <div class="detailed-content">
        <img class="detailed-album" :src="song.image" alt="Album cover" />
        <div class="detailed-content-inner">
          <div>
            <h3>{{ song.author }}</h3>
            <h4>{{ song.username }}</h4>
            <i>{{ song.description }}</i>
            <p>{{ song.duration }} {{ song.releaseYear }}</p>
          </div>
          <div class="detailed-info">
            <div class="detailed-rating">
              <strong>{{ song.ratingCount }}</strong>
              <button class="border-button">
                <img src="../assets/images/icons/like.svg" alt="Like" />
              </button>
            </div>
            <div class="detailed-genres">
              <span v-for="genre in song.genres" :key="genre">{{ genre }}</span>
            </div>
          </div>
        </div>
      </div>
      <button class="border-button" @click="isSongPlay = true">
        <img src="../assets/images/icons/play.svg" alt="Play" />
      </button>
    </div>
    <div>
      <h5>Lyrics:</h5>
      <p>{{ song.lyrics }}</p>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <BaseAudio v-show="isSongPlay" @exit="isSongPlay = false" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseAudio from '@/components/general/BaseAudio.vue'
import { songStore } from '@/stores'
import type { ISongGetted } from '@/types'
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

const isSongPlay = ref(false)
const storeSongs = songStore()
const route = useRoute()

const song = ref<ISongGetted>({
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
})

provide('song', { song })

onMounted(async () => {
  song.value = await storeSongs.getSong(route.params.id.toString())
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.detailed-view;
</style>
