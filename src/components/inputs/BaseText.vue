<template>
  <input
    required
    v-model="userInfo"
    @input="handleInput($event)"
    :class="{ invalid: isInfoInvalid() }"
  />
  <i>{{ props.type }}</i>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const userInfo = ref(props.modelValue)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target) return
  userInfo.value = target.value
  emit('update:modelValue', target.value)
}
const isInfoInvalid = () => {
  console.log('invalid')
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.field;
</style>
