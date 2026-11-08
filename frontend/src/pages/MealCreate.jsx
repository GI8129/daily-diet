import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import MealForm from '../components/MealForm.jsx'

export default function MealCreate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(data) {
    setError('')
    setLoading(true)
    try {
      await api.post('/meals', data)
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err))
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="page-title">
        <h2>Nova refeição</h2>
      </div>
      <MealForm onSubmit={handleSubmit} submitLabel="Cadastrar refeição" loading={loading} error={error} />
    </section>
  )
}
