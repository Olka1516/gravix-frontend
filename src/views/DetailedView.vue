<template>
  <div>
    <BaseLoading v-if="loading" />
    <div v-else>
      <BaseHeader />
      <ContentBlock @likeSong="(id: string) => likeSong(id)" v-model:playedSong="playedSong" />
      <BaseFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/detailed/ContentBlock.vue'
import BaseLoading from '@/components/general/BaseLoading.vue'

import { songStore } from '@/stores'
import type { ISongGetted } from '@/types'
import { inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const playedSong = ref('')
const storeSongs = songStore()
const route = useRoute()
const loading = ref(true)

const song = ref<ISongGetted>({
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
})

const detailedInject = inject<{ setDitailedSong: (item: ISongGetted) => void }>('detailedSong')

const likeSong = async (id: string) => {
  await storeSongs.likeSong(id)
  song.value = await storeSongs.getSong(id)
  detailedInject?.setDitailedSong(song.value)
}

onMounted(async () => {
  song.value = await storeSongs.getSong(route.params.id.toString())
  detailedInject?.setDitailedSong(song.value)
  loading.value = false
})
</script>
