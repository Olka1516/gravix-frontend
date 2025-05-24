import '@/assets/styles/reset.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vue-toastification/dist/index.css'

import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

app.use(pinia).use(router).use(Toast, options).mount('#app')
