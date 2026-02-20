import { MESSAGES } from '../../constants/messages'

type HeaderProps = {
  total: number
  isFallback: boolean
  formatCurrency: (value: number) => string
}

const Header = ({ total, isFallback, formatCurrency }: HeaderProps) => {
  return (
    <header className="mb-4">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
        <div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <h1 className="h3 mb-1">{MESSAGES.UI.HEADER_TITLE}</h1>
            {isFallback && (
              <span className="badge text-bg-warning">
                {MESSAGES.UI.FALLBACK_BADGE}
              </span>
            )}
          </div>
          <p className="text-muted mb-0">{MESSAGES.UI.HEADER_SUBTITLE}</p>
        </div>
        <div className="text-md-end">
          <p className="text-muted mb-1">{MESSAGES.UI.TOTAL_LABEL}</p>
          <h2 className="mb-0">{formatCurrency(total)}</h2>
        </div>
      </div>
    </header>
  )
}

export default Header
