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
      `¿Eliminar el gasto de ${expense.category} por ${formatCurrency(
        expense.amount
      )}?`
    )
    if (!confirmed) {
      return
    }
    await removeExpense(expense.id)
  }

  if (expenses.length === 0) {
    return (
      <div className="card shadow-sm animate-fade-in">
        <div className="card-body text-center text-muted">
          <div className="fs-2 mb-2">🧾</div>
          <p className="mb-0">Aún no hay gastos registrados</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Historial de gastos</h5>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Monto</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <td>{formatCurrency(expense.amount)}</td>
                  <td>{expense.category}</td>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.description || '—'}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => onEdit(expense)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(expense)}
                    >
                      Eliminar
                    </button>
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
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-MX').format(new Date(value))

export default ExpenseTable
