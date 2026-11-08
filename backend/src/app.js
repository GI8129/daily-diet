import express from 'express'
import cors from 'cors'
import { ZodError } from 'zod'
import { routes } from './routes/index.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

// Tratamento central de erros
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido.' })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Dados inválidos.',
      details: err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
    })
  }

  console.error(err)
  return res.status(500).json({ error: 'Erro interno do servidor.' })
})