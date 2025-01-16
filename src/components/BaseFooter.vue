<template>
  <footer class="container">
    <div class="footer-content">
      <h3 v-for="text in arrayTexts" v-bind:key="text">{{ text }}</h3>
    </div>
    <div class="footer-content">
      <img v-for="icon in icons" v-bind:key="icon" :src="getImage(icon)" alt="" />
    </div>
    <span>Cookie declaration</span>
    <p class="footer-text">
      This website uses cookies to enhance your browsing experience, analyze traffic, and
      personalize content. By continuing to use our website, you consent to our use of cookies as
      described in this Cookie Declaration.
    </p>
    <p>Terms of Use & Privacy Policy</p>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const arrayTexts = ref(['Support', 'Fan Content', 'Store'])
const icons = ref(['discord', 'instagram', 'twitch', 'twitter'])

const getImage = (name: string) => {
  const st = new URL(`../assets/images/icons/${name}.svg`, import.meta.url)
  return st.href
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.footer;
</style>
