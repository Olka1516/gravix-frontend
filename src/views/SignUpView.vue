<template>
  <div class="auth">
    <div class="form">
      <h2>Sign up</h2>
      <div class="field">
        <BaseText v-model="userData.username" type="Username" />
      </div>
      <div class="field">
        <BaseText v-model="userData.email" type="Email" />
      </div>
      <div class="field">
        <BasePassword v-model="userData.password" type="Password" />
      </div>
      <div class="field">
        <BasePassword v-model="userData.confirmPassword" type="Confirm password" />
      </div>

      <button @click="submit" class="border-button">Submit</button>
    </div>
    <img class="auth-img" src="@/assets/images/notes.webp" alt="" />
    <div class="auth-navs">
      <button class="border-button">Sign up</button>
      <button @click="routeToSignIn">Sign in</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasePassword from '@/components/inputs/BasePassword.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const submit = () => {
  console.log('submit')
}

const routeToSignIn = async () => {
  await router.push('/sign-in')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.sign-up;
</style>
