import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Expense, ExpenseFilters, ExpenseFormData } from '../types/expense'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../services/expenseService'

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
  addExpense: (data: ExpenseFormData) => Promise<Expense>
  editExpense: (id: string, data: Partial<ExpenseFormData>) => Promise<Expense>
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(false)
  const [filters, setFilters] = useState<ExpenseFilters>({})

  const refreshExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getExpenses(filters)
      setExpenses(data)
      setStoredExpenses(data)
      setIsFallback(false)
    } catch {
      setError('No se pudo cargar la API. Usando localStorage.')
      setExpenses(storedExpenses)
      setIsFallback(true)
    } finally {
      setLoading(false)
    }
  }, [filters, setStoredExpenses, storedExpenses])

  useEffect(() => {
    if (!autoFetch) {
      return
    }
    refreshExpenses()
  }, [autoFetch, refreshExpenses])

  const addExpense = async (data: ExpenseFormData): Promise<Expense> => {
    setLoading(true)
    setError(null)
    try {
      const created = await createExpense(data)
      const next = [...expenses, created]
      setExpenses(next)
      setStoredExpenses(next)
      setSuccessMessage('Gasto agregado correctamente')
      setIsFallback(false)
      return created
    } catch {
      setError('No se pudo crear el gasto.')
      throw new Error('createExpense failed')
    } finally {
      setLoading(false)
    }
  }

  const editExpense = async (
    id: string,
    data: Partial<ExpenseFormData>
  ): Promise<Expense> => {
    setLoading(true)
    setError(null)
    try {
      const updated = await updateExpense(id, data)
      const next = expenses.map((expense) =>
        expense.id === id ? updated : expense
      )
      setExpenses(next)
      setStoredExpenses(next)
      setSuccessMessage('Gasto actualizado correctamente')
      setIsFallback(false)
      return updated
    } catch {
      setError('No se pudo actualizar el gasto.')
      throw new Error('updateExpense failed')
    } finally {
      setLoading(false)
    }
  }

  const removeExpense = async (id: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      await deleteExpense(id)
      const next = expenses.filter((expense) => expense.id !== id)
      setExpenses(next)
      setStoredExpenses(next)
      setSuccessMessage('Gasto eliminado correctamente')
      setIsFallback(false)
    } catch {
      setError('No se pudo eliminar el gasto.')
      throw new Error('deleteExpense failed')
    } finally {
      setLoading(false)
    }
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
