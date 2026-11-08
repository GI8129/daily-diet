import axios from 'axios'

export const USER_STORAGE_KEY = 'dailydiet:user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
})

// Envia o id do usuário logado em todas as requisições (header x-user-id)
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    const user = raw ? JSON.parse(raw) : null
    if (user?.id) config.headers['x-user-id'] = user.id
  } catch {
    // ignora dados inválidos no localStorage
  }
  return config
})

// Se a API disser que o usuário é inválido, volta para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(USER_STORAGE_KEY)
      if (window.location.pathname !== '/login') window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// Transforma o erro do axios em uma mensagem amigável
export function getErrorMessage(error) {
  if (!error.response) {
    return 'Não foi possível conectar à API. Verifique se o backend está rodando.'
  }
  const data = error.response.data
  if (data?.details?.length) return data.details.map((d) => d.message).join(' ')
  return data?.error || 'Ocorreu um erro inesperado.'
}
