# SmartLegis Label

Sistema de Apoio ao Processo Legislativo para Câmaras Municipais.

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool e dev server
- **Vue Router** - Gerenciamento de rotas
- **Pinia** - Gerenciamento de estado
- **Axios** - Cliente HTTP para comunicação com APIs
- **Tailwind CSS v4** - Framework CSS utilitário
- **PostCSS** - Processamento de CSS

## 🏢 Sistema Multi-Tenant

O projeto suporta **múltiplos clientes (tenants)** baseado no subdomínio da URL:

- **jc.smartlegis.net.br** → API: `jcapp.smartlegis.net.br`
- **macaiba.smartlegis.net.br** → API: `macaibaapp.smartlegis.net.br`
- **localhost** → Configuração de desenvolvimento

Cada tenant tem suas próprias:
- URLs de API
- Tema personalizado (cores, logo)
- Features habilitadas/desabilitadas

📚 **[Veja o guia completo de Multi-Tenant](./MULTI_TENANT_GUIDE.md)**

## 🌐 Comunicação com API

O projeto usa **Axios** configurado para trabalhar com o sistema multi-tenant:

- ✅ Detecção automática da API baseada no tenant
- ✅ Autenticação automática (JWT)
- ✅ Tratamento de erros padronizado
- ✅ Composables Vue prontos para uso
- ✅ Services organizados por recurso

### Exemplo de Uso

```javascript
import { materiasService } from '@/services/api'

// Listar matérias
const materias = await materiasService.listar()

// Criar nova matéria
const nova = await materiasService.criar({
  titulo: 'Projeto de Lei 123/2026',
  tipo: 'projeto-lei'
})
```

📚 **[Veja o guia completo de Axios](./AXIOS_GUIDE.md)**

## � Autenticação

O sistema possui **autenticação automática** ao iniciar a aplicação:

### Fluxo Automático

1. Ao carregar a página → chama `GET /api/external/access`
2. Token retornado é salvo no `localStorage`
3. Token é adicionado automaticamente em **todas** as requisições
4. Formato: `Authorization: Bearer {token}`

### Uso em Componentes

```javascript
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated, user, logout } = useAuth()

// Verificar se está autenticado
if (isAuthenticated.value) {
  console.log('Usuário:', user.value)
}
```

📚 **[Veja o guia completo de Autenticação](./AUTH_GUIDE.md)**

## �📋 Funcionalidades

O sistema inclui as seguintes seções:

- **Mesa Diretora** - Órgão que conduz as sessões e administra os trabalhos legislativos
- **Comissões** - Grupos de vereadores que analisam matérias
- **Parlamentares** - Vereadores eleitos que representam a população
- **Pautas das Sessões** - Relação das matérias que serão discutidas
- **Sessão Plenária** - Reunião oficial para debates e votações
- **Matérias Legislativas** - Proposições apresentadas na Câmara
- **Normas Jurídicas** - Leis e atos normativos aprovados
- **Relatórios** - Documentos com dados e resultados das atividades

## 🎨 Componentes

### Componentes Base
- `AppHeader.vue` - Cabeçalho com logo e informações da câmara
- `AppFooter.vue` - Rodapé com informações do desenvolvedor
- `ProcessCard.vue` - Card reutilizável com efeito hover para cada processo
- `PageTemplate.vue` - Template base para páginas internas

### Estrutura de Pastas

```
src/
├── assets/          # Estilos globais
├── components/      # Componentes reutilizáveis
├── composables/     # Composables Vue (useTenant, etc)
├── config/          # Arquivos de configuração (tenants, etc)
├── examples/        # Exemplos de uso
├── router/          # Configuração de rotas
├── stores/          # Stores do Pinia
├── utils/           # Funções utilitárias
└── views/           # Páginas da aplicação
```

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js >= 20.19.0 ou >= 22.12.0
- npm

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Pré-visualizar build de produção
npm run preview
```

## 🎯 Próximos Passos

1. **Substituir imagens placeholder** - As imagens SVG em `/public/images/` devem ser substituídas por assets reais
2. **Implementar conteúdo das páginas** - Desenvolver o conteúdo específico de cada seção
3. **Adicionar autenticação** - Implementar sistema de login se necessário
4. **Integração com API** - Conectar com backend para dados dinâmicos
5. **Testes** - Adicionar testes unitários e e2e

## 📝 Personalização

### Cores do Tema

As cores principais estão definidas em `tailwind.config.js`:

```javascript
colors: {
  'brand-blue': '#003d6f',      // Azul principal
  'brand-blue-dark': '#002847',  // Azul escuro
}
```

### Imagens

Substitua as imagens em `/public/images/`:
- `brasao.png` - Brasão da câmara municipal
- `logo-smartlegis.png` - Logo SmartLegis (azul)
- `logo-smartlegis-white.png` - Logo SmartLegis (branco)
- `*.svg` - Ícones de cada processo legislativo

## 📄 Licença

Desenvolvido por SmartLegis - 2026
