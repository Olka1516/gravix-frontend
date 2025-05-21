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
      <div class="content-avatar" :class="{ invalid: isHeavy }">
        <form class="my-form" v-if="isCurrentUser">
          <input type="file" id="fileElem" accept="image/*" @change="addPhoto" />
          <label class="circle-button avatar-icon" for="fileElem">
            <img src="@/assets/images/icons/upload.svg" alt="" />
          </label>
        </form>
        <span v-if="!getPhoto">{{ username[0] }}</span>
        <img v-else class="avatar-img" :src="getPhoto" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  username: string
  avatar: null | string
  email: string
  isCurrentUser: boolean
  subscribers: string[]
}>()

const emit = defineEmits<{
  (e: 'updateSubscribers'): void
  (e: 'updatePhoto', file: File): void
}>()

const isHeavy = ref(false)
const updatedImg = ref('')

const isSubscribed = computed(() => {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
  return props.subscribers.includes(user.id)
})

const getSubscribedText = computed(() => {
  return isSubscribed.value ? 'Subscribed' : 'Subscribe'
})

const getPhoto = computed(() => {
  return updatedImg.value ? updatedImg.value : props.avatar
})

const addPhoto = (files: Event) => {
  if (!(files.target instanceof HTMLInputElement) || !files.target.files) return
  const tempFiles = files.target.files

  if (10485760 < tempFiles[0].size) {
    isHeavy.value = true
    return
  }
  if (!tempFiles[0].type.includes('image')) {
    isHeavy.value = true
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(tempFiles[0])
  reader.onloadend = function () {
    if (reader.result !== null && typeof reader.result === 'string') {
      updatedImg.value = reader.result
    }
  }
  emit('updatePhoto', tempFiles[0])
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-content;
</style>
