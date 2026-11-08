import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import AuthLayout from '../components/AuthLayout.jsx'

export default function Register() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/users', { name, email })
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
          <h2>Criar usuário</h2>
          <p className="muted">Cadastre-se para registrar suas refeições.</p>
        </div>

        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          {loading ? 'Criando...' : 'Criar e entrar'}
        </button>

        <p className="center muted">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
