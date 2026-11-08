import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateLayout from './components/PrivateLayout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Meals from './pages/Meals.jsx'
import MealCreate from './pages/MealCreate.jsx'
import MealDetail from './pages/MealDetail.jsx'
import MealEdit from './pages/MealEdit.jsx'
import Metrics from './pages/Metrics.jsx'

export default function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas protegidas (exigem usuário identificado) */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Meals />} />
        <Route path="/meals/new" element={<MealCreate />} />
        <Route path="/meals/:id" element={<MealDetail />} />
        <Route path="/meals/:id/edit" element={<MealEdit />} />
        <Route path="/metrics" element={<Metrics />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
