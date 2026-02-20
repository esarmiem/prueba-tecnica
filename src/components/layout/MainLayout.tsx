import type { ReactNode } from 'react'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div className="container py-4">{children}</div>
}

export default MainLayout
