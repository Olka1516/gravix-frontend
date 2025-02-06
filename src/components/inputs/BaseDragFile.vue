<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

const props = defineProps<{
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
  url: string | File | null
}>()

const text = ref(
  'Upload images using the file selection dialog or by dragging the desired images into the highlighted area',
)

const dropArea: Ref<null | Element> = ref(null)
const isImageChoosen = ref(false)
const emit = defineEmits<{ (e: 'update', value: File): void }>()
const isHeavy = ref(false)
const uploadedFile = ref<File | null>(null)

const handleDragEnter = (e: DragEvent) => {
  preventDefaults(e)
  highlight()
}

const handleDragOver = (e: DragEvent) => {
  preventDefaults(e)
  highlight()
}

const handleDragLeave = (e: DragEvent) => {
  preventDefaults(e)
  unhighlight()
}

const handleDrop = (e: DragEvent) => {
  preventDefaults(e)
  unhighlight()
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

const highlight = () => {
  if (dropArea.value) {
    dropArea.value.classList.add('highlight')
  }
}

const unhighlight = () => {
  if (dropArea.value) {
    dropArea.value.classList.remove('highlight')
  }
}

const handleFiles = (files: FileList) => {
  clearGallery()
  if (10485760 < files[0].size) {
    isHeavy.value = true
    text.value = 'The image size is too large, please choose an image less than 10 MB'
    return
  }
  if (!files[0].type.includes('image')) {
    isHeavy.value = true
    text.value = 'This is not a photo, please upload a picture'
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
  isImageChoosen.value = true
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    if (reader.result !== null && typeof reader.result === 'string') {
      const img = document.createElement('img')
      img.src = reader.result
      img.id = 'previewImage'
      document.getElementById('gallery')?.appendChild(img)
    }
  }
}

const clearGallery = () => {
  const gallery = document.getElementById('gallery')
  if (gallery) {
    gallery.innerHTML = ''
  }
}

onMounted(() => {
  dropArea.value = document.querySelector('.drop-area')
  if (!props.url) return
  if (typeof props.url === 'string') {
    isImageChoosen.value = true
    const img = document.createElement('img')
    img.src = props.url
    document.getElementById('gallery')?.appendChild(img)
  }
})

const isInfoInvalid = () => {
  if (isHeavy.value) return isHeavy.value
  if (!props.v) return
  return props.v.$invalid && props.v.$dirty && !isImageChoosen.value
}
</script>

<template>
  <div
    id="drop-area"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    class="drop-area"
    :class="{ invalid: isInfoInvalid() }"
  >
    <form class="my-form" v-if="!isImageChoosen">
      <p>{{ text }}</p>
      <input type="file" id="fileElem" accept="image/*" @change="handleFileInput" />
      <label class="border-button" for="fileElem">Choose image</label>
    </form>
    <div v-if="isImageChoosen || props.url">
      <div id="gallery"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.drag-file;
</style>
