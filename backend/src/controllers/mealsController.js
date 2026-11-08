import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { bestOnDietSequence } from '../utils/bestSequence.js'

const mealSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  description: z.string().trim().min(1, 'Descrição é obrigatória'),
  eatenAt: z.coerce.date({ invalid_type_error: 'Data e hora inválidas' }),
  isOnDiet: z.boolean({ required_error: 'Informe se está dentro da dieta' }),
})

const updateSchema = mealSchema.partial()

// Busca a refeição e aplica a regra de permissão (só o dono acessa).
async function findOwnedMeal(req, res) {
  const meal = await prisma.meal.findUnique({ where: { id: req.params.id } })

  if (!meal) {
    res.status(404).json({ error: 'Refeição não encontrada.' })
    return null
  }

  if (meal.userId !== req.userId) {
    res.status(403).json({ error: 'Você não tem permissão para acessar esta refeição.' })
    return null
  }

  return meal
}

export async function create(req, res) {
  const data = mealSchema.parse(req.body)

  const meal = await prisma.meal.create({
    data: { ...data, userId: req.userId },
  })

  return res.status(201).json(meal)
}

export async function list(req, res) {
  const meals = await prisma.meal.findMany({
    where: { userId: req.userId },
    orderBy: { eatenAt: 'desc' },
  })

  return res.json(meals)
}

export async function show(req, res) {
  const meal = await findOwnedMeal(req, res)
  if (!meal) return

  return res.json(meal)
}

export async function update(req, res) {
  const meal = await findOwnedMeal(req, res)
  if (!meal) return

  const data = updateSchema.parse(req.body)

  const updated = await prisma.meal.update({
    where: { id: meal.id },
    data,
  })

  return res.json(updated)
}

export async function remove(req, res) {
  const meal = await findOwnedMeal(req, res)
  if (!meal) return

  await prisma.meal.delete({ where: { id: meal.id } })

  return res.status(204).send()
}

export async function metrics(req, res) {
  const meals = await prisma.meal.findMany({
    where: { userId: req.userId },
    orderBy: { eatenAt: 'asc' },
  })

  const onDiet = meals.filter((m) => m.isOnDiet).length

  return res.json({
    totalMeals: meals.length,
    totalOnDiet: onDiet,
    totalOffDiet: meals.length - onDiet,
    bestOnDietSequence: bestOnDietSequence(meals),
  })
}
