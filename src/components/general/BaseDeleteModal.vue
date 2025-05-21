<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal-content top-content">
        <h4>Are you sure you want to delete this {{ text }}?</h4>
        <button @click="$emit('close')" class="modal-exit">
          <img src="@/assets/images/icons/exitWhite.svg" alt="" />
        </button>
      </div>
      <div class="modal-content">
        <button class="modal-cancel" @click="$emit('close')">Cancel</button>
        <button class="border-button" @click="$emit('delete')">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.delete-modal;
</style>
