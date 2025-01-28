<template>
  <div>
    <BaseHeader />
    <ContentBlock :username="data.username" :avatar="data.avatar" :email="data.email" />
    <SongsBlock />
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from '@/components/profile/ContentBlock.vue'
import SongsBlock from '@/components/profile/SongsBlock.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { onMounted, reactive } from 'vue'
import { userStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { IUser } from '@/types'

const data = reactive<IUser>({
  username: '',
  email: '',
  avatar: null,
  id: '',
})

const route = useRoute()
const store = userStore()

const updateData = (user: IUser) => {
  data.avatar = user.avatar
  data.username = user.username
  data.email = user.email
  data.id = user.id
}

onMounted(async () => {
  const username = localStorage.getItem('username')
  const routeUsername = route.params.username.toString()
  if (!store.username) {
    await store.getUserInfo(routeUsername)
    updateData(store)
  } else if (username === store.username) {
    updateData(store)
  } else {
    const tempData = await store.getAnotherUserInfo(routeUsername)
    updateData(tempData)
  }
})
</script>
