# 🥗 Daily Diet

Projeto fullstack de controle de dieta diária. Cada usuário registra suas refeições, informa se estão dentro ou fora da dieta e acompanha suas métricas.

> Atividade Avaliativa da disciplina **Programação para WEB II** (4º período) — UNITINS
> Docente: Bruno Bandeira Fernandes

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, Express, Prisma ORM, SQLite, Zod, CORS |
| Frontend | React, Vite, React Router, Axios, CSS puro |

## Funcionalidades

- Criar usuário e fazer login pelo e-mail
- Identificação do usuário em todas as requisições
- Registrar, editar, apagar, listar e visualizar refeições (nome, descrição, data e hora, dentro ou fora da dieta)
- Métricas do usuário: total de refeições, total dentro da dieta, total fora da dieta e melhor sequência dentro da dieta
- Permissões: o usuário só visualiza, edita e apaga as refeições que ele criou
- Interface responsiva, com menu inferior no celular e modo escuro automático

## Estrutura do projeto

```
daily-diet/
├── backend/
│   ├── prisma/            # schema do banco e migrations
│   └── src/
│       ├── controllers/   # lógica de cada rota
│       ├── middlewares/   # identificação do usuário (auth)
│       ├── routes/        # definição das rotas
│       ├── lib/           # conexão com o banco (Prisma)
│       └── utils/         # função da melhor sequência
└── frontend/
    └── src/
        ├── components/    # Header, MealCard, MealForm, BottomNav...
        ├── context/       # AuthContext (usuário logado)
        ├── pages/         # Login, Register, Meals, MealDetail, MealEdit, MealCreate, Metrics
        ├── services/      # configuração do Axios
        └── utils/         # funções de data
```

## Como executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) 20.19 ou superior
- npm (já vem com o Node.js)

Os dois servidores precisam rodar ao mesmo tempo, cada um em um terminal.

### 1. Backend (porta 3333)

```bash
cd backend
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
# Windows (PowerShell)
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Crie o banco de dados e inicie a API:

```bash
npx prisma migrate dev --name init
npm run dev
```

A API fica disponível em `http://localhost:3333`.

### 2. Frontend (porta 5173)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

> Para apontar o frontend para outra URL de API, crie `frontend/.env` com `VITE_API_URL=http://localhost:3333`.

## Autenticação

A atividade pede apenas que o usuário seja identificado entre as requisições. Por isso:

1. `POST /users` e `POST /login` devolvem os dados do usuário, incluindo o `id`.
2. O frontend guarda o usuário e envia o `id` no header **`x-user-id`** em todas as demais requisições.
3. O middleware `auth` confere se o usuário existe. Sem o header, ou com um id inválido, a API responde `401`.

## Rotas da API

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/users` | Criar usuário | Não |
| POST | `/login` | Identificar usuário pelo e-mail | Não |
| POST | `/meals` | Registrar refeição | Sim |
| GET | `/meals` | Listar refeições do usuário | Sim |
| GET | `/meals/:id` | Visualizar uma refeição | Sim |
| PUT | `/meals/:id` | Editar refeição | Sim |
| DELETE | `/meals/:id` | Apagar refeição | Sim |
| GET | `/metrics` | Métricas do usuário | Sim |

### Exemplos

Criar usuário:

```json
POST /users
{ "name": "Maria", "email": "maria@email.com" }
```

Registrar refeição (header `x-user-id: <id do usuário>`):

```json
POST /meals
{
  "name": "Almoço",
  "description": "Arroz, feijão e frango",
  "eatenAt": "2026-11-05T12:30:00",
  "isOnDiet": true
}
```

Resposta de `GET /metrics`:

```json
{
  "totalMeals": 7,
  "totalOnDiet": 5,
  "totalOffDiet": 2,
  "bestOnDietSequence": 3
}
```

### Códigos de resposta

| Código | Quando acontece |
|---|---|
| 200 / 201 / 204 | Sucesso (consulta, criação, remoção) |
| 400 | Dados inválidos (campos vazios, e-mail inválido, JSON malformado) |
| 401 | Usuário não identificado ou inválido |
| 403 | Refeição pertence a outro usuário |
| 404 | Refeição ou usuário não encontrado |
| 409 | E-mail já cadastrado |

## Regras de negócio

- Cada refeição pertence a um usuário.
- **Melhor sequência**: maior quantidade de refeições consecutivas dentro da dieta, considerando a ordem cronológica (`eatenAt`). Uma refeição fora da dieta zera a contagem.
- As refeições são listadas da mais recente para a mais antiga.

## Limitações e melhorias futuras

- A identificação por `x-user-id` atende ao enunciado, mas **não é segura para produção**, pois não há senha. Uma versão real usaria senha criptografada e token JWT.
- Adicionar testes automatizados (Vitest e Supertest) para a API.
- Paginação da lista de refeições.
- Confirmação de exclusão com modal e mensagens de sucesso (toasts).

## Autor

Luiz Fernando Barcelos Buzato Neves — luizbarcelos@unitins.br
