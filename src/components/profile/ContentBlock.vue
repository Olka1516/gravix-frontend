<template>
  <div class="container">
    <div class="content">
      <div class="content-texts">
        <h4>Profile</h4>
        <div class="texts-info">
          <h2>{{ username }}</h2>
          <h4>{{ email }}</h4>
        </div>
        <div class="content-subscribers">
          <button
            v-show="!isCurrentUser"
            class="border-button"
            :class="{ subscibe: !isSubscribed }"
            @click="$emit('updateSubscribers')"
          >
            {{ getSubscribedText }}
          </button>
          <p>Subscribers: {{ subscribers.length }}</p>
        </div>
      </div>
      <div class="content-avatar">
        <button v-if="isCurrentUser" class="circle-button avatar-icon">
          <img src="@/assets/images/icons/upload.svg" alt="" />
        </button>
        <span v-if="!avatar">{{ username[0] }}</span>
        <img v-else class="avatar-img" :src="avatar" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  username: string
  avatar: null | string
  email: string
  isCurrentUser: boolean
  subscribers: string[]
}>()

const isSubscribed = computed(() => {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
  return props.subscribers.includes(user.id)
})

const getSubscribedText = computed(() => {
  return isSubscribed.value ? 'Subscribed' : 'Subscribe'
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-content;
</style>
