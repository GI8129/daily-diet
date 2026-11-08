import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import MealForm from '../components/MealForm.jsx'

export default function MealEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  async function handleSubmit(data) {
    setError('')
    setSaving(true)
    try {
      await api.put(`/meals/${id}`, data)
      navigate(`/meals/${id}`)
    } catch (err) {
      setError(getErrorMessage(err))
      setSaving(false)
    }
  }

  if (loading) return <p className="muted">Carregando...</p>

  if (!meal) {
    return (
      <section>
        <p className="alert alert-error">{error || 'Refeição não encontrada.'}</p>
        <Link to="/" className="btn btn-outline">Voltar</Link>
      </section>
    )
  }

  return (
    <section>
      <div className="page-title">
        <h2>Editar refeição</h2>
      </div>
      <MealForm
        initialValues={meal}
        onSubmit={handleSubmit}
        submitLabel="Salvar alterações"
        loading={saving}
        error={error}
      />
    </section>
  )
}
