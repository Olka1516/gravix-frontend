import type { IUser } from '@/types'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const userStore = defineStore('userInfo', () => {
  const state: IUser = reactive({
    username: '',
    email: '',
    avatar: '',
    id: '',
  })

  const getOnlyUserInfo = async (username: string) => {
    const data = await getUserInfoByUsername(username)
    state.username = data.username
    state.email = data.email
    state.avatar = data.avatar
    state.id = data.id
  }

  return {
    ...toRefs(state),
    getOnlyUserInfo,
  }
})
