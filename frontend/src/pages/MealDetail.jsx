import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import { formatDateTime } from '../utils/date.js'
import { IconBack, IconEdit, IconTrash } from '../components/Icons.jsx'

export default function MealDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMeal() {
      try {
        const { data } = await api.get(`/meals/${id}`)
        setMeal(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    loadMeal()
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Deseja realmente apagar esta refeição?')) return
    try {
      await api.delete(`/meals/${id}`)
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  if (loading) return <div className="skeleton tall" />

  if (!meal) {
    return (
      <section>
        <p className="alert alert-error">{error || 'Refeição não encontrada.'}</p>
        <Link to="/" className="btn btn-outline">
          <IconBack width={18} height={18} /> Voltar
        </Link>
      </section>
    )
  }

  const status = meal.isOnDiet ? 'in' : 'out'

  return (
    <section>
      <div className="page-title">
        <h2>Detalhes da refeição</h2>
      </div>

      <div className={`card detail ${status}`}>
        <span className={`badge badge-${status}`}>
          {meal.isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}
        </span>

        <h3 className="detail-title">{meal.name}</h3>
        <p className="detail-desc">{meal.description}</p>

        <div className="detail-meta">
          <span className="muted">Data e hora</span>
          <strong>{formatDateTime(meal.eatenAt)}</strong>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <div className="actions">
          <Link to={`/meals/${meal.id}/edit`} className="btn btn-primary">
            <IconEdit width={18} height={18} /> Editar
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <IconTrash width={18} height={18} /> Apagar
          </button>
          <Link to="/" className="btn btn-outline">
            <IconBack width={18} height={18} /> Voltar
          </Link>
        </div>
      </div>
    </section>
  )
}
