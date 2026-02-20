import { MESSAGES } from '../../constants/messages'

type ToastNotificationProps = {
  message: string
  onClose: () => void
}

const ToastNotification = ({ message, onClose }: ToastNotificationProps) => {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
      <div className="toast show">
        <div className="toast-header">
          <strong className="me-auto">{MESSAGES.UI.TOAST_TITLE}</strong>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          />
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  )
}

export default ToastNotification
