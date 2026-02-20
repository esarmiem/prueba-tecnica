export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-CO', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

export const getCategoryEmoji = (category: string) => {
  const map: Record<string, string> = {
    Comida: '🍔',
    Transporte: '🚗',
    Entretenimiento: '🎬',
    Salud: '🏥',
    Educación: '📚',
    Otros: '📦',
  }
  return map[category] || '💰'
}
