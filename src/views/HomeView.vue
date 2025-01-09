<template>
  <div>
    <BaseHeader />
    <MainBlock />
    <RhythmBlock />
    <TrendBlock />
    <JourneyBlock />
    <PowerBlock />
    <ContactBlock />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import MainBlock from '@/components/landing/MainBlock.vue'
import RhythmBlock from '@/components/landing/RhythmBlock.vue'
import TrendBlock from '@/components/landing/TrendBlock.vue'
import JourneyBlock from '@/components/landing/JourneyBlock.vue'
import PowerBlock from '@/components/landing/PowerBlock.vue'
import ContactBlock from '@/components/landing/ContactBlock.vue'
</script>
