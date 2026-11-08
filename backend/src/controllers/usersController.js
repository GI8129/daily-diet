import { z } from 'zod'
import { prisma } from '../lib/prisma.js'

const createSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  email: z.string().trim().toLowerCase().email('E-mail inválido'),
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('E-mail inválido'),
})

export async function create(req, res) {
  const data = createSchema.parse(req.body)

  const exists = await prisma.user.findUnique({ where: { email: data.email } })
  if (exists) {
    return res.status(409).json({ error: 'Já existe um usuário com este e-mail.' })
  }

  const user = await prisma.user.create({ data })
  return res.status(201).json(user)
}

export async function login(req, res) {
  const { email } = loginSchema.parse(req.body)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' })
  }

  return res.json(user)
}
