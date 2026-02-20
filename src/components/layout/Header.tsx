const Header = () => {
  return (
    <header className="mb-5 text-center">
      <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
        <div style={{ width: 40, height: 40, background: 'var(--primary-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <h1 className="h2 mb-0 fw-bold" style={{ color: 'var(--primary-green)' }}>Gestor de Gastos</h1>
      </div>
      <p className="text-muted">Controla tus finanzas personales de forma sencilla</p>
    </header>
  )
}

export default Header
