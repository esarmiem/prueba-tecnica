import Dashboard from './components/Dashboard'
import { ExpenseProvider } from './context/ExpenseContext'

function App() {
  return (
    <ExpenseProvider>
      <Dashboard />
    </ExpenseProvider>
  )
}

export default App
