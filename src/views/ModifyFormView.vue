<template>
  <BaseLoading v-if="loading" />
  <div v-else class="modify">
    <div>
      <div v-for="k in 3" :key="k" class="wave"></div>
    </div>
    <div class="form">
      <BaseDragFile :url="data.image" @update="(item) => setImage(item)" :v="v$.image" />
      <div class="form-inputs">
        <div class="field">
          <BaseText v-model="data.title" type="Title" :v="v$.title" />
          <ErrorMessage :v="v$.title" />
        </div>
        <div class="field">
          <BaseTextarea v-model="data.description" type="Description" :v="v$.description" />
          <ErrorMessage :v="v$.description" />
        </div>
        <div class="field">
          <BaseMusic :url="data.song" @update="(item) => setMusic(item)" :v="v$.song" />
          <ErrorMessage :v="v$.song" />
        </div>
        <div class="field">
          <BaseSelector
            v-model="data.genres"
            :allSelections="songsGenres"
            type="Genres"
            :v="v$.genres"
          />
          <ErrorMessage :v="v$.genres" />
        </div>
        <div class="field">
          <BaseTextarea v-model="data.lyrics" type="Lyrics" :v="v$.lyrics" />
          <ErrorMessage :v="v$.lyrics" />
        </div>
        <div class="field">
          <BaseTime
            v-model="data.releaseYear"
            type="date"
            name="Release year"
            :v="v$.releaseYear"
          />
          <ErrorMessage :v="v$.releaseYear" />
        </div>

        <button class="border-button" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/general/BaseLoading.vue'
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseMusic from '@/components/inputs/BaseMusic.vue'
import BaseSelector from '@/components/inputs/BaseSelector.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import BaseTextarea from '@/components/inputs/BaseTextarea.vue'
import BaseTime from '@/components/inputs/BaseTime.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { songsGenres } from '@/constants'
import { songStore } from '@/stores'
import { notificationStore } from '@/stores/notificationStore'
import { NotificationsEnum, type ISong } from '@/types'
import useVuelidate from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const storeNotification = notificationStore()
const loading = ref(true)
const route = useRoute()
const router = useRouter()
const store = songStore()
const data: ISong = reactive({
  title: '',
  description: '',
  lyrics: '',
  image: null,
  song: null,
  genres: [],
  author: '',
  duration: '',
  releaseYear: '',
  rating: 0,
  ratingCount: 0,
  likes: [],
})

const rules = {
  title: { required },
  description: { required },
  lyrics: { required },
  image: { required },
  song: { required },
  genres: { required, minLength: minLength(1) },
  releaseYear: { required },
}

const v$ = useVuelidate(rules, data)

const setMusic = (file: File) => {
  data.song = file

  const audio = new Audio()
  audio.src = URL.createObjectURL(file)

  audio.onloadedmetadata = () => {
    const minutes = Math.floor(audio.duration / 60)
    const seconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, '0')
    data.duration = `${minutes}:${seconds}`
  }
}

const setImage = (file: File) => {
  data.image = file
}

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  try {
    let notification
    data.author = localStorage.getItem('username') || ''
    if (data._id) {
      await store.updateSong(data)
      notification = NotificationsEnum.songUpdatedSuccessful
    } else {
      await store.createSong(data)
      notification = NotificationsEnum.songAddedSuccessful
    }
    await router.push(`/profile/${data.author}`)
    storeNotification.sendSuccess(notification)
  } catch {
    let notification
    if (data._id) {
      notification = NotificationsEnum.songUpdatedSuccessful
    } else {
      notification = NotificationsEnum.songAddedSuccessful
    }
    storeNotification.sendSuccess(notification)
  }
}

onMounted(async () => {
  if (route.params.id) {
    const id = route.params.id.toString()
    if (id) {
      const tempSong = await store.getSong(id)
      Object.assign(data, tempSong)
    }
  }
  loading.value = false
})

onUnmounted(() => {
  Object.assign(data, {
    title: '',
    description: '',
    lyrics: '',
    image: null,
    song: null,
    genres: [],
    author: '',
    duration: '',
    releaseYear: '',
    rating: 0,
    ratingCount: 0,
    likes: [],
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.modify;
</style>
