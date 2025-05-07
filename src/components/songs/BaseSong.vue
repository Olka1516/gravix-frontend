<template>
  <div class="base-song">
    <div class="song-content">
      <img class="song-image" :src="song.image" alt="" />
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
import type { ISongGetted } from '@/types'

defineProps<{ song: ISongGetted }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.base-song;
</style>
