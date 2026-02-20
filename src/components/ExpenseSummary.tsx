import type { Expense } from '../types/expense'

type ExpenseSummaryProps = {
  expenses: Expense[]
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)

const getCategoryEmoji = (category: string) => {
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

const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const totalsByCategory = expenses.reduce<Record<string, number>>(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount
      return acc
    },
    {}
  )
  
  // Sort categories by amount descending and take top 3
  const topCategories = Object.entries(totalsByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <div className="row g-4 mb-4">
      {/* Total Expenses Card - Green */}
      <div className="col-md-6 col-xl-3">
        <div className="stat-card green animate-scale-in">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="mb-1" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Gastos Totales</p>
              <h2 className="mb-0">{formatCurrency(total)}</h2>
            </div>
            <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-2">
            <span className="badge bg-white text-success rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
              Actual
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Balance global</span>
          </div>
        </div>
      </div>

      {/* Dynamic Top Categories Cards */}
      {topCategories.map(([category, amount], index) => (
        <div className="col-md-6 col-xl-3" key={category}>
          <div className="stat-card animate-scale-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{category}</p>
                <h2 className="mb-0">{formatCurrency(amount)}</h2>
              </div>
              <div style={{ width: 32, height: 32, border: '1px solid #E5E7EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', background: '#F9FAFB' }}>
                {getCategoryEmoji(category)}
              </div>
            </div>
            <div className="mt-3 d-flex align-items-center gap-2">
              <span className="badge bg-light text-secondary rounded-pill px-2 py-1 border" style={{ fontSize: '0.7rem' }}>
                Top {index + 1}
              </span>
              <span className="text-muted" style={{ fontSize: '0.75rem' }}>Categoría principal</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Placeholder cards if fewer than 3 categories exist */}
      {topCategories.length < 3 && Array.from({ length: 3 - topCategories.length }).map((_, i) => (
        <div className="col-md-6 col-xl-3" key={`placeholder-${i}`}>
          <div className="stat-card animate-scale-in" style={{ opacity: 0.5, borderStyle: 'dashed', boxShadow: 'none' }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Sin Datos</p>
                <h4 className="mb-0 text-muted">--</h4>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-muted" style={{ fontSize: '0.75rem' }}>Agrega más gastos</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExpenseSummary
