/**
 * Editorial Confirmation Modal
 * Clean dialog for safe confirmations.
 */
export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="editorial-modal-overlay" onClick={onCancel}>
      <div
        className="editorial-modal-card"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="editorial-modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>{isDangerous ? '⚠️' : '✦'}</span>
            <h3 style={{ fontSize: '1.4rem' }}>{title}</h3>
          </div>
          <button className="modal-close-icon-btn" onClick={onCancel} aria-label="Close dialog">✕</button>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-soft)', marginBottom: '24px', lineHeight: '1.5' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn-editorial-secondary btn-editorial-sm" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            className={isDangerous ? 'btn-editorial-danger' : 'btn-editorial-primary btn-editorial-sm'}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
