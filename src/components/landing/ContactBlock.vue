<template>
  <div class="container">
    <h2>Contact Us</h2>
    <div class="form">
      <div class="field">
        <BaseText v-model="form.email" :v="v$.email" :error="error" type="Email" />
        <ErrorMessage :v="v$.email" :error="error" />
      </div>
      <div class="field">
        <BaseText v-model="form.message" :v="v$.message" type="Text" />
        <ErrorMessage :v="v$.message" />
      </div>
      <button @click="send" class="border-button">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseText from '../inputs/BaseText.vue'
import { email, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import ErrorMessage from '../inputs/ErrorMessage.vue'
import { contactUs } from '@/services'
import { notificationStore } from '@/stores/notificationStore'

const store = notificationStore()
const error = ref('')
const form = reactive({
  email: '',
  message: '',
})

const rules = {
  email: { required, email },
  message: { required },
}

const v$ = useVuelidate(rules, form)
const send = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  try {
    await contactUs(form)
    store.sendSuccess('Message sent successfully')
  } catch {
    store.sendError('Message failed to send')
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.contact;
</style>
