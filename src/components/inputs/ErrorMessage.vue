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
  InvalidCredentials,
  PassMissMach,
} = ErrorMessageEnum

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  switch (props.v.$path) {
    case 'email':
      if (message === EmailIsNotValid) return EmailIsNotValid
      else if (message === IsRequired) return IsRequired
      else if (props.error === EmailInUse) return 'Email already in use!'
      else if (props.error === InvalidCredentials) return 'Email not found!'
      break
    case 'password':
      if (message === IsRequired) return IsRequired
      else if (message === PasswordMinLength) return PasswordMinLength
      else if (props.error === PassMissMach) return 'Password is wrong'
      break
    case 'confirmPassword':
      if (message === IsRequired) return IsRequired
      else if (message === PasswordIsEqual) return PasswordIsEqual
      break
    case 'username':
      if (message === IsRequired) return IsRequired
      else if (props.error === UsernameInUse) return 'Username already in use!'
      break
    case 'title':
      if (message === IsRequired) return IsRequired
      break
    case 'text':
      if (message === IsRequired) return IsRequired
      break
    case 'name':
      if (message === IsRequired) return IsRequired
      break
    case 'description':
      if (message === IsRequired) return IsRequired
      break
    case 'lyrics':
      if (message === IsRequired) return IsRequired
      break
    case 'genres':
      if (message === IsRequired) return IsRequired
      break
    case 'author':
      if (message === IsRequired) return IsRequired
      break
    case 'releaseYear':
      if (message === IsRequired) return IsRequired
      break
    case 'song':
      if (message === IsRequired) return IsRequired
      break
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/index';
@include index.errors;
</style>
