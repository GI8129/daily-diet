/**
 * Recebe as refeições de um usuário e devolve a maior sequência
 * de refeições consecutivas (em ordem cronológica) dentro da dieta.
 */
export function bestOnDietSequence(meals) {
  const ordered = [...meals].sort((a, b) => new Date(a.eatenAt) - new Date(b.eatenAt))

  let best = 0
  let current = 0

  for (const meal of ordered) {
    if (meal.isOnDiet) {
      current += 1
      if (current > best) best = current
    } else {
      current = 0
    }
  }

  return best
}
