<template>
  <BaseLoading v-if="loading" />
  <div v-else>
    <BaseHeader />
    <MainBlock />
    <RhythmBlock />
    <TrendBlock />
    <JourneyBlock />
    <PowerBlock />
    <ContactBlock />
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import MainBlock from '@/components/landing/MainBlock.vue'
import RhythmBlock from '@/components/landing/RhythmBlock.vue'
import TrendBlock from '@/components/landing/TrendBlock.vue'
import JourneyBlock from '@/components/landing/JourneyBlock.vue'
import PowerBlock from '@/components/landing/PowerBlock.vue'
import ContactBlock from '@/components/landing/ContactBlock.vue'
import { onMounted, ref } from 'vue'
import BaseLoading from '@/components/general/BaseLoading.vue'

const loading = ref(true)

onMounted(() => {
  loading.value = false
})
</script>
