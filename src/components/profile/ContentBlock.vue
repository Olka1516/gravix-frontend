<template>
  <div class="container">
    <div class="content">
      <div class="content-texts">
        <h4>Profile</h4>
        <div class="texts-info">
          <h2>Username</h2>
          <h4>Email</h4>
        </div>
      </div>
      <div class="content-avatar">
        <span>U</span>
        <!-- <img src="" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.profile-content;
</style>
