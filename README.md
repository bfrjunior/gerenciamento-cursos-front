# Sistema de Gerenciamento de Cursos - Frontend

Sistema web para gerenciamento de cursos, alunos e matrículas desenvolvido em React + Vite.

## 🚀 Funcionalidades

- **Gerenciamento de Cursos**: Criar, editar, listar e excluir cursos
- **Gerenciamento de Alunos**: Cadastrar, editar, listar e excluir alunos
- **Sistema de Matrículas**: Matricular e desmatricular alunos em cursos
- **Relatórios**: Visualizar alunos matriculados por curso

## 🛠️ Tecnologias

- React 18
- Vite
- React Router DOM
- Axios
- CSS3

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- API Backend rodando em `https://localhost:7238/api`

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd gerenciamento-cursos-front
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API no arquivo `src/api/apiService.js` se necessário:
```javascript
const BASE_URL = 'https://localhost:7238/api';
```

## ▶️ Executando o projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── api/
│   ├── pages/
│   │   ├── Alunos/
│   │   │   ├── AlunoForm.jsx
│   │   │   └── AlunosPage.jsx
│   │   ├── Cursos/
│   │   │   ├── CursoForm.jsx
│   │   │   └── CursosPage.jsx
│   │   └── Matriculas/
│   │       └── MatriculasPage.jsx
│   └── apiService.js
├── assets/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 🌐 Rotas

- `/` - Página inicial
- `/cursos` - Gerenciamento de cursos
- `/alunos` - Gerenciamento de alunos
- `/matriculas` - Matrículas e relatórios

## 🔗 API Endpoints

O frontend consome os seguintes endpoints da API:

- `GET/POST/PUT/DELETE /api/cursos` - Gerenciamento de cursos
- `GET/POST/PUT/DELETE /api/alunos` - Gerenciamento de alunos
- `POST/DELETE /api/matriculas` - Gerenciamento de matrículas
- `GET /api/relatorios/alunos-por-curso/{cursoId}` - Relatórios

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request