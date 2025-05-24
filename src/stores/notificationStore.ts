import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const notificationStore = defineStore('notificationSender', () => {
  const toast = useToast()

  const sendSuccess = (message: string) => {
    toast.success(message, {
      toastClassName: 'success-toats',
    })
  }

  const sendError = (message: string) => {
    toast.error(message, {
      toastClassName: 'error-toats',
    })
  }

  return {
    sendSuccess,
    sendError,
  }
})
