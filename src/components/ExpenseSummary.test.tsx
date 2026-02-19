import { render, screen } from '@testing-library/react'
import ExpenseSummary from './ExpenseSummary'
import type { Expense } from '../types/expense'

const buildExpense = (overrides: Partial<Expense>): Expense => ({
  id: '1',
  amount: 0,
  category: 'Comida',
  date: '2025-01-01',
  description: undefined,
  createdAt: '2025-01-01T00:00:00.000Z',
  ...overrides,
})

describe('ExpenseSummary', () => {
  it('muestra el total correcto dado un array de gastos', () => {
    const expenses = [
      buildExpense({ id: '1', amount: 50 }),
      buildExpense({ id: '2', amount: 75 }),
    ]

    render(<ExpenseSummary expenses={expenses} />)

    expect(screen.getAllByText('$125.00')).toHaveLength(2)
  })

  it('muestra los totales por categoría correctamente', () => {
    const expenses = [
      buildExpense({ id: '1', category: 'Comida', amount: 30 }),
      buildExpense({ id: '2', category: 'Transporte', amount: 20 }),
      buildExpense({ id: '3', category: 'Comida', amount: 10 }),
    ]

    render(<ExpenseSummary expenses={expenses} />)

    expect(screen.getByText('Comida')).toBeInTheDocument()
    expect(screen.getByText('Transporte')).toBeInTheDocument()
    expect(screen.getByText('$40.00')).toBeInTheDocument()
    expect(screen.getByText('$20.00')).toBeInTheDocument()
  })

  it('muestra 0 cuando no hay gastos', () => {
    render(<ExpenseSummary expenses={[]} />)
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })
})
