import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { IconLeaf, IconLogout } from './Icons.jsx'

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const firstName = user.name.trim().split(' ')[0]
  const initial = user.name.trim().charAt(0).toUpperCase()

  function handleLogout() {
    signOut()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-logo">
            <IconLeaf />
          </span>
          Daily Diet
        </Link>

        <nav className="nav nav-desktop">
          <NavLink to="/" end>Refeições</NavLink>
          <NavLink to="/meals/new">Nova refeição</NavLink>
          <NavLink to="/metrics">Métricas</NavLink>
        </nav>

        <div className="header-user">
          <span className="avatar">{initial}</span>
          <span className="user-name">Olá, {firstName}</span>
          <button className="btn btn-ghost btn-small" onClick={handleLogout} aria-label="Sair">
            <IconLogout width={18} height={18} />
            <span className="hide-mobile">Sair</span>
          </button>
        </div>
      </div>
    </header>
  )
}
