export interface Expense {
  id: string
  amount: number
  category: string
  date: string
  description?: string
  createdAt: string
}

export interface ExpenseFormData {
  amount: number
  category: string
  date: string
  description?: string
}

export interface ExpenseFilters {
  category?: string
  startDate?: string
  endDate?: string
}
