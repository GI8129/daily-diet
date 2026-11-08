// "2026-11-05T15:30:00.000Z" -> "05/11/2026 12:30" (horário local)
export function formatDateTime(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

// "2026-11-05T15:30:00.000Z" -> "12:30"
export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Converte uma data ISO para o formato do <input type="datetime-local">
export function toInputValue(iso) {
  const date = new Date(iso)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

// Chave do dia no horário local, ex.: "2026-11-05" (usada para agrupar)
export function dayKey(iso) {
  const d = new Date(iso)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

// "2026-11-05" -> "Hoje", "Ontem" ou "quinta-feira, 05 de novembro"
export function dayLabel(key) {
  const [year, month, day] = key.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const diff = Math.round((today - date) / 86400000)
  if (diff === 0) return 'Hoje'
  if (diff === 1) return 'Ontem'

  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}
