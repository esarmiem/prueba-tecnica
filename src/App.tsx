import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import ExpenseSummary from './components/ExpenseSummary'
import ExpenseChart from './components/ExpenseChart'
import FilterBar from './components/FilterBar'
import { ExpenseProvider, useExpenses } from './context/ExpenseContext'
import type { Expense } from './types/expense'

const AppContent = () => {
  const { expenses } = useExpenses()
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(
    undefined
  )

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  )

  const handleEdit = (expense: Expense) => {
    setExpenseToEdit(expense)
  }

  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <div>
            <h1 className="h3 mb-1">Gestor de Gastos</h1>
            <p className="text-muted mb-0">
              Controla tus gastos personales en un solo lugar
            </p>
          </div>
          <div className="text-md-end">
            <p className="text-muted mb-1">Total general</p>
            <h2 className="mb-0">{formatCurrency(total)}</h2>
          </div>
        </div>
      </header>

      <div className="d-flex flex-column gap-4">
        <FilterBar />
        <ExpenseSummary expenses={expenses} />
        <div className="row g-4">
          <div className="col-lg-6">
            <ExpenseForm expenseToEdit={expenseToEdit} />
          </div>
          <div className="col-lg-6">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>
        <ExpenseTable expenses={expenses} onEdit={handleEdit} />
      </div>
    </div>
  )
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  )
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)

export default App
