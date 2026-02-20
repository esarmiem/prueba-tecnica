import { useState } from 'react'
import type { Expense, ExpenseFormData } from '../types/expense'
import { useExpenses } from '../context/ExpenseContext'
import { CATEGORIES } from '../constants/categories'
import { MESSAGES } from '../constants/messages'

type ExpenseFormProps = {
  expenseToEdit?: Expense
  onClearEdit?: () => void
}

type FormErrors = {
  amount?: string
  category?: string
  date?: string
}

const initialFormState = {
  amount: '',
  category: '',
  date: '',
  description: '',
}

const buildInitialState = (expenseToEdit?: Expense) => {
  if (!expenseToEdit) {
    return initialFormState
  }

  return {
    amount: String(expenseToEdit.amount),
    category: expenseToEdit.category,
    date: expenseToEdit.date.slice(0, 10),
    description: expenseToEdit.description ?? '',
  }
}

const ExpenseForm = ({ expenseToEdit, onClearEdit }: ExpenseFormProps) => {
  const { addExpense, editExpense } = useExpenses()
  const [formState, setFormState] = useState(
    buildInitialState(expenseToEdit)
  )
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = () => {
    const nextErrors: FormErrors = {}
    const amountValue = Number(formState.amount)

    if (!formState.amount || Number.isNaN(amountValue) || amountValue <= 0) {
      nextErrors.amount = MESSAGES.ERRORS.VALIDATION.AMOUNT
    }

    if (!formState.category) {
      nextErrors.category = MESSAGES.ERRORS.VALIDATION.CATEGORY
    }

    if (!formState.date) {
      nextErrors.date = MESSAGES.ERRORS.VALIDATION.DATE
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      return
    }

    const payload: ExpenseFormData = {
      amount: Number(formState.amount),
      category: formState.category,
      date: formState.date,
      description: formState.description.trim() || undefined,
    }

    if (expenseToEdit) {
      await editExpense(expenseToEdit.id, payload)
      // Clear edit mode in parent
      if (onClearEdit) {
        onClearEdit()
      }
    } else {
      await addExpense(payload)
    }

    setFormState(initialFormState)
    setErrors({})
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    if (onClearEdit) {
      onClearEdit()
    }
    setFormState(initialFormState)
    setErrors({})
  }

  return (
    <div className="card-donezo">
      <div className="card-header-donezo">
        <h5 className="mb-0">{expenseToEdit ? 'Editar Gasto' : 'Nuevo Gasto'}</h5>
        {expenseToEdit && (
          <button 
            type="button" 
            className="btn btn-sm btn-light rounded-circle text-danger" 
            style={{ width: 32, height: 32, padding: 0 }}
            onClick={handleCancel}
            title="Cancelar edición"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) }
      </div>
      <div className="card-body-donezo">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label text-muted small text-uppercase fw-semibold">Monto</label>
            <div className="input-group">
              <span className="input-group-text border-0 bg-light rounded-start-pill ps-3">$</span>
              <input
                type="number"
                className={`form-control border-0 bg-light rounded-end-pill ${
                  errors.amount ? 'is-invalid' : ''
                }`}
                name="amount"
                value={formState.amount}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.amount && (
                <div className="invalid-feedback ms-3">{errors.amount}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small text-uppercase fw-semibold">Categoría</label>
            <select
              className={`form-select border-0 bg-light rounded-pill ${
                errors.category ? 'is-invalid' : ''
              }`}
              name="category"
              value={formState.category}
              onChange={handleChange}
            >
              <option value="">Selecciona Categoría</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="invalid-feedback ms-3">{errors.category}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small text-uppercase fw-semibold">Fecha</label>
            <input
              type="date"
              className={`form-control border-0 bg-light rounded-pill ${
                errors.date ? 'is-invalid' : ''
              }`}
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
            {errors.date && <div className="invalid-feedback ms-3">{errors.date}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small text-uppercase fw-semibold">Descripción</label>
            <textarea
              className="form-control border-0 bg-light"
              style={{ borderRadius: '1rem' }}
              name="description"
              value={formState.description}
              onChange={handleChange}
              rows={3}
              placeholder="¿Para qué fue esto?"
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary-donezo">
              {expenseToEdit ? 'Guardar Cambios' : 'Agregar Gasto'}
            </button>
            {expenseToEdit && (
              <button 
                type="button" 
                className="btn btn-outline-donezo border-0 btn-sm text-muted"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseForm
