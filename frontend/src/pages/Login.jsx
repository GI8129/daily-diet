import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import AuthLayout from '../components/AuthLayout.jsx'

export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/login', { email })
      signIn(data)
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form className="auth-card form" onSubmit={handleSubmit}>
        <div>
          <h2>Bem-vindo de volta</h2>
          <p className="muted">Entre com o seu e-mail para ver suas refeições.</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="center muted">
          Não tem conta? <Link to="/register">Criar usuário</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
