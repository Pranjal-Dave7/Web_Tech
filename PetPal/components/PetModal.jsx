import { useState } from 'react';
import { PRESET_AVATARS } from '../data/petData';

/**
 * Editorial Pet Profile Modal
 * Add or edit a beloved pet companion with photo presets and specs.
 */
export function PetModal({ isOpen, petToEdit, onClose, onSavePet }) {
  const [formData, setFormData] = useState(() => ({
    name: petToEdit?.name || '',
    type: petToEdit?.type || 'Dog',
    breed: petToEdit?.breed || '',
    age: petToEdit?.age || '',
    gender: petToEdit?.gender || 'Female',
    weight: petToEdit?.weight || '',
    color: petToEdit?.color || '',
    image: petToEdit?.image || PRESET_AVATARS[0].url,
    medicalNotes: petToEdit?.medicalNotes || '',
    allergies: petToEdit?.allergies || ''
  }));

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please provide your companion's name.");
      return;
    }
    if (!formData.breed.trim()) {
      setError("Please enter the breed or mix.");
      return;
    }

    const petPayload = {
      ...formData,
      id: petToEdit ? petToEdit.id : `pet-${Date.now()}`
    };

    onSavePet(petPayload);
    onClose();
  };

  return (
    <div className="editorial-modal-overlay" onClick={onClose}>
      <div className="editorial-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="editorial-modal-head">
          <div>
            <span className="editorial-tag font-mono">
              ✦ {petToEdit ? 'Lookbook Edit' : 'New Family Entry'}
            </span>
            <h3 className="editorial-modal-title">
              {petToEdit ? `Edit ${petToEdit.name}'s Profile` : 'Register a Companion'}
            </h3>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {error && (
          <div style={{
            background: 'var(--tomato-tint)',
            border: '1.5px solid var(--tomato)',
            color: 'var(--tomato)',
            padding: '10px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            marginBottom: '16px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Avatar Presets */}
          <div className="form-field-group">
            <label className="form-field-label">Photograph / Avatar</label>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '8px' }}>
              <img
                src={formData.image}
                alt="Selected"
                style={{ width: '56px', height: '56px', objectFit: 'cover', border: 'var(--border-editorial)' }}
              />
              <input
                type="url"
                className="editorial-input"
                placeholder="Paste custom photo URL or pick below"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="avatar-grid-select">
              {PRESET_AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.label}
                  className={`avatar-pick-thumb ${formData.image === av.url ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, image: av.url })}
                  title={av.label}
                >
                  <img src={av.url} alt={av.label} />
                </button>
              ))}
            </div>
          </div>

          {/* Name & Type */}
          <div className="form-2-col">
            <div className="form-field-group">
              <label className="form-field-label">Companion Name *</label>
              <input
                type="text"
                className="editorial-input"
                placeholder="e.g. Bruno or Mishti"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label">Category *</label>
              <select
                className="editorial-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Dog">🐶 Dog</option>
                <option value="Cat">🐱 Cat</option>
                <option value="Other">🐾 Companion Pet</option>
              </select>
            </div>
          </div>

          {/* Breed & Age */}
          <div className="form-2-col">
            <div className="form-field-group">
              <label className="form-field-label">Breed *</label>
              <input
                type="text"
                className="editorial-input"
                placeholder="e.g. Golden Retriever or Persian Cat"
                required
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label">Age</label>
              <input
                type="text"
                className="editorial-input"
                placeholder="e.g. 3 yrs"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
          </div>

          {/* Gender & Weight */}
          <div className="form-2-col">
            <div className="form-field-group">
              <label className="form-field-label">Gender</label>
              <select
                className="editorial-select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Female">Female ♀</option>
                <option value="Male">Male ♂</option>
              </select>
            </div>

            <div className="form-field-group">
              <label className="form-field-label">Weight</label>
              <input
                type="text"
                className="editorial-input"
                placeholder="e.g. 26.5 kg"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
          </div>

          {/* Coat & Allergies */}
          <div className="form-2-col">
            <div className="form-field-group">
              <label className="form-field-label">Coat / Color</label>
              <input
                type="text"
                className="editorial-input"
                placeholder="e.g. Toasted Honey"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label">Known Allergies</label>
              <input
                type="text"
                className="editorial-input"
                placeholder="e.g. Chicken kibble, dairy"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
            </div>
          </div>

          {/* Personality / Medical notes */}
          <div className="form-field-group">
            <label className="form-field-label">Care Notes & Personality</label>
            <textarea
              className="editorial-textarea"
              rows={2}
              placeholder="e.g. Extremely affectionate, sensitive ears, loves belly rubs..."
              value={formData.medicalNotes}
              onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="button" className="btn-editorial-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-editorial-primary">
              {petToEdit ? 'Save Profile ↗' : 'Register Pet ↗'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
