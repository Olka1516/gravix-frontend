import { getUserInfoByUsername } from '@/services'
import type { IUser, IUserDictionary } from '@/types'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const userStore = defineStore('userInfo', () => {
  const state: IUser = reactive({
    username: '',
    email: '',
    avatar: '',
    id: '',
  })

  const users: IUserDictionary = reactive({})

  const getUserInfo = async (username: string) => {
    const data = await getUserInfoByUsername(username)
    state.username = data.username
    state.email = data.email
    state.avatar = data.avatar
    state.id = data.id
  }

  const getAnotherUserInfo = async (username: string) => {
    if (!users[username]) {
      users[username] = await getUserInfoByUsername(username)
    }
    return users[username]
  }

  return {
    ...toRefs(state),
    users,
    getAnotherUserInfo,
    getUserInfo,
  }
})
