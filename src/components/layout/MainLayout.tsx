import type { ReactNode } from 'react'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container py-4">
      <main className="main-content-centered">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
