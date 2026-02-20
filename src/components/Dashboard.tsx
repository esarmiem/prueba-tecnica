import { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseTable from './ExpenseTable'
import ExpenseSummary from './ExpenseSummary'
import ExpenseChart from './ExpenseChart'
import FilterBar from './FilterBar'
import Header from './layout/Header'
import MainLayout from './layout/MainLayout'
import ToastNotification from './ui/ToastNotification'
import { useExpenses } from '../context/ExpenseContext'
import type { Expense } from '../types/expense'
import { MESSAGES } from '../constants/messages'

const Dashboard = () => {
  const {
    expenses,
    loading,
    error,
    successMessage,
    clearSuccessMessage,
    refreshExpenses,
  } = useExpenses()
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(
    undefined
  )

  const handleEdit = (expense: Expense) => {
    setExpenseToEdit(expense)
  }

  const handleClearEdit = () => {
    setExpenseToEdit(undefined)
  }

  return (
    <MainLayout>
      <Header />

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
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">{MESSAGES.UI.LOADING}</span>
            </div>
          </div>
        )}

        <ExpenseSummary expenses={expenses} />

        <FilterBar />

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="row g-4">
              <div className="col-12">
                <ExpenseChart expenses={expenses} />
              </div>
              <div className="col-12">
                <ExpenseTable expenses={expenses} onEdit={handleEdit} />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '2rem', zIndex: 1 }}>
              <ExpenseForm
                key={expenseToEdit?.id ?? 'new-expense'}
                expenseToEdit={expenseToEdit}
                onClearEdit={handleClearEdit}
              />
            </div>
          </div>
        </div>
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

export default Dashboard
