<div align="center">

# 💜 InteliCob

### Organização inteligente de passivos

*Um CRM de cobrança feito para transformar planilhas soltas em controle de verdade.*

<br/>

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-FFC700?style=for-the-badge)
![Projeto em equipe](https://img.shields.io/badge/projeto-em%20equipe-a717eb?style=for-the-badge)
![License](https://img.shields.io/badge/licença-MIT-00e8ff?style=for-the-badge)

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

---

## ✨ Sobre o InteliCob

Cobrança bem feita não é sobre perseguir gente — é sobre **organização**. O InteliCob nasceu como Projeto Integrador do bootcamp da **Generation Brasil**: um sistema de **CRM (Customer Relationship Management) focado em gerenciamento de inadimplência**, projetado para gerir clientes, histórico de cobranças e negociações de débitos de forma eficiente.

Esse é o repositório do **front-end** — a cara do sistema. Ele conversa com a [API REST do backend](../crm_cobranca) e entrega uma experiência diferente pra cada tipo de usuário: quem é administrador enxerga o CRM inteiro; quem é operador vê só o que é seu.

> 🚧 **Este projeto está em desenvolvimento ativo.** Novas funcionalidades, telas e ajustes chegam com frequência — se você chegou aqui explorando, fique à vontade pra bisbilhotar o código.

---

## 🎯 Objetivo do projeto

O principal objetivo do InteliCob é centralizar e otimizar o fluxo de trabalho de uma equipe de cobrança: acompanhar dívidas em aberto, organizá-las por categoria e responsável, e dar visibilidade diferente pra quem administra o sistema e pra quem opera no dia a dia — sem depender de planilhas soltas.

---

## 🔥 O que já dá pra fazer

| | |
|---|---|
| 🔐 | Login e cadastro com controle de sessão persistente |
| 👑 | Dois perfis de acesso — **Admin** e **User** — cada um vendo só o que faz sentido pra ele |
| 💰 | Cadastro completo de cobranças: valor, status, categoria e responsável |
| 🔎 | Filtros de busca por status, categoria, CPF e usuário |
| 🗂️ | Gestão de categorias de dívida |
| 🙋 | Perfil próprio editável |
| 👥 | Painel de usuários (visão exclusiva do admin) |

---

## 🧰 Stack

```
Front-end   →  React 19 + TypeScript + Vite
Estilo      →  Tailwind CSS 4
Rotas       →  React Router DOM 7
HTTP        →  Axios
UX extra    →  React Toastify · React Spinners · React Icons
```

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── categoria/       → listar, cadastrar, editar, deletar categorias
│   ├── produto/          → listar, cadastrar, editar, deletar cobranças
│   ├── perfil/            → visualizar, editar e deletar o próprio perfil
│   ├── usuario/          → listagem de usuários (somente admin)
│   ├── navbar/
│   └── footer/
├── pages/
│   ├── home/
│   ├── login/
│   └── cadastro/
├── contexts/
│   └── AuthContext.tsx   → sessão do usuário, persistida em localStorage
├── routes/
│   ├── RotaProtegida.tsx → exige apenas login
│   └── RotaAdmin.tsx      → exige login + perfil admin
├── models/                → tipos TypeScript espelhando as entidades da API
├── services/
│   └── Service.ts         → funções genéricas de consumo da API
└── utils/
```

---

## 🔐 Como funciona o controle de acesso

A API de login não devolve o tipo do usuário — então, logo depois de autenticar, o front faz uma segunda chamada pra descobrir se quem entrou é `admin` ou `user`. A partir daí:

- Rotas de editar/excluir cobrança, categoria e a lista de usuários exigem admin.
- Cards de listagem só mostram ações de editar/deletar pra quem tem permissão.
- Um `user` comum só vê as cobranças atribuídas a ele mesmo.

> Vale lembrar: isso protege a **interface**. A validação completa de papéis também precisa existir do lado da API.

---

## 🛑 Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de que possui:

1. **Node.js 18+** instalado.
2. O [backend](../crm_cobranca) rodando (local ou apontando pro ambiente publicado).
3. Um editor de código de sua preferência (VS Code é o mais usado pelo time).

---

## 🚀 Como rodar a aplicação localmente

1. **Clonar este repositório:**

   ```bash
   git clone https://github.com/crmprojetointegrador/crm_front.git
   ```

2. **Instalar as dependências:**

   ```bash
   npm install
   ```

3. **Conferir a URL da API:**

   A URL do backend fica definida em `src/services/Service.ts`. Ajuste ali se for apontar pra um backend diferente (local vs. produção).

4. **Rodar o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   Acesse **http://localhost:5173** 🎉

5. **Build de produção** (quando for publicar):

   ```bash
   npm run build
   ```

---

## 🔮 Próximos passos

Ideias no radar pra evoluir o projeto:

- 🖼️ Foto de perfil
- 📞 Painel de histórico de contato com o devedor
- 📊 Dashboard com métricas de recuperação
- 💳 Parcelamento e juros no detalhe da dívida
- 🔔 Notificações automáticas de vencimento

---

## 🤝 Equipe de Desenvolvimento

- **Alanis Santos** — [GitHub](https://github.com/alanis-santos) · [LinkedIn](https://www.linkedin.com/in/devalanissantos/)
- **Bruna Mendes** — [GitHub](https://github.com/bruna-dsmendes) · [LinkedIn](https://www.linkedin.com/in/devbrunamendes/)
- **Eliane Orlandin** — [GitHub](https://github.com/Eliane-orlandin) · [LinkedIn](https://www.linkedin.com/in/elianeorlandindocarmo/)
- **Flame Souza** — [GitHub](https://github.com/PraFlame) · [LinkedIn](https://www.linkedin.com/in/souflame/)

<div align="center">

Feito com 💜 por essa equipe, durante o bootcamp da **Generation Brasil**.

</div>
