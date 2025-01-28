<template>
  <div class="container">
    <div class="content">
      <div class="content-texts">
        <h4>Profile</h4>
        <div class="texts-info">
          <h2>{{ username }}</h2>
          <h4>{{ email }}</h4>
        </div>
      </div>
      <div class="content-avatar">
        <button class="circle-button avatar-icon">
          <img src="@/assets/images/icons/upload.svg" alt="" />
        </button>
        <span v-if="!avatar">{{ username[0] }}</span>
        <img v-else class="avatar-img" :src="avatar" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ username: string; avatar: null | string; email: string }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-content;
</style>
