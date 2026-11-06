/**
 * Editorial Toast Notification Banner
 */
export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="editorial-toast-wrap">
      <div className="editorial-toast">
        <span style={{ color: 'var(--butter-yellow)', fontSize: '1.1rem' }}>✦</span>
        <span style={{ flex: 1, letterSpacing: '0.2px' }}>{toast.message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--cream)',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
          }}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
