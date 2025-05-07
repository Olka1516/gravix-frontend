<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="top">
        <div class="modal-content top-content">
          <h3>Create Playlist</h3>
          <button @click="$emit('close')">
            <img src="@/assets/images/icons/exitWhite.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="field">
        <BaseText v-model="playlistData.name" :v="v$.name" type="Playlist name" />
        <ErrorMessage :v="v$.name" />
      </div>
      <div
        class="modal-visibility"
        :class="{ 'selection-error': v$.visibility.$invalid && v$.visibility.$dirty }"
        @click="open = !open"
      >
        <div class="modal-visibility-text" :class="{ animation: playlistData.visibility }">
          Choose visibility
        </div>
        <span
          class="modal-choosen-visibility"
          :class="{ 'text-animation': playlistData.visibility }"
          >{{ playlistData.visibility }}</span
        >
        <transition name="fade">
          <div class="modal-options" v-if="open" @click="open = !open">
            <div
              v-for="(value, key) in IPlaylistVisibility"
              :key="key"
              @click="chooseVisibility(value)"
              class="modal-option"
            >
              {{ value }}
            </div>
          </div>
        </transition>
      </div>
      <div class="modal-content">
        <button class="modal-cancel" @click="$emit('close')">Cencel</button>
        <button class="border-button" @click="submit">Create</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseText from '../inputs/BaseText.vue'
import ErrorMessage from '../inputs/ErrorMessage.vue'
import { required } from '@vuelidate/validators'
import type { TRequestError } from '@/types'
import useVuelidate from '@vuelidate/core'
import { IPlaylistVisibility } from '@/types/playlist'
import { playlistStore } from '@/stores/playlist'

const emit = defineEmits<{ (e: 'close'): void }>()

const store = playlistStore()
const open = ref(false)
const playlistData = reactive({
  name: '',
  visibility: '',
})

const rules = {
  name: { required },
  visibility: { required },
}

const chooseVisibility = (value: string) => {
  playlistData.visibility = value
  open.value = !open.value
}

const v$ = useVuelidate(rules, playlistData)
const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  try {
    await store.createPlaylist(playlistData)
    emit('close')
  } catch (err) {
    const message = err as TRequestError
    console.log(message)
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.playlist-modal;
</style>
