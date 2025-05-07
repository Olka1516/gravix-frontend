<template>
  <div class="base-song">
    <div class="song-content">
      <div class="song-assets">
        <img class="song-image" :src="song.image" alt="" />
        <button class="song-play" @click="chooseSong">
          <img
            v-show="songInject?.isSongPlay.value"
            src="../../assets/images/icons/pauseWhite.svg"
            alt="Pause"
          />
          <img
            v-show="!songInject?.isSongPlay.value"
            src="../../assets/images/icons/playWhite.svg"
            alt="Play"
          />
        </button>
      </div>
      <div>
        <h4>{{ song.title }}</h4>
        <p>{{ song.author }}</p>
      </div>
    </div>
    <div class="song-infos">
      <span class="song-duration">{{ song.duration }}</span>
      <div class="song-btns">
        <button>
          <img src="@/assets/images/icons/like.svg" alt="" />
        </button>
        <button>
          <img src="@/assets/images/icons/plus.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISongGetted, ISongItem } from '@/types'
import { computed, inject, type Ref } from 'vue'

const props = defineProps<{ song: ISongGetted; index: number }>()
const emit = defineEmits<{
  (e: 'changeSong', id: number): void
}>()

const songInject = inject<{ isSongPlay: Ref<boolean>; updateSong: (item: ISongItem) => void }>(
  'songPlayDetails',
)

const songData = computed(() => ({
  song: props.song.song,
  title: props.song.title,
  author: props.song.author,
  image: props.song.image,
}))

const chooseSong = () => {
  emit('changeSong', props.index)
  songInject?.updateSong(songData.value)
}

defineExpose({ chooseSong })
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.base-song;
</style>
