# Daily Diet - Backend

API em Node.js + Express + Prisma (SQLite).

## Como rodar
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

## Autenticação
`POST /users` e `POST /login` devolvem o usuário (com `id`).
Nas demais rotas envie o header `x-user-id: <id>`.

## Rotas
| Método | Rota | Descrição |
|---|---|---|
| POST | /users | Criar usuário |
| POST | /login | Identificar usuário pelo e-mail |
| POST | /meals | Registrar refeição |
| GET | /meals | Listar refeições do usuário |
| GET | /meals/:id | Ver uma refeição |
| PUT | /meals/:id | Editar refeição |
| DELETE | /meals/:id | Apagar refeição |
| GET | /metrics | Métricas do usuário |
