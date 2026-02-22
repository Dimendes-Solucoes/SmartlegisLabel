import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'

// Importar httpClient para inicialização
import { httpClient } from '@/utils/http-client'
import { authService } from '@/services/api'

// Função assíncrona para inicializar a aplicação
async function initApp() {
  const app = createApp(App)

  const pinia = createPinia()
  app.use(pinia)
  app.use(router)

  // Inicializar httpClient após Pinia estar disponível
  httpClient.init()

  // Obter token de acesso externo ao iniciar a aplicação
  try {
    await authService.getExternalAccess()
    console.log('✅ Token de acesso externo obtido com sucesso')
  } catch (error) {
    console.error('❌ Erro ao obter token de acesso externo:', error)
    // Continua a aplicação mesmo se falhar (opcional: redirecionar para erro)
  }

  app.mount('#app')
}

// Inicializar a aplicação
initApp()
