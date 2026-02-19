import { useState } from 'react'
import type { Expense, ExpenseFormData } from '../types/expense'
import { useExpenses } from '../context/ExpenseContext'

type ExpenseFormProps = {
  expenseToEdit?: Expense
}

type FormErrors = {
  amount?: string
  category?: string
  date?: string
}

const categories = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Otros',
]

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

const ExpenseFormFields = ({ expenseToEdit }: ExpenseFormProps) => {
  const { addExpense, editExpense } = useExpenses()
  const [formState, setFormState] = useState(
    buildInitialState(expenseToEdit)
  )
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = () => {
    const nextErrors: FormErrors = {}
    const amountValue = Number(formState.amount)

    if (!formState.amount || Number.isNaN(amountValue) || amountValue <= 0) {
      nextErrors.amount = 'Ingresa un monto válido'
    }

    if (!formState.category) {
      nextErrors.category = 'Selecciona una categoría'
    }

    if (!formState.date) {
      nextErrors.date = 'Selecciona una fecha'
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
    } else {
      await addExpense(payload)
    }

    setFormState(initialFormState)
    setErrors({})
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="card shadow-sm animate-slide-down">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {expenseToEdit ? 'Editar gasto' : 'Nuevo gasto'}
        </h5>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Monto</label>
              <input
                type="number"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                name="amount"
                value={formState.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
              {errors.amount && (
                <div className="invalid-feedback">{errors.amount}</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Categoría</label>
              <select
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                name="category"
                value={formState.category}
                onChange={handleChange}
              >
                <option value="">Selecciona</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                name="date"
                value={formState.date}
                onChange={handleChange}
              />
              {errors.date && (
                <div className="invalid-feedback">{errors.date}</div>
              )}
            </div>
            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="description"
                value={formState.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {expenseToEdit ? 'Guardar cambios' : 'Agregar gasto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ExpenseForm = ({ expenseToEdit }: ExpenseFormProps) => {
  const formKey = expenseToEdit?.id ?? 'new-expense'
  return <ExpenseFormFields key={formKey} expenseToEdit={expenseToEdit} />
}

export default ExpenseForm
