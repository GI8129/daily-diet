import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Header from './Header.jsx'
import BottomNav from './BottomNav.jsx'

export default function PrivateLayout() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}
