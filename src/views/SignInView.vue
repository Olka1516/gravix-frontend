<template>
  <div class="auth">
    <img class="auth-img" src="@/assets/images/notes.webp" alt="" />
    <div class="auth-navs">
      <button class="border-button" @click="routeToSignUp">Sign up</button>
    </div>
    <div class="form">
      <h2>Sign in</h2>
      <div class="field">
        <BaseText v-model="userData.email" :v="v$.email" :error="error" type="Email" />
        <ErrorMessage :v="v$.email" :error="error" />
      </div>
      <div class="field">
        <BasePassword v-model="userData.password" :v="v$.password" :error="error" type="Password" />
        <ErrorMessage :v="v$.password" :error="error" />
      </div>

      <button @click="submit" class="border-button">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseText from '@/components/inputs/BaseText.vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import BasePassword from '@/components/inputs/BasePassword.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { email, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const error = ref('')
const router = useRouter()
const userData = reactive({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required },
}

const v$ = useVuelidate(rules, userData)
const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  try {
    console.log('submit')
  } catch (err: any) {
    error.value = err.response?.data.message || ''
  }
}

const routeToSignUp = async () => {
  await router.push('/sign-up')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.sign-in;
</style>
