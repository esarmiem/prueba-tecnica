import type { Expense } from '../types/expense'
import { useExpenses } from '../context/ExpenseContext'

type ExpenseTableProps = {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
}

const ExpenseTable = ({ expenses, onEdit }: ExpenseTableProps) => {
  const { removeExpense } = useExpenses()

  const handleDelete = async (expense: Expense) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar ${expense.category} - ${formatCurrency(expense.amount)}?`
    )
    if (!confirmed) return
    await removeExpense(expense.id)
  }

  if (expenses.length === 0) {
    return (
      <div className="card-donezo">
        <div className="card-body-donezo text-center text-muted">
          <p className="mb-0">No se encontraron transacciones</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-donezo">
      <div className="card-header-donezo">
        <h5 className="mb-0">Transacciones Recientes</h5>
      </div>
      <div className="card-body-donezo p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
            <thead className="bg-light">
              <tr>
                <th className="border-0 ps-4 py-3 text-muted fw-normal" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Transacción</th>
                <th className="border-0 py-3 text-muted fw-normal" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Fecha</th>
                <th className="border-0 py-3 text-muted fw-normal" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Categoría</th>
                <th className="border-0 py-3 text-muted fw-normal" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Monto</th>
                <th className="border-0 pe-4 py-3 text-end text-muted fw-normal" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} style={{ transition: 'background-color 0.2s' }}>
                  <td className="border-bottom border-light ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                         {getCategoryEmoji(expense.category)}
                      </div>
                      <div>
                        <div className="fw-medium text-dark">{expense.description || expense.category}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>Completado</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-bottom border-light py-3 text-secondary" style={{ fontSize: '0.9rem' }}>
                    {formatDate(expense.date)}
                  </td>
                  <td className="border-bottom border-light py-3">
                    <span className="badge rounded-pill fw-normal" style={{ 
                      backgroundColor: 'rgba(74, 222, 128, 0.1)', 
                      color: '#105D37',
                      padding: '0.35em 0.8em'
                    }}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="border-bottom border-light py-3 fw-medium text-dark">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="border-bottom border-light pe-4 py-3 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        className="btn btn-sm btn-link text-secondary p-0" 
                        onClick={() => onEdit(expense)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button 
                        className="btn btn-sm btn-link text-danger p-0" 
                        onClick={() => handleDelete(expense)}
                        title="Eliminar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-CO', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))

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

export default ExpenseTable
