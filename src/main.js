import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import { httpClient } from '@/utils/http-client'
import { authService } from '@/services/api'

async function initApp() {
  const app = createApp(App)

  const pinia = createPinia()
  app.use(pinia)
  app.use(router)

  httpClient.init()

  try {
    await authService.getExternalAccess()
    console.log('✅ Token de acesso externo obtido com sucesso')
  } catch (error) {
    console.error('❌ Erro ao obter token de acesso externo:', error)

  }

  app.mount('#app')
}

initApp()
