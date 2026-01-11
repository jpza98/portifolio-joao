# Portfólio - João Pedro Zimiani Ancioto

Portfólio moderno desenvolvido com **Tailwind CSS** e **SCSS**, com tema preto e vermelho.

## 🚀 Tecnologias

- **Tailwind CSS** - Framework CSS utility-first
- **SCSS** - Pré-processador CSS
- **JavaScript** - Interatividade
- **Font Awesome** - Ícones

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Compile o CSS:
```bash
npm run build
```

3. Para desenvolvimento com watch:
```bash
npm run dev
```

## 🎨 Estrutura

```
├── index.html          # HTML principal
├── script.js           # JavaScript
├── styles.css          # CSS compilado (gerado)
├── src/
│   └── styles/
│       └── main.scss   # SCSS global com Tailwind
├── images/             # Imagens do portfólio
├── tailwind.config.js  # Configuração do Tailwind
├── postcss.config.js   # Configuração do PostCSS
└── package.json        # Dependências e scripts
```

## 🛠️ Scripts Disponíveis

- `npm run build` - Compila o CSS para produção
- `npm run dev` - Modo desenvolvimento com watch
- `npm run build-css` - Compila apenas o CSS
- `npm start` - Inicia servidor local (porta 8000)
- `npm run serve` - Inicia servidor local com Python (porta 8000)

## 🚀 Como Rodar o Projeto

### Opção 1: Abrir diretamente no navegador
1. Abra o arquivo `index.html` no seu navegador (duplo clique)

### Opção 2: Usar servidor local (Recomendado)

**Com Node.js:**
```bash
npm install
npm start
```

**Com Python:**
```bash
npm run serve
```

**Com scripts criados:**
- Windows: Execute `start.bat`
- PowerShell: Execute `.\start.ps1`

O projeto estará disponível em: **http://localhost:8000**

## 📝 Personalização

### Cores (Tailwind Config)
As cores podem ser ajustadas em `tailwind.config.js`:
- `primary`: #dc2626 (vermelho)
- `primary-dark`: #b91c1c
- `secondary`: #ef4444

### Estilos Globais (SCSS)
Os estilos globais estão em `src/styles/main.scss`:
- Variáveis SCSS
- Animações customizadas
- Classes utilitárias
- Scrollbar personalizada

## 📸 Adicionar Foto

1. Coloque sua foto em `images/foto.jpg`
2. Formatos suportados: jpg, jpeg, png, webp
3. Recarregue a página

## 🌐 Deploy

O portfólio pode ser hospedado em:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3**

Certifique-se de executar `npm run build` antes do deploy.

---

**Desenvolvido com ❤️ usando Tailwind CSS e SCSS**
