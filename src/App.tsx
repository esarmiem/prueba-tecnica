import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import ExpenseSummary from './components/ExpenseSummary'
import ExpenseChart from './components/ExpenseChart'
import FilterBar from './components/FilterBar'
import Header from './components/layout/Header'
import MainLayout from './components/layout/MainLayout'
import ToastNotification from './components/ui/ToastNotification'
import { ExpenseProvider, useExpenses } from './context/ExpenseContext'
import type { Expense } from './types/expense'
import { formatCurrency } from './utils/currency'
import { MESSAGES } from './constants/messages'

const AppContent = () => {
  const {
    expenses,
    loading,
    error,
    isFallback,
    successMessage,
    clearSuccessMessage,
    refreshExpenses,
  } = useExpenses()
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
    <MainLayout>
      <Header
        total={total}
        isFallback={isFallback}
        formatCurrency={formatCurrency}
      />

      <div className="d-flex flex-column gap-4">
        {error && (
          <div className="alert alert-danger d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
            <div>{error}</div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={refreshExpenses}
            >
              {MESSAGES.UI.RETRY}
            </button>
          </div>
        )}
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{MESSAGES.UI.LOADING}</span>
            </div>
          </div>
        )}
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
      {successMessage && (
        <ToastNotification
          message={successMessage}
          onClose={clearSuccessMessage}
        />
      )}
    </MainLayout>
  )
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  )
}

export default App
