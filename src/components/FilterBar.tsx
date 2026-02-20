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
    <div className="card-donezo mb-4">
      <div className="card-body-donezo py-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <select
              className="form-select border-0 bg-light rounded-pill"
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
            <input
              className="form-control border-0 bg-light rounded-pill"
              type="date"
              name="startDate"
              value={localFilters.startDate ?? ''}
              onChange={handleChange}
              placeholder="Desde"
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control border-0 bg-light rounded-pill"
              type="date"
              name="endDate"
              value={localFilters.endDate ?? ''}
              onChange={handleChange}
              placeholder="Hasta"
            />
          </div>
          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-donezo btn-sm"
              onClick={handleReset}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
