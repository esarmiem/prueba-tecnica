import type { Expense } from '../types/expense'

type ExpenseSummaryProps = {
  expenses: Expense[]
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

  const categories = Object.entries(totalsByCategory)

  return (
    <div className="row g-3">
      <div className="col-12">
        <div className="card shadow-sm animate-scale-in">
          <div className="card-body">
            <p className="text-muted mb-1">Gasto total</p>
            <h3 className="mb-0">{formatCurrency(total)}</h3>
          </div>
        </div>
      </div>
      {categories.map(([category, value]) => (
        <div className="col-md-4" key={category}>
          <div className="card shadow-sm animate-scale-in">
            <div className="card-body">
              <p className="text-muted mb-1">{category}</p>
              <h5 className="mb-0">{formatCurrency(value)}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)

export default ExpenseSummary
