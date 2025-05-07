<template>
  <div class="card" :class="{ active }" @click="$emit('selectedOption')">
    <div class="card-content question-block">
      <img :src="getPhoto()" alt="" />
      <b class="question-text">{{ text }}</b>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string | null
  text: string
  active: boolean
}>()

const getPhoto = () => {
  if (props.image) return props.image

  const st = new URL(`../../assets/images/avatar.png`, import.meta.url)
  return st.pathname
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.base-question;
</style>
