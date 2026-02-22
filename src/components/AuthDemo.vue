<template>
  <div class="auth-demo">
    <!-- Status de autenticação -->
    <div class="auth-status">
      <h2>🔐 Status de Autenticação</h2>
      
      <div v-if="loading" class="loading">
        ⏳ Verificando autenticação...
      </div>
      
      <div v-else-if="isAuthenticated" class="authenticated">
        <p class="status-badge success">✅ Autenticado</p>
        
        <div class="token-display">
          <strong>Token:</strong>
          <code>{{ token?.substring(0, 40) }}...</code>
        </div>
        
        <div v-if="user" class="user-info">
          <h3>Informações do Usuário (do Token)</h3>
          <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </div>
        
        <button @click="handleLogout" class="btn-logout">
          Fazer Logout
        </button>
      </div>
      
      <div v-else class="not-authenticated">
        <p class="status-badge error">❌ Não autenticado</p>
        <p class="info-text">
          O token será obtido automaticamente ao carregar a página.<br>
          Se você está vendo esta mensagem, verifique o console para erros.
        </p>
      </div>
    </div>
    
    <!-- Verificar token manualmente -->
    <div class="token-check">
      <h2>🔍 Verificar Token Manualmente</h2>
      <button @click="checkToken" class="btn-primary">
        Verificar Token
      </button>
      
      <div v-if="tokenInfo" class="token-details">
        <div class="detail-item">
          <strong>Existe token:</strong>
          <span :class="tokenInfo.hasToken ? 'text-success' : 'text-error'">
            {{ tokenInfo.hasToken ? '✅ Sim' : '❌ Não' }}
          </span>
        </div>
        
        <div v-if="tokenInfo.hasToken" class="detail-item">
          <strong>Token expirado:</strong>
          <span :class="tokenInfo.isExpired ? 'text-error' : 'text-success'">
            {{ tokenInfo.isExpired ? '❌ Sim' : '✅ Não' }}
          </span>
        </div>
        
        <div v-if="tokenInfo.decoded" class="detail-item">
          <strong>Payload do Token:</strong>
          <pre>{{ JSON.stringify(tokenInfo.decoded, null, 2) }}</pre>
        </div>
        
        <div v-if="tokenInfo.rawToken" class="detail-item">
          <strong>Token (primeiros 100 caracteres):</strong>
          <code class="token-raw">{{ tokenInfo.rawToken }}</code>
        </div>
      </div>
    </div>
    
    <!-- Informações do Tenant -->
    <div class="tenant-info">
      <h2>🏢 Informações do Tenant</h2>
      <div class="info-grid">
        <div class="info-item">
          <strong>Nome:</strong>
          <span>{{ tenantName }}</span>
        </div>
        <div class="info-item">
          <strong>Subdomínio:</strong>
          <span>{{ subdomain }}</span>
        </div>
        <div class="info-item">
          <strong>API URL:</strong>
          <span>{{ apiUrl }}</span>
        </div>
        <div class="info-item">
          <strong>API Base URL:</strong>
          <span>{{ apiBaseUrl }}</span>
        </div>
      </div>
    </div>
    
    <!-- Teste de requisição autenticada -->
    <div class="api-test">
      <h2>🧪 Testar Requisição Autenticada</h2>
      <p class="info-text">
        Faça uma requisição para testar se o token está sendo enviado corretamente.
      </p>
      
      <div class="test-controls">
        <input 
          v-model="testEndpoint" 
          type="text" 
          placeholder="/materias"
          class="endpoint-input"
        >
        <button 
          @click="testApiRequest" 
          :disabled="testLoading"
          class="btn-primary"
        >
          {{ testLoading ? 'Testando...' : 'Testar GET' }}
        </button>
      </div>
      
      <div v-if="testResult" class="test-result">
        <h3>Resultado:</h3>
        <div class="result-status" :class="testResult.success ? 'success' : 'error'">
          {{ testResult.success ? '✅ Sucesso' : '❌ Erro' }}
        </div>
        <div class="result-url">
          <strong>URL:</strong> {{ testResult.url }}
        </div>
        <div v-if="testResult.data" class="result-data">
          <strong>Resposta:</strong>
          <pre>{{ JSON.stringify(testResult.data, null, 2) }}</pre>
        </div>
        <div v-if="testResult.error" class="result-error">
          <strong>Erro:</strong> {{ testResult.error }}
        </div>
      </div>
    </div>
    
    <!-- Instruções -->
    <div class="instructions">
      <h2>📖 Como Funciona</h2>
      <ol>
        <li>Ao carregar a aplicação, é feita automaticamente uma chamada para <code>GET /api/external/access</code></li>
        <li>O token retornado é salvo no <code>localStorage</code> com a chave <code>auth_token</code></li>
        <li>O Axios é configurado para adicionar o token automaticamente em todas as requisições</li>
        <li>Todas as chamadas subsequentes incluirão: <code>Authorization: Bearer {token}</code></li>
      </ol>
      
      <h3>Verificar no Console</h3>
      <p>Abra o DevTools e veja os logs:</p>
      <ul>
        <li>🌐 API Request - Todas as requisições</li>
        <li>✅ API Response - Todas as respostas</li>
        <li>✅ Token de acesso externo obtido com sucesso</li>
      </ul>
      
      <h3>Verificar no localStorage</h3>
      <p>Execute no console do navegador:</p>
      <pre>localStorage.getItem('auth_token')</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useTenant } from '@/composables/useTenant'
import { 
  hasToken, 
  getToken, 
  isTokenExpired, 
  decodeToken 
} from '@/utils/auth-token'
import api from '@/config/axios'

// Auth
const { isAuthenticated, user, token, loading, logout } = useAuth()

// Tenant
const { tenantName, subdomain, apiUrl, apiBaseUrl } = useTenant()

// Token check
const tokenInfo = ref(null)

// API test
const testEndpoint = ref('/materias')
const testLoading = ref(false)
const testResult = ref(null)

async function handleLogout() {
  if (!confirm('Deseja realmente fazer logout?')) return
  
  try {
    await logout()
    alert('Logout realizado com sucesso!')
    window.location.reload()
  } catch (error) {
    alert('Erro ao fazer logout: ' + error.message)
  }
}

function checkToken() {
  const currentToken = getToken()
  
  tokenInfo.value = {
    hasToken: hasToken(),
    isExpired: currentToken ? isTokenExpired(currentToken) : null,
    decoded: currentToken ? decodeToken(currentToken) : null,
    rawToken: currentToken ? currentToken.substring(0, 100) + '...' : null
  }
}

async function testApiRequest() {
  testLoading.value = true
  testResult.value = null
  
  try {
    const data = await api.get(testEndpoint.value)
    
    testResult.value = {
      success: true,
      url: apiBaseUrl.value + testEndpoint.value,
      data: data
    }
  } catch (error) {
    testResult.value = {
      success: false,
      url: apiBaseUrl.value + testEndpoint.value,
      error: error.message,
      data: error.data
    }
  } finally {
    testLoading.value = false
  }
}
</script>

<style scoped>
.auth-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.auth-status,
.token-check,
.tenant-info,
.api-test,
.instructions {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #1f2937;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

h3 {
  color: #4b5563;
  margin-top: 20px;
}

.loading {
  color: #3b82f6;
  font-size: 1.1rem;
  text-align: center;
  padding: 20px;
}

.status-badge {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 15px;
}

.status-badge.success {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.error {
  background: #fee2e2;
  color: #991b1b;
}

.token-display {
  background: #f3f4f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}

.token-display code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  word-break: break-all;
}

.user-info {
  margin-top: 20px;
}

pre {
  background: #1f2937;
  color: #f3f4f6;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
}

.btn-logout,
.btn-primary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-logout {
  background: #ef4444;
  color: white;
  margin-top: 15px;
}

.btn-logout:hover {
  background: #dc2626;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-text {
  color: #6b7280;
  line-height: 1.6;
}

.token-details {
  margin-top: 20px;
}

.detail-item {
  margin-bottom: 15px;
  padding: 15px;
  background: #f9fafb;
  border-radius: 6px;
}

.detail-item strong {
  display: block;
  margin-bottom: 8px;
  color: #374151;
}

.text-success {
  color: #059669;
  font-weight: 600;
}

.text-error {
  color: #dc2626;
  font-weight: 600;
}

.token-raw {
  display: block;
  background: #1f2937;
  color: #f3f4f6;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  word-break: break-all;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.info-item {
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}

.info-item strong {
  display: block;
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 5px;
}

.info-item span {
  color: #1f2937;
  font-weight: 500;
  word-break: break-all;
}

.test-controls {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.endpoint-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.test-result {
  margin-top: 20px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.result-status {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.result-status.success {
  background: #d1fae5;
  color: #065f46;
}

.result-status.error {
  background: #fee2e2;
  color: #991b1b;
}

.result-url,
.result-data,
.result-error {
  margin-bottom: 15px;
}

.result-error {
  color: #dc2626;
  font-weight: 500;
}

.instructions ol,
.instructions ul {
  line-height: 1.8;
  color: #4b5563;
}

.instructions code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  color: #dc2626;
}

.instructions pre {
  margin-top: 8px;
}
</style>
