import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Expense, ExpenseFilters, ExpenseFormData } from '../types/expense'
import useLocalStorage from '../hooks/useLocalStorage'
import { useAsync } from '../hooks/useAsync'
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../services/expenseService'
import { MESSAGES } from '../constants/messages'

type ExpenseContextValue = {
  expenses: Expense[]
  loading: boolean
  error: string | null
  successMessage: string | null
  isFallback: boolean
  filters: ExpenseFilters
  setFilters: React.Dispatch<React.SetStateAction<ExpenseFilters>>
  refreshExpenses: () => Promise<void>
  clearSuccessMessage: () => void
  addExpense: (data: ExpenseFormData) => Promise<Expense | undefined>
  editExpense: (
    id: string,
    data: Partial<ExpenseFormData>
  ) => Promise<Expense | undefined>
  removeExpense: (id: string) => Promise<void>
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined)

const ExpenseProvider = ({
  children,
  autoFetch = true,
}: {
  children: ReactNode
  autoFetch?: boolean
}) => {
  const [storedExpenses, setStoredExpenses] = useLocalStorage<Expense[]>(
    'expenses',
    []
  )
  const [expenses, setExpenses] = useState<Expense[]>(storedExpenses)
  const storedExpensesRef = useRef(storedExpenses)
  const { loading, error, isFallback, execute, setIsFallback } = useAsync()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [filters, setFilters] = useState<ExpenseFilters>({})

  useEffect(() => {
    storedExpensesRef.current = storedExpenses
  }, [storedExpenses])

  const refreshExpenses = useCallback(async () => {
    await execute(
      () => getExpenses(filters),
      MESSAGES.ERRORS.FETCH,
      (data) => {
        setExpenses(data)
        setStoredExpenses(data)
      },
      () => {
        setExpenses(storedExpensesRef.current)
        setIsFallback(true)
      }
    )
  }, [filters, setStoredExpenses, execute, setIsFallback])

  useEffect(() => {
    if (!autoFetch) {
      return
    }
    refreshExpenses()
  }, [autoFetch, refreshExpenses])

  const addExpense = async (
    data: ExpenseFormData
  ): Promise<Expense | undefined> => {
    return execute(
      () => createExpense(data),
      MESSAGES.ERRORS.CREATE,
      (created) => {
        const next = [...expenses, created]
        setExpenses(next)
        setStoredExpenses(next)
        setSuccessMessage(MESSAGES.SUCCESS.CREATE)
      }
    )
  }

  const editExpense = async (
    id: string,
    data: Partial<ExpenseFormData>
  ): Promise<Expense | undefined> => {
    return execute(
      () => updateExpense(id, data),
      MESSAGES.ERRORS.UPDATE,
      (updated) => {
        const next = expenses.map((expense) =>
          expense.id === id ? updated : expense
        )
        setExpenses(next)
        setStoredExpenses(next)
        setSuccessMessage(MESSAGES.SUCCESS.UPDATE)
      }
    )
  }

  const removeExpense = async (id: string): Promise<void> => {
    await execute(
      () => deleteExpense(id),
      MESSAGES.ERRORS.DELETE,
      () => {
        const next = expenses.filter((expense) => expense.id !== id)
        setExpenses(next)
        setStoredExpenses(next)
        setSuccessMessage(MESSAGES.SUCCESS.DELETE)
      }
    )
  }

  const value: ExpenseContextValue = {
    expenses,
    loading,
    error,
    successMessage,
    isFallback,
    filters,
    setFilters,
    refreshExpenses,
    clearSuccessMessage: () => setSuccessMessage(null),
    addExpense,
    editExpense,
    removeExpense,
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}

const useExpenses = (): ExpenseContextValue => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider')
  }
  return context
}

export { ExpenseProvider, useExpenses }
