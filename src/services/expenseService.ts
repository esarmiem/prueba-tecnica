import axios from 'axios'
import type { Expense, ExpenseFilters, ExpenseFormData } from '../types/expense'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const getExpenses = async (filters?: ExpenseFilters): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(`${apiUrl}/api/expenses`, {
    params: filters,
  })
  return response.data
}

const createExpense = async (data: ExpenseFormData): Promise<Expense> => {
  const response = await axios.post<Expense>(`${apiUrl}/api/expenses`, data)
  return response.data
}

const updateExpense = async (
  id: string,
  data: Partial<ExpenseFormData>
): Promise<Expense> => {
  const response = await axios.put<Expense>(`${apiUrl}/api/expenses/${id}`, data)
  return response.data
}

const deleteExpense = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/api/expenses/${id}`)
}

export { getExpenses, createExpense, updateExpense, deleteExpense }
