<template>
  <div class="error">
    <span v-if="isError()">
      <small class="text-error">{{ getError() }}</small>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import type { ErrorObject } from '@vuelidate/core'

const props = defineProps<{
  v: {
    $error: boolean
    $dirty: boolean
    $errors: ErrorObject[]
    $path: string
  }
  error?: string
}>()

const isError = () => {
  return (props.v.$error && props.v.$dirty) || props.error
}

const {
  EmailIsNotValid,
  IsRequired,
  EmailInUse,
  PasswordMinLength,
  PasswordIsEqual,
  UsernameInUse,
  UsernameOrPasswordWrong,
} = ErrorMessageEnum

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  switch (props.v.$path) {
    case 'email':
      if (message === EmailIsNotValid) return EmailIsNotValid
      else if (message === IsRequired) return IsRequired
      else if (props.error === EmailInUse) return EmailInUse
      break
    case 'password':
      if (message === IsRequired) return IsRequired
      else if (message === PasswordMinLength) return PasswordMinLength
      else if (props.error === UsernameOrPasswordWrong) return UsernameOrPasswordWrong
      break
    case 'confirmPassword':
      if (message === IsRequired) return IsRequired
      else if (message === PasswordIsEqual) return PasswordIsEqual
      break
    case 'username':
      if (message === IsRequired) return IsRequired
      else if (props.error === UsernameInUse) return UsernameInUse
      break
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/index';
@include index.errors;
</style>
