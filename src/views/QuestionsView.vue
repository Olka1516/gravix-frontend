<template>
  <BaseLoading v-if="loading" />
  <div v-else class="container">
    <h4>{{ questionText }}</h4>
    <BaseColoredCircle size="240px" top="40%" right="40%" />

    <div class="questions-content">
      <BaseQuestion
        v-for="(item, index) in questionsCards"
        :key="index"
        :text="item.text"
        :image="item.image"
        :active="isSelected(item.id || item.text)"
        @selectedOption="toggleOption(item.id || item.text)"
      />
    </div>

    <div class="questions-nav">
      <button v-if="buttonText" class="border-button" @click="handleNext">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseColoredCircle from '@/components/general/BaseColoredCircle.vue'
import BaseQuestion from '@/components/general/BaseQuestion.vue'
import { genresQuestions } from '@/constants'
import { useQuestionsStore } from '@/stores/questions'
import type { IAnswers } from '@/types/answer'
import BaseLoading from '@/components/general/BaseLoading.vue'

const loading = ref(true)
const route = useRoute()
const router = useRouter()
const store = useQuestionsStore()

const questionText = ref('')
const buttonText = ref('')
const selectedOptions: Ref<string[]> = ref([])
const questionsCards: Ref<IAnswers[]> = ref([])

const toggleOption = (value: string) => {
  selectedOptions.value = selectedOptions.value.includes(value)
    ? selectedOptions.value.filter((v) => v !== value)
    : [...selectedOptions.value, value]

  updateStoreSelection()
}

const isSelected = (value: string) => selectedOptions.value.includes(value)

const updateSelectionMap: Record<string, () => void> = {
  genres: () => store.setGenres(selectedOptions.value),
  artists: () => store.setArtists(selectedOptions.value),
}

const updateStoreSelection = () => {
  const step = route.params.id as string
  updateSelectionMap[step]?.()
}

const handleNext = async () => {
  const step = route.params.id as string
  const isLastStep = step === 'artists'
  const nextPath = isLastStep ? '/songs' : '/questions/artists'

  updateStoreSelection()

  if (isLastStep) {
    store.saveData()
  }

  await router.push(nextPath)
}

const setupPage = async (step: string) => {
  const setupMap: Record<string, () => Promise<void> | void> = {
    genres: () => {
      questionText.value = 'What genres of music do you usually listen to?'
      questionsCards.value = genresQuestions
      buttonText.value = 'Next'
      selectedOptions.value = store.genres
    },
    artists: async () => {
      questionText.value = 'What artists do you usually listen to?'
      questionsCards.value = await store.getArtists()
      buttonText.value = 'Finish'
      selectedOptions.value = store.artists
    },
  }

  if (setupMap[step]) {
    setupMap[step]()
  } else {
    questionText.value = '404'
    questionsCards.value = []
  }
}

watch(
  () => route.params.id,
  () => {
    setupPage(route.params.id as string)
  },
)

onMounted(() => {
  setupPage(route.params.id as string)
  loading.value = false
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.questions;
</style>
