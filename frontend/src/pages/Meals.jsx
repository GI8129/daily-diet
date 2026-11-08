import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import MealCard from '../components/MealCard.jsx'
import { IconLeaf, IconPlus } from '../components/Icons.jsx'
import { dayKey, dayLabel } from '../utils/date.js'

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [filter, setFilter] = useState('all') // all | in | out
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMeals() {
      try {
        const { data } = await api.get('/meals')
        setMeals(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    loadMeals()
  }, [])

  const totalOnDiet = meals.filter((m) => m.isOnDiet).length
  const totalOffDiet = meals.length - totalOnDiet

  const visible = meals.filter((meal) => {
    if (filter === 'in') return meal.isOnDiet
    if (filter === 'out') return !meal.isOnDiet
    return true
  })

  // Agrupa as refeições por dia (a API já devolve da mais recente para a mais antiga)
  const groups = []
  for (const meal of visible) {
    const key = dayKey(meal.eatenAt)
    const last = groups[groups.length - 1]
    if (last && last.key === key) last.meals.push(meal)
    else groups.push({ key, meals: [meal] })
  }

  return (
    <section>
      <div className="page-title">
        <h2>Minhas refeições</h2>
        <Link to="/meals/new" className="btn btn-primary btn-new">
          <IconPlus width={18} height={18} /> Nova refeição
        </Link>
      </div>

      {!loading && !error && meals.length > 0 && (
        <div className="summary">
          <div className="card summary-item">
            <strong>{meals.length}</strong>
            <span>Total</span>
          </div>
          <div className="card summary-item in">
            <strong>{totalOnDiet}</strong>
            <span>Dentro</span>
          </div>
          <div className="card summary-item out">
            <strong>{totalOffDiet}</strong>
            <span>Fora</span>
          </div>
        </div>
      )}

      {meals.length > 0 && (
        <div className="filters">
          <button className={filter === 'all' ? 'chip active' : 'chip'} onClick={() => setFilter('all')}>
            Todas
          </button>
          <button className={filter === 'in' ? 'chip active' : 'chip'} onClick={() => setFilter('in')}>
            Dentro da dieta
          </button>
          <button className={filter === 'out' ? 'chip active' : 'chip'} onClick={() => setFilter('out')}>
            Fora da dieta
          </button>
        </div>
      )}

      {loading && (
        <div className="meal-list">
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      )}

      {error && <p className="alert alert-error">{error}</p>}

      {!loading && !error && meals.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">
            <IconLeaf width={32} height={32} />
          </span>
          <h3>Nenhuma refeição ainda</h3>
          <p className="muted">Registre sua primeira refeição para começar a acompanhar sua dieta.</p>
          <Link to="/meals/new" className="btn btn-primary">Cadastrar primeira refeição</Link>
        </div>
      )}

      {!loading && !error && meals.length > 0 && visible.length === 0 && (
        <p className="empty">Nenhuma refeição neste filtro.</p>
      )}

      {groups.map((group) => (
        <div key={group.key} className="day-group">
          <h3 className="day-title">{dayLabel(group.key)}</h3>
          <div className="meal-list">
            {group.meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
