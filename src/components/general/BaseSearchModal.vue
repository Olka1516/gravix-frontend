<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div>
        <input
          v-model="searchData"
          type="text"
          placeholder="Search for songs, playlists or artists"
          @input="handleInput"
        />
        <button @click="$emit('close')" class="modal-exit">
          <img src="@/assets/images/icons/exitWhite.svg" alt="" />
        </button>
      </div>
      <div class="modal-btns">
        <button
          class="border-button"
          v-for="text in btnsText"
          :key="text"
          @click="changeSelectedText(text)"
        >
          {{ text }}
        </button>
      </div>
      <div class="search">
        <h4 v-if="!searchData">Popular {{ selectedText }}</h4>
        <h4 v-else-if="!data.length">Here is no {{ selectedText }}</h4>
        <h4 v-else>Result</h4>
        <div class="search-inner">
          <div
            v-for="item in data"
            :key="getKey(item)"
            class="search-result"
            @click="changeRoute(item)"
          >
            <div class="result-content">
              <img :src="getPhoto(item)" alt="" />
              <div>
                <h4>{{ getName(item) }}</h4>
                <p>{{ getDetails(item) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAllUserData, ISongGetted } from '@/types'
import type { IPlaylist } from '@/types/playlist'
import { ref, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  songs: ISongGetted[]
  artists: IAllUserData[]
  playlists: IPlaylist[]
}>()
const emit = defineEmits<{
  (e: 'searchValue', value: string, selectedValue: string): void
  (e: 'close'): void
}>()

const searchData = ref('')
const router = useRouter()
const btnsText = ref(['Songs', 'Playlists', 'Artists'])
const selectedText = ref('Songs')
const data: Ref<ISongGetted[] | IAllUserData[] | IPlaylist[]> = ref(props.songs)

const changeSelectedText = (text: string) => {
  selectedText.value = text
  const key = text.toLocaleLowerCase() as 'songs' | 'playlists' | 'artists'
  data.value = props[key]
  searchData.value = ''
  handleInput()
}

const changeRoute = async (item: ISongGetted | IAllUserData | IPlaylist) => {
  const id = getKey(item)
  if (selectedText.value === 'Songs') {
    await router.push(`/detailed/${id}`)
  } else if (selectedText.value === 'Playlists') {
    await router.push(`/playlist/${id}`)
  } else if (selectedText.value === 'Artists') {
    if ('username' in item) await router.push(`/profile/${item.username}`)
  }
  document.body.style.overflow = ''
}

const getKey = (item: ISongGetted | IAllUserData | IPlaylist) => {
  if ('id' in item) return item.id
  if ('_id' in item) return item._id
}

const getPhoto = (item: ISongGetted | IAllUserData | IPlaylist) => {
  if ('avatar' in item) {
    if (item.avatar) return item.avatar
    const st = new URL(`../../assets/images/avatar.png`, import.meta.url)
    return st.pathname
  }
  if ('image' in item) return item.image
  if ('song' in item && item.song.length) return item.song[0].image

  const st = new URL(`../../assets/images/album_1.jpg`, import.meta.url)
  return st.pathname
}

const getName = (item: ISongGetted | IAllUserData | IPlaylist) => {
  if ('username' in item) return item.username
  if ('title' in item) return item.title
  if ('name' in item) return item.name
}

const getDetails = (item: ISongGetted | IAllUserData | IPlaylist) => {
  if ('email' in item) return item.email
  if ('description' in item) return item.author
}

const handleInput = () => {
  emit('searchValue', searchData.value, selectedText.value)
}

watch(
  () => props.songs,
  () => {
    if (selectedText.value === 'Songs') data.value = props.songs
  },
)
watch(
  () => props.playlists,
  () => {
    if (selectedText.value === 'Playlists') data.value = props.playlists
  },
)
watch(
  () => props.artists,
  () => {
    if (selectedText.value === 'Artists') data.value = props.artists
  },
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/index';
@include index.search-modal;
</style>
