<template>
  <div class="tenant-demo">
    <!-- Header com informações do tenant -->
    <header class="tenant-header" :style="headerStyle">
      <img :src="logo" :alt="`${tenantName} Logo`" class="tenant-logo">
      <h1>{{ tenantName }}</h1>
      <p class="subdomain">{{ subdomain }}.smartlegis.net.br</p>
    </header>

    <!-- Informações de configuração -->
    <section class="tenant-info">
      <h2>Configuração do Tenant</h2>
      <div class="info-grid">
        <div class="info-item">
          <strong>Tenant ID:</strong>
          <span>{{ tenantId }}</span>
        </div>
        <div class="info-item">
          <strong>API URL:</strong>
          <span>{{ apiUrl }}</span>
        </div>
        <div class="info-item">
          <strong>API Base URL:</strong>
          <span>{{ apiBaseUrl }}</span>
        </div>
        <div class="info-item">
          <strong>Cor Primária:</strong>
          <span>
            <span class="color-box" :style="{ backgroundColor: primaryColor }"></span>
            {{ primaryColor }}
          </span>
        </div>
      </div>
    </section>

    <!-- Features habilitadas -->
    <section class="features-section">
      <h2>Features Habilitadas</h2>
      <div class="features-list">
        <div
          v-for="(enabled, feature) in features"
          :key="feature"
          class="feature-item"
          :class="{ enabled, disabled: !enabled }"
        >
          <span class="feature-icon">{{ enabled ? '✅' : '❌' }}</span>
          <span class="feature-name">{{ feature }}</span>
        </div>
      </div>
    </section>

    <!-- Exemplo de requisição -->
    <section class="api-demo">
      <h2>Teste de API</h2>
      <button @click="testApiRequest" :disabled="loading">
        {{ loading ? 'Carregando...' : 'Testar Requisição' }}
      </button>

      <div v-if="apiResponse" class="api-response">
        <h3>URL Usada:</h3>
        <code>{{ apiResponse.url }}</code>

        <h3>Status:</h3>
        <code :class="apiResponse.success ? 'success' : 'error'">
          {{ apiResponse.success ? 'Sucesso' : 'Erro' }}
        </code>

        <div v-if="apiResponse.error">
          <h3>Erro:</h3>
          <code class="error">{{ apiResponse.error }}</code>
        </div>
      </div>
    </section>

    <!-- Renderização condicional por feature -->
    <section v-if="isFeatureEnabled('analytics')" class="analytics-section">
      <h2>📊 Analytics (Feature Habilitada)</h2>
      <p>Esta seção só aparece para tenants com analytics habilitado.</p>
    </section>

    <section v-if="isFeatureEnabled('advancedReports')" class="reports-section">
      <h2>📈 Relatórios Avançados (Feature Habilitada)</h2>
      <p>Esta seção só aparece para tenants com relatórios avançados habilitados.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTenant, useTenantApi } from '@/composables/useTenant'

const {
  tenantId,
  tenantName,
  subdomain,
  apiUrl,
  apiBaseUrl,
  theme,
  primaryColor,
  logo,
  features,
  isFeatureEnabled,
} = useTenant()

const api = useTenantApi()

const loading = ref(false)
const apiResponse = ref(null)

const headerStyle = computed(() => ({
  backgroundColor: primaryColor.value,
  color: '#ffffff',
}))

async function testApiRequest() {
  loading.value = true
  apiResponse.value = null

  const testUrl = '/test'
  const fullUrl = apiBaseUrl.value + testUrl

  try {

    await api.get(testUrl)

    apiResponse.value = {
      url: fullUrl,
      success: true,
    }
  } catch (error) {
    apiResponse.value = {
      url: fullUrl,
      success: false,
      error: error.message,
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.tenant-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tenant-header {
  text-align: center;
  padding: 40px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tenant-logo {
  height: 80px;
  margin-bottom: 20px;
}

.tenant-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.subdomain {
  opacity: 0.9;
  font-size: 1.1rem;
}

.tenant-info,
.features-section,
.api-demo,
.analytics-section,
.reports-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tenant-info h2,
.features-section h2,
.api-demo h2,
.analytics-section h2,
.reports-section h2 {
  margin-top: 0;
  color: #1f2937;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item strong {
  color: #6b7280;
  font-size: 0.9rem;
}

.info-item span {
  color: #1f2937;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-box {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 2px solid #e5e7eb;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.feature-item {
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.feature-item.enabled {
  background-color: #d1fae5;
  color: #065f46;
}

.feature-item.disabled {
  background-color: #fee2e2;
  color: #991b1b;
}

.feature-icon {
  font-size: 1.2rem;
}

.api-demo button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.api-demo button:hover:not(:disabled) {
  background-color: #2563eb;
}

.api-demo button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.api-response {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
}

.api-response h3 {
  margin: 15px 0 8px 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.api-response code {
  display: block;
  padding: 10px;
  background-color: #1f2937;
  color: #f3f4f6;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
}

.api-response code.success {
  background-color: #065f46;
}

.api-response code.error {
  background-color: #991b1b;
}

.analytics-section,
.reports-section {
  border-left: 4px solid #3b82f6;
}

.analytics-section h2,
.reports-section h2 {
  color: #3b82f6;
}
</style>
