import { createContext, useContext, useState } from 'react'
import { USER_STORAGE_KEY } from '../services/api.js'

const AuthContext = createContext(null)

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  function signIn(userData) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
    setUser(userData)
  }

  function signOut() {
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
