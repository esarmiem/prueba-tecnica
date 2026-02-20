import { apiClient } from './apiClient'
import type { Expense, ExpenseFilters, ExpenseFormData } from '../types/expense'

const getExpenses = async (filters?: ExpenseFilters): Promise<Expense[]> => {
  const response = await apiClient.get<Expense[]>('/api/expenses', {
    params: filters,
  })
  return response.data
}

const createExpense = async (data: ExpenseFormData): Promise<Expense> => {
  const response = await apiClient.post<Expense>('/api/expenses', data)
  return response.data
}

const updateExpense = async (
  id: string,
  data: Partial<ExpenseFormData>
): Promise<Expense> => {
  const response = await apiClient.put<Expense>(`/api/expenses/${id}`, data)
  return response.data
}

const deleteExpense = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/expenses/${id}`)
}

export { getExpenses, createExpense, updateExpense, deleteExpense }
