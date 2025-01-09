<template>
  <div class="container">
    <h2>Contact Us</h2>
    <div class="contact">
      <div class="field">
        <BaseEmail v-model="form.email" type="Email"></BaseEmail>
      </div>
      <div class="field">
        <BaseText v-model="form.text" type="Text"></BaseText>
      </div>
      <button class="border-button">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseEmail from '../inputs/BaseEmail.vue'
import BaseText from '../inputs/BaseText.vue'

const form = reactive({
  email: '',
  text: '',
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.contact;
</style>
