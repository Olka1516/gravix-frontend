<template>
  <div class="container">
    <h2>Contact Us</h2>
    <div class="form">
      <div class="field">
        <BaseText v-model="form.email" :v="v$.email" :error="error" type="Email" />
        <ErrorMessage :v="v$.email" :error="error" />
      </div>
      <div class="field">
        <BaseText v-model="form.text" :v="v$.text" type="Text" />
        <ErrorMessage :v="v$.text" />
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

const error = ref('')
const form = reactive({
  email: '',
  text: '',
})

const rules = {
  email: { required, email },
  text: { required },
}

const v$ = useVuelidate(rules, form)
const send = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.contact;
</style>
