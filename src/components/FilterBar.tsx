import { useState } from 'react'
import type { ExpenseFilters } from '../types/expense'
import { useExpenses } from '../context/ExpenseContext'

const categories = [
  'Todas',
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Otros',
]

const FilterBar = () => {
  const { filters, setFilters } = useExpenses()
  const [localFilters, setLocalFilters] = useState<ExpenseFilters>({
    category: filters.category ?? 'Todas',
    startDate: filters.startDate ?? '',
    endDate: filters.endDate ?? '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    const next = { ...localFilters, [name]: value }
    setLocalFilters(next)
    setFilters({
      category: next.category === 'Todas' ? undefined : next.category,
      startDate: next.startDate || undefined,
      endDate: next.endDate || undefined,
    })
  }

  const handleReset = () => {
    setLocalFilters({ category: 'Todas', startDate: '', endDate: '' })
    setFilters({})
  }

  return (
    <div className="card shadow-sm animate-slide-down">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              name="category"
              value={localFilters.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Desde</label>
            <input
              className="form-control"
              type="date"
              name="startDate"
              value={localFilters.startDate ?? ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Hasta</label>
            <input
              className="form-control"
              type="date"
              name="endDate"
              value={localFilters.endDate ?? ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleReset}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
