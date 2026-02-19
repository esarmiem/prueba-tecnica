import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import type { Expense } from '../types/expense'
import { useExpenses } from '../context/ExpenseContext'

ChartJS.register(ArcElement, Tooltip, Legend)

type ExpenseChartProps = {
  expenses: Expense[]
}

const categoryColors: Record<string, string> = {
  Comida: '#f97316',
  Transporte: '#0ea5e9',
  Entretenimiento: '#a855f7',
  Salud: '#22c55e',
  Educación: '#eab308',
  Otros: '#64748b',
}

const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  const { filters } = useExpenses()
  const totalsByCategory = expenses.reduce<Record<string, number>>(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount
      return acc
    },
    {}
  )

  const labels = Object.keys(totalsByCategory)
  const values = Object.values(totalsByCategory)

  if (labels.length === 0) {
    return (
      <div className="card shadow-sm animate-fade-in">
        <div className="card-body text-center text-muted">
          <div className="fs-2 mb-2">📊</div>
          <p className="mb-0">Sin gastos para mostrar</p>
        </div>
      </div>
    )
  }

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((label) => categoryColors[label] ?? '#94a3b8'),
        borderWidth: 0,
      },
    ],
  }

  const title = buildTitle(filters)

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
    animation: {
      easing: 'easeInOutQuart',
    },
  }

  return (
    <div className="card shadow-sm animate-fade-in">
      <div className="card-body">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

const buildTitle = (filters: { startDate?: string; endDate?: string }) => {
  const { startDate, endDate } = filters
  if (!startDate && !endDate) {
    return 'Todos los gastos'
  }
  if (startDate && endDate) {
    return `Gastos del ${formatDate(startDate)} al ${formatDate(endDate)}`
  }
  if (startDate) {
    return `Gastos desde ${formatDate(startDate)}`
  }
  return `Gastos hasta ${formatDate(endDate ?? '')}`
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-MX').format(new Date(value))

export default ExpenseChart
