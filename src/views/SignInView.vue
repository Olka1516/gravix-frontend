<template>
  <BaseLoading v-if="loading" />
  <div v-else class="auth">
    <img class="auth-img" src="@/assets/images/notes.webp" alt="" />
    <div class="auth-navs">
      <button class="border-button" @click="routeNavigateTo('sign-up')">Sign up</button>
    </div>
    <div class="form">
      <h2>Sign in</h2>
      <div class="field">
        <BaseText v-model="userData.username" :v="v$.username" :error="error" type="Username" />
        <ErrorMessage :v="v$.username" :error="error" />
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
import { onMounted, reactive, ref } from 'vue'
import BasePassword from '@/components/inputs/BasePassword.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import { NotificationsEnum, type TRequestError } from '@/types'
import { authStore } from '@/stores'
import BaseLoading from '@/components/general/BaseLoading.vue'
import { notificationStore } from '@/stores/notificationStore'

const loading = ref(true)
const store = authStore()
const storeNotification = notificationStore()
const router = useRouter()
const error = ref('')
const userData = reactive({
  username: '',
  password: '',
})

const rules = {
  username: { required },
  password: { required },
}

const v$ = useVuelidate(rules, userData)
const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  try {
    await store.signIn(userData)
    await routeNavigateTo('profile/' + userData.username)
    storeNotification.sendSuccess(NotificationsEnum.loginInSuccess)
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}

const routeNavigateTo = async (name: string) => {
  await router.push(`/${name}`)
}

onMounted(() => {
  loading.value = false
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.sign-in;
</style>
