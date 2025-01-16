<template>
  <div class="auth">
    <img class="auth-img" src="@/assets/images/notes.webp" alt="" />
    <div class="auth-navs">
      <button class="border-button">Sign in</button>
      <button @click="routeToSignUp">Sign up</button>
    </div>
    <div class="form">
      <h2>Sign in</h2>
      <div class="field">
        <BaseText v-model="userData.email" type="Email" />
      </div>
      <div class="field">
        <BasePassword v-model="userData.password" type="Password" />
      </div>

      <button @click="submit" class="border-button">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseText from '@/components/inputs/BaseText.vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import BasePassword from '@/components/inputs/BasePassword.vue'

const router = useRouter()
const userData = reactive({
  email: '',
  password: '',
})

const submit = () => {
  console.log('submit')
}

const routeToSignUp = async () => {
  await router.push('/sign-up')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.sign-in;
</style>
