import { Link } from 'react-router-dom'
import { formatTime } from '../utils/date.js'

export default function MealCard({ meal }) {
  const status = meal.isOnDiet ? 'in' : 'out'

  return (
    <Link to={`/meals/${meal.id}`} className={`card meal-card ${status}`}>
      <span className="meal-time">{formatTime(meal.eatenAt)}</span>

      <div className="meal-body">
        <h3>{meal.name}</h3>
        <p className="muted">{meal.description}</p>
      </div>

      <span className={`badge badge-${status}`}>
        {meal.isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}
      </span>
    </Link>
  )
}
