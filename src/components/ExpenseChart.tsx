import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import type { Expense } from '../types/expense'

ChartJS.register(ArcElement, Tooltip, Legend)

type ExpenseChartProps = {
  expenses: Expense[]
}

// Donezo-inspired Palette
const categoryColors: Record<string, string> = {
  Comida: '#105D37', // Primary Green
  Transporte: '#4ADE80', // Accent Green
  Entretenimiento: '#0F766E', // Teal
  Salud: '#F59E0B', // Amber (keep for contrast)
  Educación: '#3B82F6', // Blue
  Otros: '#9CA3AF', // Gray
}

const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
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
      <div className="card-donezo">
        <div className="card-body-donezo text-center text-muted d-flex flex-column align-items-center justify-content-center h-100">
          <div className="fs-2 mb-2" style={{ opacity: 0.5 }}>📊</div>
          <p className="mb-0">No hay datos disponibles</p>
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
        hoverOffset: 4,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'system-ui',
            size: 12
          }
        }
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: 20
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="card-donezo h-100">
      <div className="card-header-donezo">
        <h5 className="mb-0">Análisis de Gastos</h5>
      </div>
      <div className="card-body-donezo" style={{ height: '300px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default ExpenseChart
