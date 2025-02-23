<template>
  <div>
    <BaseHeader />
    <ContentBlock />
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/detailed/ContentBlock.vue'

import { songStore } from '@/stores'
import type { ISongGetted } from '@/types'
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

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

provide('songPlayDetails', { song })

onMounted(async () => {
  song.value = await storeSongs.getSong(route.params.id.toString())
})
</script>
