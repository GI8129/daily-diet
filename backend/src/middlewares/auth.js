import { prisma } from '../lib/prisma.js'

/**
 * Identifica o usuário em cada requisição pelo header "x-user-id".
 * O id é devolvido pelas rotas POST /users e POST /login.
 */
export async function auth(req, res, next) {
  const userId = req.headers['x-user-id']

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não identificado. Envie o header x-user-id.' })
  }

  const user = await prisma.user.findUnique({ where: { id: String(userId) } })

  if (!user) {
    return res.status(401).json({ error: 'Usuário inválido.' })
  }

  req.userId = user.id
  next()
}
