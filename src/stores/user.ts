import { getUserInfoByUsername, updateUsersSubscribers } from '@/services'
import type { IAllUserData, IUserDictionary } from '@/types'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const userStore = defineStore(
  'userInfo',
  () => {
    const state: IAllUserData = reactive({
      username: '',
      email: '',
      avatar: '',
      id: '',
      subscribers: [],
      following: [],
      preferences: [],
    })

    const users: IUserDictionary = reactive({})

    const getUserInfo = async (username: string) => {
      const data = await getUserInfoByUsername(username)
      state.username = data.username
      state.email = data.email
      state.avatar = data.avatar
      state.id = data.id
      state.subscribers = data.subscribers
      state.following = data.following
      state.preferences = data.preferences
    }

    const getAnotherUserInfo = async (username: string) => {
      if (!users[username]) {
        users[username] = await getUserInfoByUsername(username)
      }
      return users[username]
    }

    const updateSubscribers = async (username: string, followee: string) => {
      await updateUsersSubscribers(username, followee)

      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
      if (users[followee].subscribers.includes(userInfo.id)) {
        users[followee].subscribers = users[followee].subscribers.filter((id) => id !== userInfo.id)
      } else {
        users[followee].subscribers.push(userInfo.id)
      }
    }

    return {
      ...toRefs(state),
      users,
      getAnotherUserInfo,
      getUserInfo,
      updateSubscribers,
    }
  },
  {
    persist: true,
  },
)
