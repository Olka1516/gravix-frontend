<template>
  <div class="content">
    <div class="select" @click="changeStatus" :class="{ invalid: isInfoInvalid() }">
      <i v-if="!selectedDatas.length">{{ type }}</i>
      <div class="selected-product">
        <span v-for="product in selectedDatas" :key="product">
          {{ product }}
          <button @click="deleteChoose($event, product)">
            <img src="../../assets/images/icons/exit.svg" alt="" />
          </button>
        </span>
      </div>
      <div class="select-open" v-if="selectStatus">
        <h5 @click="selectProduct(key)" v-for="key in allSelections" :key="key">{{ key }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string[]
  allSelections: string[]
  type: string
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
}>()

const selectStatus = ref(false)
const selectedDatas = ref<string[]>([])
selectedDatas.value = props.modelValue

const changeStatus = () => {
  selectStatus.value = !selectStatus.value
}

const selectProduct = (product: string) => {
  if (!selectedDatas.value.includes(product)) {
    selectedDatas.value.push(product)
  }
}

const deleteChoose = (event: Event, product: string) => {
  event.stopPropagation()
  selectedDatas.value = selectedDatas.value.filter((item) => item !== product)
  emit('update:modelValue', selectedDatas.value)
}

const isInfoInvalid = () => {
  if (!props.v) return
  return props.v.$invalid && props.v.$dirty && !selectedDatas.value
}

watch(
  () => props.modelValue,
  () => {
    selectedDatas.value = props.modelValue
  },
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.selection;
</style>
