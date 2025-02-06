<template>
  <textarea
    required
    v-model="userInfo"
    @input="handleInput($event)"
    rows="4"
    :class="{ invalid: isInfoInvalid() }"
  />
  <i>{{ props.type }}</i>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: () => void
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const userInfo = ref(props.modelValue)

const handleInput = (event: Event) => {
  props.v.$touch()
  const target = event.target as HTMLInputElement
  if (!target) return
  userInfo.value = target.value
  emit('update:modelValue', target.value)
}

const isInfoInvalid = () => {
  if (!props.v) return
  return props.v.$invalid && props.v.$dirty
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.description;
</style>
