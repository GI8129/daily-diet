import { useEffect, useState } from 'react'
import { api, getErrorMessage } from '../services/api.js'
import { IconChart, IconFlame, IconLeaf } from '../components/Icons.jsx'

// Gráfico circular (donut) feito com SVG
function Donut({ percent, empty }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const filled = (percent / 100) * circumference

  return (
    <svg viewBox="0 0 140 140" className="donut" role="img" aria-label={`${percent}% das refeições dentro da dieta`}>
      <circle cx="70" cy="70" r={radius} className={empty ? 'donut-track empty' : 'donut-track'} />
      {!empty && (
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="donut-value"
          strokeDasharray={`${filled} ${circumference}`}
          transform="rotate(-90 70 70)"
        />
      )}
      <text x="70" y="72" textAnchor="middle" className="donut-percent">
        {percent}%
      </text>
      <text x="70" y="92" textAnchor="middle" className="donut-caption">
        na dieta
      </text>
    </svg>
  )
}

function StatCard({ icon, label, value, variant }) {
  return (
    <div className={`card stat ${variant ?? ''}`}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function Metrics() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMetrics() {
      try {
        const { data } = await api.get('/metrics')
        setMetrics(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    loadMetrics()
  }, [])

  if (loading) return <div className="skeleton tall" />

  if (!metrics) {
    return <p className="alert alert-error">{error || 'Não foi possível carregar as métricas.'}</p>
  }

  const percent = metrics.totalMeals
    ? Math.round((metrics.totalOnDiet / metrics.totalMeals) * 100)
    : 0

  return (
    <section>
      <div className="page-title">
        <h2>Métricas</h2>
      </div>

      <div className="card hero-metric">
        <Donut percent={percent} empty={metrics.totalMeals === 0} />
        <div className="hero-metric-text">
          <h3>
            {metrics.totalMeals === 0
              ? 'Sem refeições ainda'
              : `${percent}% das refeições dentro da dieta`}
          </h3>
          <p className="muted">
            {metrics.totalMeals === 0
              ? 'Cadastre refeições para ver suas estatísticas.'
              : `${metrics.totalOnDiet} de ${metrics.totalMeals} refeições registradas seguem a dieta.`}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon={<IconChart />} label="Refeições registradas" value={metrics.totalMeals} />
        <StatCard
          icon={<IconFlame />}
          label="Melhor sequência dentro da dieta"
          value={metrics.bestOnDietSequence}
        />
        <StatCard icon={<IconLeaf />} label="Dentro da dieta" value={metrics.totalOnDiet} variant="in" />
        <StatCard icon={<IconLeaf />} label="Fora da dieta" value={metrics.totalOffDiet} variant="out" />
      </div>
    </section>
  )
}
