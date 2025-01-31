<template>
  <div
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    class="drop-area"
    :class="{ invalid: isInfoInvalid() }"
  >
    <form class="my-form">
      <i>{{ text }}</i>
      <input type="file" id="audioElem" accept="audio/*" @change="handleFileInput" />
      <label v-if="!isMusicChosen" class="border-button" for="audioElem">Choose audio file</label>
    </form>
    <div v-if="isMusicChosen">
      <audio v-if="audioUrl" controls>
        <source :src="audioUrl" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

const props = defineProps<{
  isPostsPage?: boolean
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
  url?: string
}>()

const text = ref('Song')

const dropArea: Ref<null | Element> = ref(null)
const isMusicChosen = ref(false)
const emit = defineEmits<{ (e: 'update', value: File): void }>()
const isHeavy = ref(false)
const uploadedFile = ref<File | null>(null)
const audioUrl = ref<string | null>(null)

const handleDragEnter = (e: DragEvent) => {
  preventDefaults(e)
}

const handleDragOver = (e: DragEvent) => {
  preventDefaults(e)
}

const handleDragLeave = (e: DragEvent) => {
  preventDefaults(e)
}

const handleDrop = (e: DragEvent) => {
  preventDefaults(e)
  const dt = e.dataTransfer
  if (!dt) return
  const files = dt.files
  handleFiles(files)
}

const handleFileInput = (files: Event) => {
  if (!(files.target instanceof HTMLInputElement) || !files.target.files) return
  handleFiles(files.target.files)
}

const preventDefaults = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleFiles = (files: FileList) => {
  clearPreview()
  if (10485760 < files[0].size) {
    isHeavy.value = true
    text.value = 'The file size is too large, please choose a file less than 10 MB'
    return
  }
  if (!files[0].type.includes('audio')) {
    isHeavy.value = true
    text.value = 'This is not an audio file, please upload a valid music file'
    return
  }
  uploadedFile.value = files[0]
  uploadFile(files[0])
  previewFile(files[0])
}

const uploadFile = (file: File) => {
  emit('update', file)
}

const previewFile = (file: File) => {
  isMusicChosen.value = true
  uploadedFile.value = file
  audioUrl.value = URL.createObjectURL(file)
  emit('update', file)
}

const clearPreview = () => {
  const preview = document.getElementById('preview-audio')
  if (preview) {
    preview.innerHTML = ''
  }
}

onMounted(() => {
  dropArea.value = document.querySelector('.drop-area')
  if (props.url) {
    isMusicChosen.value = true
    audioUrl.value = props.url
  }
})

const isInfoInvalid = () => {
  if (isHeavy.value) return isHeavy.value
  if (!props.v) return
  return props.v.$invalid && props.v.$dirty && !isMusicChosen.value
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.drag-file-music;
</style>
