import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { vi } from 'vitest'
import type { Expense, ExpenseFormData } from '../types/expense'

vi.mock('../services/expenseService', () => ({
  getExpenses: vi.fn(),
  createExpense: vi.fn(),
  updateExpense: vi.fn(),
  deleteExpense: vi.fn(),
}))

let ExpenseProvider: typeof import('./ExpenseContext').ExpenseProvider
let useExpenses: typeof import('./ExpenseContext').useExpenses
let expenseService: typeof import('../services/expenseService')

beforeAll(async () => {
  expenseService = await import('../services/expenseService')
  ;({ ExpenseProvider, useExpenses } = await import('./ExpenseContext'))
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <ExpenseProvider autoFetch={false}>{children}</ExpenseProvider>
)

const buildExpense = (overrides: Partial<Expense>): Expense => ({
  id: '1',
  amount: 10,
  category: 'Comida',
  date: '2025-01-01',
  description: undefined,
  createdAt: '2025-01-01T00:00:00.000Z',
  ...overrides,
})

describe('ExpenseContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(expenseService, 'getExpenses').mockResolvedValue([])
  })

  it('agregar un gasto aumenta el array en 1', async () => {
    const payload: ExpenseFormData = {
      amount: 120,
      category: 'Salud',
      date: '2025-02-01',
      description: 'Consulta',
    }
    const created = buildExpense({
      id: 'new',
      amount: 120,
      category: 'Salud',
      date: '2025-02-01',
      description: 'Consulta',
    })
    vi.spyOn(expenseService, 'createExpense').mockResolvedValueOnce(created)
    const { result } = renderHook(() => useExpenses(), { wrapper })
    await act(async () => {
      await result.current.refreshExpenses()
    })

    await act(async () => {
      await result.current.addExpense(payload)
    })

    expect(result.current.expenses).toHaveLength(1)
    expect(result.current.expenses[0]).toEqual(created)
  })

  it('eliminar un gasto reduce el array en 1', async () => {
    const existing = buildExpense({ id: '1', amount: 50 })
    const mockGet = vi.mocked(expenseService.getExpenses)
    mockGet.mockResolvedValueOnce([existing])
    vi.spyOn(expenseService, 'deleteExpense').mockResolvedValueOnce(undefined)
    const { result } = renderHook(() => useExpenses(), { wrapper })
    await act(async () => {
      await result.current.refreshExpenses()
    })

    await act(async () => {
      await result.current.removeExpense('1')
    })

    expect(result.current.expenses).toHaveLength(0)
  })

  it('editar un gasto actualiza los campos correctamente', async () => {
    const existing = buildExpense({ id: '1', amount: 40 })
    const updated = buildExpense({ id: '1', amount: 90 })
    const mockGet = vi.mocked(expenseService.getExpenses)
    mockGet.mockResolvedValueOnce([existing])
    vi.spyOn(expenseService, 'updateExpense').mockResolvedValueOnce(updated)

    const { result } = renderHook(() => useExpenses(), { wrapper })
    await act(async () => {
      await result.current.refreshExpenses()
    })

    await act(async () => {
      await result.current.editExpense('1', { amount: 90 })
    })

    expect(result.current.expenses[0]?.amount).toBe(90)
  })

  it('los filtros reducen correctamente los gastos visibles', async () => {
    const filtered = buildExpense({ id: '10', category: 'Educación' })
    const mockGet = vi.mocked(expenseService.getExpenses)
    mockGet.mockResolvedValueOnce([]).mockResolvedValueOnce([filtered])

    const { result } = renderHook(() => useExpenses(), { wrapper })
    await act(async () => {
      await result.current.refreshExpenses()
    })

    act(() => {
      result.current.setFilters({ category: 'Educación' })
    })

    await act(async () => {
      await result.current.refreshExpenses()
    })
    expect(result.current.expenses[0]?.category).toBe('Educación')
    expect(mockGet).toHaveBeenCalledWith({ category: 'Educación' })
  })
})
