<template>
  <div class="exemplo-tenant">
    <!-- Header com dados do tenant -->
    <header class="tenant-header" :style="{ backgroundColor: primaryColor }">
      <img :src="brasao" :alt="`Brasão de ${tenantName}`" class="brasao" />
      <div>
        <h1>{{ tenantFullName }}</h1>
        <p>Bem-vindo ao sistema {{ tenantName }}</p>
      </div>
      <img :src="logo" alt="Logo" class="logo" />
    </header>

    <!-- Informações do tenant -->
    <section class="tenant-info">
      <h2>Informações do Tenant Atual</h2>
      <dl>
        <dt>ID do Tenant:</dt>
        <dd>{{ tenantId }}</dd>

        <dt>Nome Curto:</dt>
        <dd>{{ tenantName }}</dd>

        <dt>Nome Completo:</dt>
        <dd>{{ tenantFullName }}</dd>

        <dt>Subdomínio:</dt>
        <dd>{{ subdomain }}</dd>

        <dt>URL da API:</dt>
        <dd>{{ apiUrl }}</dd>

        <dt>Base URL da API:</dt>
        <dd>{{ apiBaseUrl }}</dd>

        <dt>Cor Primária:</dt>
        <dd>
          <span class="color-sample" :style="{ backgroundColor: primaryColor }"></span>
          {{ primaryColor }}
        </dd>

        <dt>Logo:</dt>
        <dd>{{ logo }}</dd>

        <dt>Brasão:</dt>
        <dd>{{ brasao }}</dd>
      </dl>
    </section>

    <!-- Features habilitadas -->
    <section class="tenant-features">
      <h2>Features Habilitadas</h2>
      <ul>
        <li v-for="(enabled, feature) in features" :key="feature">
          <span :class="enabled ? 'enabled' : 'disabled'">
            {{ enabled ? '✓' : '✗' }}
          </span>
          {{ feature }}
        </li>
      </ul>
    </section>

    <!-- Exemplo de requisição à API -->
    <section class="tenant-api-example">
      <h2>Exemplo de Requisição à API</h2>
      <button @click="testarRequisicao">Testar Requisição</button>
      <pre v-if="apiResponse">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </section>

    <!-- Renderização condicional por feature -->
    <section v-if="isFeatureEnabled('analytics')" class="analytics">
      <h2>Analytics Dashboard</h2>
      <p>Esta seção só aparece se a feature 'analytics' estiver habilitada.</p>
    </section>

    <section v-if="isFeatureEnabled('advancedReports')" class="reports">
      <h2>Relatórios Avançados</h2>
      <p>Esta seção só aparece se a feature 'advancedReports' estiver habilitada.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTenant } from '@/composables/useTenant'

// Obtém todas as informações do tenant
const {
  tenantId,
  tenantName,
  tenantFullName,
  subdomain,
  apiUrl,
  apiBaseUrl,
  theme,
  primaryColor,
  logo,
  brasao,
  features,
  buildApiUrl,
  isFeatureEnabled,
} = useTenant()

// Estado para demonstração de requisição à API
const apiResponse = ref(null)

/**
 * Exemplo de como fazer uma requisição à API do tenant
 */
async function testarRequisicao() {
  try {
    // Monta a URL completa usando o helper buildApiUrl
    const url = buildApiUrl('/materias')
    
    console.log('Fazendo requisição para:', url)
    
    const response = await fetch(url)
    const data = await response.json()
    
    apiResponse.value = data
  } catch (error) {
    console.error('Erro na requisição:', error)
    apiResponse.value = { error: error.message }
  }
}

/**
 * Exemplo usando serviços (recomendado)
 * 
 * Em vez de usar fetch diretamente, prefira usar os serviços
 * que já estão configurados para usar o tenant correto:
 * 
 * import { materiasService } from '@/services/api'
 * const materias = await materiasService.listar()
 */
</script>

<style scoped>
.exemplo-tenant {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tenant-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  color: white;
  margin-bottom: 30px;
}

.brasao,
.logo {
  height: 60px;
  object-fit: contain;
}

.tenant-info,
.tenant-features,
.tenant-api-example,
.analytics,
.reports {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

dl {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 10px;
}

dt {
  font-weight: bold;
  color: #555;
}

dd {
  margin: 0;
  color: #333;
}

.color-sample {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
  vertical-align: middle;
  border: 1px solid #ddd;
}

.tenant-features ul {
  list-style: none;
  padding: 0;
}

.tenant-features li {
  padding: 8px;
  margin: 4px 0;
  background: #f9fafb;
  border-radius: 4px;
}

.enabled {
  color: #10b981;
  font-weight: bold;
}

.disabled {
  color: #ef4444;
  font-weight: bold;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #2563eb;
}

pre {
  background: #1f2937;
  color: #10b981;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin-top: 10px;
}

.analytics,
.reports {
  background: #ecfdf5;
  border-left: 4px solid #10b981;
}
</style>
