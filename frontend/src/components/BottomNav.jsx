import { NavLink } from 'react-router-dom'
import { IconChart, IconList, IconPlus } from './Icons.jsx'

// Menu inferior, visível apenas no celular (controlado pelo CSS)
export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <NavLink to="/" end className="bn-item">
        <IconList />
        <span>Refeições</span>
      </NavLink>

      <NavLink to="/meals/new" className="bn-fab" aria-label="Nova refeição">
        <IconPlus width={26} height={26} />
      </NavLink>

      <NavLink to="/metrics" className="bn-item">
        <IconChart />
        <span>Métricas</span>
      </NavLink>
    </nav>
  )
}
