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
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: () => void
  }
  error?: string
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

const { InvalidCredentials, EmailInUse, EmailIsNotValid, UsernameInUse } = ErrorMessageEnum
const isInfoInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    ((props.error === EmailInUse || props.error === EmailIsNotValid) && props.type === 'Email') ||
    (props.error === UsernameInUse && props.type === 'Username') ||
    props.error === InvalidCredentials
  )
}

watch(
  () => props.modelValue,
  () => {
    userInfo.value = props.modelValue
  },
)
</script>
<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.field;
</style>
