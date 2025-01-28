<template>
  <div class="auth">
    <div class="form">
      <h2>Sign up</h2>
      <div class="field">
        <BaseText v-model="userData.username" :v="v$.username" type="Username" :error="error" />
        <ErrorMessage :v="v$.username" :error="error" />
      </div>
      <div class="field">
        <BaseText v-model="userData.email" :v="v$.email" :error="error" type="Email" />
        <ErrorMessage :v="v$.email" :error="error" />
      </div>
      <div class="field">
        <BasePassword v-model="userData.password" :v="v$.password" type="Password" />
        <ErrorMessage :v="v$.password" />
      </div>
      <div class="field">
        <BasePassword
          v-model="userData.confirmPassword"
          :v="v$.confirmPassword"
          type="Confirm password"
        />
        <ErrorMessage :v="v$.confirmPassword" />
      </div>

      <button @click="submit" class="border-button">Submit</button>
    </div>
    <img class="auth-img" src="@/assets/images/notes.webp" alt="" />
    <div class="auth-navs">
      <button class="border-button" @click="routeNavigateTo('sign-in')">Sign in</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasePassword from '@/components/inputs/BasePassword.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import { email, required, sameAs, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'

import { authStore } from '@/stores'
import type { TRequestError } from '@/types'

const store = authStore()
const router = useRouter()
const error = ref('')
const userData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  username: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: {
    required,
    sameAs: sameAs(computed(() => userData.password)),
  },
}

const v$ = useVuelidate(rules, userData)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  try {
    const { username, email, password } = userData

    await store.signUp({
      username,
      email,
      password,
    })
    await routeNavigateTo('profile/' + userData.username)
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}

const routeNavigateTo = async (name: string) => {
  await router.push(`/${name}`)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.sign-up;
</style>
