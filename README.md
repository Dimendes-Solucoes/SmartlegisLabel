# SmartLegis Label

Sistema de Apoio ao Processo Legislativo para Câmaras Municipais.

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool e dev server
- **Vue Router** - Gerenciamento de rotas
- **Pinia** - Gerenciamento de estado
- **Tailwind CSS v4** - Framework CSS utilitário
- **PostCSS** - Processamento de CSS

## 📋 Funcionalidades

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
├── router/          # Configuração de rotas
├── stores/          # Stores do Pinia
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
