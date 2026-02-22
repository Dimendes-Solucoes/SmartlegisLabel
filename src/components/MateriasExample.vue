<template>
  <div class="materias-page">
    <!-- Header com informações do tenant -->
    <header class="page-header">
      <h1>Matérias Legislativas - {{ tenantName }}</h1>
      <p class="tenant-info">{{ subdomain }}.smartlegis.net.br</p>
    </header>

    <!-- Filtros -->
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar matéria..."
        @input="handleSearch"
      >
      
      <select v-model="tipoFiltro" @change="handleFilterChange">
        <option value="">Todos os tipos</option>
        <option value="projeto-lei">Projeto de Lei</option>
        <option value="indicacao">Indicação</option>
        <option value="requerimento">Requerimento</option>
      </select>

      <button @click="abrirModalCriar" class="btn-primary">
        Nova Matéria
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      Carregando matérias...
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="error">
      {{ error.message }}
      <button @click="recarregar">Tentar novamente</button>
    </div>

    <!-- Lista de Matérias -->
    <div v-else class="materias-list">
      <div
        v-for="materia in materias"
        :key="materia.id"
        class="materia-card"
      >
        <div class="materia-header">
          <h3>{{ materia.titulo }}</h3>
          <span class="materia-tipo">{{ materia.tipo }}</span>
        </div>
        
        <p class="materia-ementa">{{ materia.ementa }}</p>
        
        <div class="materia-footer">
          <span class="materia-data">
            {{ formatarData(materia.data_apresentacao) }}
          </span>
          
          <div class="materia-actions">
            <button @click="editarMateria(materia)" class="btn-edit">
              Editar
            </button>
            <button @click="deletarMateria(materia.id)" class="btn-delete">
              Excluir
            </button>
            <button @click="anexarDocumento(materia.id)" class="btn-attach">
              Anexar
            </button>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div v-if="totalPages > 1" class="pagination">
        <button
          @click="irParaPagina(page - 1)"
          :disabled="page === 1"
          class="btn-pagination"
        >
          ← Anterior
        </button>

        <span class="page-info">
          Página {{ page }} de {{ totalPages }}
        </span>

        <button
          @click="irParaPagina(page + 1)"
          :disabled="page >= totalPages"
          class="btn-pagination"
        >
          Próxima →
        </button>
      </div>
    </div>

    <!-- Modal de Upload -->
    <div v-if="showUploadModal" class="modal">
      <div class="modal-content">
        <h2>Anexar Documento</h2>
        
        <input
          type="file"
          @change="handleFileSelect"
          accept=".pdf,.doc,.docx"
        >

        <div v-if="uploading" class="upload-progress">
          <div class="progress-bar">
            <div class="progress" :style="{ width: uploadProgress + '%' }">
              {{ uploadProgress }}%
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="fecharModalUpload" :disabled="uploading">
            Cancelar
          </button>
          <button @click="enviarArquivo" :disabled="!arquivoSelecionado || uploading">
            {{ uploading ? 'Enviando...' : 'Enviar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Features condicionais do tenant -->
    <div v-if="isFeatureEnabled('analytics')" class="analytics-section">
      <h2>📊 Analytics</h2>
      <p>Total de matérias: {{ materias.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTenant } from '@/composables/useTenant'
import { usePagination, useFileUpload } from '@/composables/useApi'
import { materiasService } from '@/services/api'

// Tenant info
const { tenantName, subdomain, theme, isFeatureEnabled } = useTenant()

// Estado
const materias = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const tipoFiltro = ref('')
const showUploadModal = ref(false)
const materiaIdParaAnexo = ref(null)
const arquivoSelecionado = ref(null)

// Paginação
const page = ref(1)
const limit = ref(10)
const total = ref(0)
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Upload
const { upload, uploading, progress: uploadProgress } = useFileUpload()

// Carregar matérias
async function carregarMaterias() {
  loading.value = true
  error.value = null

  try {
    const filtros = {
      page: page.value,
      limit: limit.value,
    }

    if (searchQuery.value) {
      filtros.search = searchQuery.value
    }

    if (tipoFiltro.value) {
      filtros.tipo = tipoFiltro.value
    }

    const response = await materiasService.buscarPaginado(filtros)
    
    // Suporta diferentes formatos de resposta da API
    if (response.data && response.total !== undefined) {
      materias.value = response.data
      total.value = response.total
    } else if (Array.isArray(response)) {
      materias.value = response
      total.value = response.length
    }
  } catch (err) {
    error.value = err
    console.error('Erro ao carregar matérias:', err)
  } finally {
    loading.value = false
  }
}

// Busca com debounce
let searchTimeout = null
function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    carregarMaterias()
  }, 500)
}

// Filtro
function handleFilterChange() {
  page.value = 1
  carregarMaterias()
}

// Paginação
function irParaPagina(novaPagina) {
  if (novaPagina >= 1 && novaPagina <= totalPages.value) {
    page.value = novaPagina
    carregarMaterias()
  }
}

// Recarregar
function recarregar() {
  carregarMaterias()
}

// CRUD
function abrirModalCriar() {
  // Implementar modal de criação
  console.log('Abrir modal de criar')
}

function editarMateria(materia) {
  // Implementar edição
  console.log('Editar materia:', materia)
}

async function deletarMateria(id) {
  if (!confirm('Deseja realmente excluir esta matéria?')) return

  try {
    await materiasService.deletar(id)
    materias.value = materias.value.filter(m => m.id !== id)
  } catch (err) {
    alert('Erro ao excluir matéria: ' + err.message)
  }
}

// Upload
function anexarDocumento(materiaId) {
  materiaIdParaAnexo.value = materiaId
  showUploadModal.value = true
}

function fecharModalUpload() {
  showUploadModal.value = false
  materiaIdParaAnexo.value = null
  arquivoSelecionado.value = null
}

function handleFileSelect(event) {
  arquivoSelecionado.value = event.target.files[0]
}

async function enviarArquivo() {
  if (!arquivoSelecionado.value || !materiaIdParaAnexo.value) return

  try {
    await materiasService.anexarDocumento(
      materiaIdParaAnexo.value,
      arquivoSelecionado.value,
      'Documento anexado'
    )
    
    alert('Documento anexado com sucesso!')
    fecharModalUpload()
  } catch (err) {
    alert('Erro ao anexar documento: ' + err.message)
  }
}

// Utilidades
function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}

// Montar componente
onMounted(() => {
  carregarMaterias()
})
</script>

<style scoped>
.materias-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 5px;
}

.tenant-info {
  color: #6b7280;
  font-size: 0.9rem;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.filters input,
.filters select {
  padding: 10px 15px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.filters input {
  flex: 1;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

.materias-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.materia-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

.materia-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.materia-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 15px;
}

.materia-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.materia-tipo {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.materia-ementa {
  color: #4b5563;
  margin-bottom: 15px;
  line-height: 1.5;
}

.materia-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.materia-data {
  color: #9ca3af;
  font-size: 0.9rem;
}

.materia-actions {
  display: flex;
  gap: 10px;
}

.materia-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.materia-actions button:hover {
  opacity: 0.8;
}

.btn-edit {
  background: #10b981;
  color: white;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-attach {
  background: #8b5cf6;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.btn-pagination {
  padding: 10px 20px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-pagination:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-pagination:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #6b7280;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content input[type="file"] {
  margin: 20px 0;
}

.upload-progress {
  margin: 20px 0;
}

.progress-bar {
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.progress {
  background: #3b82f6;
  color: white;
  text-align: center;
  padding: 8px;
  transition: width 0.3s;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.analytics-section {
  margin-top: 40px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}
</style>
