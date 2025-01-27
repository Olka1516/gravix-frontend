<template>
  <input
    required
    :type="bloke"
    v-model="userPassword"
    @focus="inputFocused = true"
    @blur="inputFocused = false"
    @input="handleInput($event)"
    :class="{
      invalid: isPasswordInvalid(),
    }"
  />
  <i>{{ props.type }} </i>
  <button @click="isVisible">
    <img :src="newUrl()" alt="" />
  </button>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'

const bloke = ref('password')
const props = defineProps<{
  modelValue: string
  type: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: Function
  }
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | null): void
}>()

const userPassword = ref(props.modelValue)
const inputFocused = ref(false)

const handleInput = (event: Event) => {
  props.v.$touch()
  const target = event.target as HTMLInputElement
  if (!target) return
  emit('update:modelValue', target.value)
}

const { PasswordMinLength, PasswordIsEqual, PassMissMach } = ErrorMessageEnum
const isPasswordInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    props.error === PasswordMinLength ||
    props.error === PasswordIsEqual ||
    props.error === PassMissMach
  )
}

const isVisible = () => {
  if (bloke.value === 'password') bloke.value = 'text'
  else bloke.value = 'password'
}

const newUrl = () => {
  const name = bloke.value === 'password' ? 'eye' : 'eye-off'
  const st = new URL(`../../assets/images/icons/${name}.svg`, import.meta.url)
  return st.href
}

watch(
  () => props.modelValue,
  (data) => {
    userPassword.value = data
  },
)
</script>
<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.password-field;
</style>
