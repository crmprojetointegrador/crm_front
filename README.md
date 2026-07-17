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

### 👤 Personas

- **Administrador (`admin`)**: gerencia todo o cadastro de dívidas e categorias, com poder de edição/exclusão sobre os dados de qualquer usuário.
- **Usuário comum (`user`)**: consulta e cadastra registros, mas não pode alterar ou excluir dados de terceiros — só enxerga e mantém as cobranças atribuídas a si mesmo.

---

## 🔥 O que já dá pra fazer

| | |
|---|---|
| 🔐 | Login (JWT) e cadastro de conta, com sessão persistente |
| 👑 | Dois perfis de acesso — **Admin** e **User** — cada um vendo só o que faz sentido pra ele |
| 💰 | CRUD completo de cobranças (Produtos): nome, valor do débito, data, status, categoria e responsável |
| 🚦 | Status de cobrança: `Pago`, `Em acordo`, `Em atraso` ou `Sem negociação` |
| 🔎 | Filtros de busca por status, categoria, CPF e ID de usuário |
| 🗂️ | CRUD completo de categorias de dívida (nome e descrição) |
| 🙋 | Visualização e edição do próprio perfil |
| 🧾 | Exclusão da própria conta — **bloqueada automaticamente se houver cobranças vinculadas ao usuário**, evitando que dívidas sejam apagadas junto |
| 👥 | Painel de usuários (visão exclusiva do admin), com busca por nome/CPF e detalhamento das cobranças de cada um |
| ℹ️ | Página institucional "Sobre nós" com a apresentação da equipe |
| 🔔 | Notificações (toast) de sucesso/erro em todas as ações de CRUD |
| 📱 | Interface totalmente responsiva: tabelas de listagem (usuários, cobranças, categorias) viram cards empilhados no celular, e formulários se ajustam para telas pequenas |

---

## 🧰 Stack

```
Front-end   →  React 19 + TypeScript + Vite
Estilo      →  Tailwind CSS 4
Rotas       →  React Router DOM 7
HTTP        →  Axios
UX extra    →  React Toastify · React Spinners · React Icons
```

Esse front conversa com um backend próprio ([`projeto-integrador`](../projeto-integrador)), construído em:

```
API          →  Java 17 + Spring Boot 3.5.14 + Spring Data JPA
Segurança    →  Spring Security + JWT (jjwt 0.12.6)
Banco        →  MySQL / MariaDB via Hibernate
Docs de API  →  Swagger / OpenAPI 3
Deploy       →  Docker, com perfis dev/prod separados
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

## 🗺️ Mapa de rotas

| Rota | Componente | Proteção |
|---|---|---|
| `/` | Home | pública |
| `/login` | Login | pública |
| `/cadastro` | Cadastro | pública |
| `/about` | About | pública |
| `/produtos` | ListarProdutos | autenticado |
| `/cadastrarproduto` | FormProduto | autenticado |
| `/editarproduto/:id` | FormProduto | admin |
| `/deletarproduto/:id` | DeletarProduto | admin |
| `/categorias` | ListaCategoria | autenticado |
| `/cadastrarcategoria` | FormCategoria | autenticado |
| `/editarcategoria/:id` | FormCategoria | admin |
| `/deletarcategoria/:id` | DeletarCategoria | admin |
| `/usuarios` | ListarUsuarios | admin |
| `/perfil` | Perfil | autenticado |
| `/editarperfil` | FormPerfil | autenticado |
| `/deletarperfil` | DeletarPerfil | autenticado |

---

## 🔐 Como funciona o controle de acesso

A API de login não devolve o tipo do usuário — então, logo depois de autenticar, o front faz uma segunda chamada pra descobrir se quem entrou é `admin` ou `user`. A partir daí:

- `RotaProtegida` exige apenas que exista um usuário autenticado (token válido).
- `RotaAdmin` exige, além do login, que o `tipo` do usuário seja `admin`.
- Rotas de editar/excluir cobrança, categoria e a lista de usuários exigem admin.
- Cards de listagem só mostram ações de editar/deletar pra quem tem permissão.
- Um `user` comum só vê as cobranças atribuídas a ele mesmo.

### 🧾 Proteção contra exclusão de usuário com dívidas em aberto

Antes de permitir que alguém apague a própria conta, o front busca todas as cobranças (`/produtos`) e verifica se existe alguma vinculada a esse usuário:

- **Se houver cobranças vinculadas**, a exclusão fica bloqueada — o botão de confirmação é desabilitado e uma mensagem explica que é preciso remover ou transferir as dívidas pendentes antes.
- **Se não houver nenhuma**, a exclusão segue normalmente.

> Vale lembrar: tudo isso protege a **interface**. A validação completa de papéis — e a trava de exclusão com dívidas vinculadas — também precisa existir do lado da API (veja em "Próximos passos").

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

Ideias no radar pra evoluir o projeto, organizadas por frente:

### 📄 Listagens e performance
- **Paginação na página de Cobranças (Produtos)**: hoje a listagem carrega todos os registros de uma vez, o que não escala bem com grandes volumes de dívidas — a paginação vai trazer os dados em blocos, melhorando o tempo de carregamento e a experiência de navegação.

### 🏛️ Papéis e governança
- **Atendente/Backoffice**: cadastra a dívida e registra os contatos, mas não altera status sozinho.
- **Admin**: aprova mudanças de status, gerencia usuários, vê tudo.
- **Supervisor** (papel intermediário): acompanha metas do time sem ter todos os poderes de admin — comum em operações de cobrança reais, onde o admin do sistema raramente é quem opera no dia a dia.
- **Trilha de auditoria**: registro de quem alterou o quê e quando (status, valor, categoria) — essencial em cobrança porque decisões financeiras precisam ser rastreáveis, inclusive por exigência legal.

### 💰 Dívida mais fiel à realidade
- Parcelas, taxa de juros, multa por atraso, valor original vs. valor atualizado.
- Histórico de renegociação: cada proposta feita, aceita ou recusada — não só o status final.
- Anexos: comprovante de pagamento, contrato, print de acordo.
- Data de vencimento por parcela, não só uma data única.

### 🗄️ Estruturação de backend
- Trazer a entidade **Cliente** para a estrutura principal do projeto (hoje existe apenas em uma branch de testes, nunca chegou a ser integrada) — é o que falta para separar de fato quem é o devedor de quem opera o CRM.
- Registro de informações de contato vinculado ao Cliente (telefone, e-mail, endereço, histórico de interações), servindo de base para o painel de relacionamento citado acima.
- **Bloquear no backend a exclusão de um usuário que possua cobranças (Produtos) vinculadas** — hoje o relacionamento Usuario 1:N Produto permite apagar o usuário e perder as dívidas junto; o front já bloqueia essa ação na tela de exclusão de conta, mas essa regra precisa existir também na API (endpoint de exclusão de usuário), para não depender só da validação client-side.

### 📞 Relacionamento com o cliente
- Timeline de interações: ligação, e-mail, WhatsApp, com resultado de cada uma ("sem resposta", "prometeu pagar dia X", "recusou acordo").
- Agendamento de próximo contato (follow-up automático aparecendo pra quem é responsável).
- Campo de observações livres por contato, visível pro time todo.

### ⚙️ Automação
- Notificações automáticas por e-mail/WhatsApp quando uma parcela vence ou fica em atraso.
- Geração de boleto/PIX direto na negociação (integração com gateway de pagamento).
- Score de propensão a pagar, baseado em histórico — um possível próximo passo com IA/ML.

### 📊 Dashboard e métricas
- Taxa de recuperação por período/categoria.
- Aging de dívida (quanto está há 30/60/90+ dias em atraso) — métrica clássica de cobrança.
- Ranking de desempenho por atendente/operador.

### 🛡️ Compliance
- Regras de horário permitido pra contato (regulamentação de cobrança no Brasil restringe horários).
- LGPD: consentimento e direito ao esquecimento do devedor.
- Opt-out de comunicação.

### 🙋 Self-service pro devedor
- Portal (ou até chatbot) onde o próprio devedor consulta a dívida e negocia sozinho, sem precisar de atendente.

### 🖼️ Outros
- Foto de perfil (com armazenamento adequado no back-end)

---

## 🤝 Equipe de Desenvolvimento

- **Alanis Santos** — [GitHub](https://github.com/alanis-santos) · [LinkedIn](https://www.linkedin.com/in/devalanissantos/)
- **Bruna Mendes** — [GitHub](https://github.com/bruna-dsmendes) · [LinkedIn](https://www.linkedin.com/in/devbrunamendes/)
- **Eliane Orlandin** — [GitHub](https://github.com/Eliane-orlandin) · [LinkedIn](https://www.linkedin.com/in/elianeorlandindocarmo/)
- **Flame Souza** — [GitHub](https://github.com/PraFlame) · [LinkedIn](https://www.linkedin.com/in/souflame/)

<div align="center">

Feito com 💜 por essa equipe, durante o bootcamp da **Generation Brasil**.

</div>
