import { useState } from 'react';

/**
 * Editorial Parent Profile & Auth Modal
 */
export function AuthModal({ isOpen, user, onClose, onSaveUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || 'Ananya Shah',
    email: user?.email || 'ananya.shah@petpal.in',
    phone: user?.phone || '+91 98251 23456',
    city: user?.city || 'Vesu, Surat'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveUser({
      ...user,
      ...formData
    });
    onClose();
  };

  return (
    <div className="editorial-modal-overlay" onClick={onClose}>
      <div className="editorial-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="editorial-modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt="Avatar"
              style={{ width: '48px', height: '48px', objectFit: 'cover', border: 'var(--border-editorial)' }}
            />
            <div>
              <span className="editorial-tag font-mono">✦ Registered Parent</span>
              <h3 style={{ fontSize: '1.4rem' }}>{user?.name || 'Ananya Shah'}</h3>
            </div>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field-group">
            <label className="form-field-label">Full Name</label>
            <input
              type="text"
              className="editorial-input"
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-field-group">
            <label className="form-field-label">Email Address</label>
            <input
              type="email"
              className="editorial-input"
              value={formData.email}
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-2-col">
            <div className="form-field-group">
              <label className="form-field-label">Phone</label>
              <input
                type="tel"
                className="editorial-input"
                value={formData.phone}
                required
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-field-group">
              <label className="form-field-label">City / Area</label>
              <input
                type="text"
                className="editorial-input"
                value={formData.city}
                required
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginBottom: '20px' }}>
            💡 Demonstration profile records are stored locally in your browser.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-editorial-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-editorial-primary">
              Save Profile ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
