import { useState } from 'react';
import { PROVIDERS, formatToIndianDate } from '../data/petData';

/**
 * Editorial Booking Modal
 * Service selection, pet selection, date & time slots, price receipt, and instant confirmation.
 * Formatted with Indian dates (DD/MM/YYYY) and pricing in ₹.
 */
export function BookingModal({ provider, pets = [], preselectedPetId = null, onClose, onConfirm }) {
  const getDefaultDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // State: selected service (if not provided, default to first service)
  const [selectedServiceId, setSelectedServiceId] = useState(provider?.id || PROVIDERS[0].id);

  // State: selected pet
  const [selectedPetMode, setSelectedPetMode] = useState(
    preselectedPetId || (pets.length > 0 ? pets[0].id : 'custom')
  );
  const [customPetName, setCustomPetName] = useState('');
  const [customPetType, setCustomPetType] = useState('Dog');
  const [date, setDate] = useState(getDefaultDate);
  const [time, setTime] = useState('10:30 AM');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  // Determine current active service object
  const currentService = PROVIDERS.find(p => p.id === Number(selectedServiceId)) || provider || PROVIDERS[0];
  const bookingPrice = currentService.price || 799;
  const serviceLabel = currentService.categoryLabel;

  const minDate = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    let chosenPetName = 'My Pet';
    let chosenPetType = 'Dog';
    let chosenPetId = null;

    if (selectedPetMode === 'custom') {
      if (!customPetName.trim()) {
        setValidationError("Please enter your pet's name.");
        return;
      }
      chosenPetName = customPetName.trim();
      chosenPetType = customPetType;
    } else {
      const petObj = pets.find(p => p.id === selectedPetMode);
      if (petObj) {
        chosenPetName = petObj.name;
        chosenPetType = petObj.type;
        chosenPetId = petObj.id;
      }
    }

    if (!date) {
      setValidationError("Please select a reservation date.");
      return;
    }

    const todayIso = new Date().toISOString().split('T')[0];

    const newBooking = {
      id: Date.now(),
      providerName: currentService.name,
      service: serviceLabel,
      serviceCategory: currentService.category,
      price: bookingPrice,
      petId: chosenPetId,
      petName: chosenPetName,
      petType: chosenPetType,
      date: formatToIndianDate(date),
      time: time,
      status: 'Upcoming',
      notes: notes.trim() || 'Standard care visit requested.',
      location: currentService.location || 'Surat',
      bookedOn: formatToIndianDate(todayIso)
    };

    onConfirm(newBooking);
  };

  return (
    <div className="editorial-modal-overlay" onClick={onClose}>
      <div className="editorial-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="editorial-modal-head">
          <div>
            <span className="editorial-tag font-mono">✦ Direct Reservation</span>
            <h3 className="editorial-modal-title">Book a Care Session</h3>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {validationError && (
          <div style={{
            background: 'var(--tomato-tint)',
            border: '1.5px solid var(--tomato)',
            color: 'var(--tomato)',
            padding: '10px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            marginBottom: '16px'
          }}>
            ⚠️ {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Service */}
          <div className="form-field-group">
            <label className="form-field-label">1. Choose Offering</label>
            <select
              className="editorial-select"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              {PROVIDERS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.categoryLabel} — ₹{p.price})
                </option>
              ))}
            </select>
            <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: '4px' }}>
              📍 {currentService.location} • Duration: {currentService.duration}
            </p>
          </div>

          {/* Step 2: Select Pet */}
          <div className="form-field-group">
            <label className="form-field-label">2. Select Companion</label>
            {pets.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <select
                  className="editorial-select"
                  value={selectedPetMode}
                  onChange={(e) => setSelectedPetMode(e.target.value)}
                >
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>
                      🐾 {p.name} ({p.breed} - {p.type})
                    </option>
                  ))}
                  <option value="custom">➕ Reserve for another companion</option>
                </select>

                {selectedPetMode === 'custom' && (
                  <div className="form-2-col" style={{ marginTop: '6px' }}>
                    <input
                      type="text"
                      className="editorial-input"
                      placeholder="Pet's name (e.g. Bruno or Simba)"
                      value={customPetName}
                      onChange={(e) => setCustomPetName(e.target.value)}
                      required
                    />
                    <select
                      className="editorial-select"
                      value={customPetType}
                      onChange={(e) => setCustomPetType(e.target.value)}
                    >
                      <option value="Dog">🐶 Dog</option>
                      <option value="Cat">🐱 Cat</option>
                      <option value="Other">🐾 Other</option>
                    </select>
                  </div>
                )}
              </div>
            ) : (
              <div className="form-2-col">
                <input
                  type="text"
                  className="editorial-input"
                  placeholder="Pet's name (e.g. Bruno)"
                  value={customPetName}
                  onChange={(e) => setCustomPetName(e.target.value)}
                  required
                />
                <select
                  className="editorial-select"
                  value={customPetType}
                  onChange={(e) => setCustomPetType(e.target.value)}
                >
                  <option value="Dog">🐶 Dog</option>
                  <option value="Cat">🐱 Cat</option>
                  <option value="Other">🐾 Other</option>
                </select>
              </div>
            )}
          </div>

          {/* Step 3: Date & Slot */}
          <div className="form-2-col">
            <div className="form-field-group">
              <label className="form-field-label">3. Date (DD/MM/YYYY)</label>
              <input
                type="date"
                className="editorial-input"
                min={minDate}
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label">4. Time Slot</label>
              <select
                className="editorial-select"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="08:00 AM">08:00 AM (Early Morning)</option>
                <option value="10:30 AM">10:30 AM (Morning)</option>
                <option value="01:30 PM">01:30 PM (Afternoon)</option>
                <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
                <option value="06:30 PM">06:30 PM (Evening)</option>
              </select>
            </div>
          </div>

          {/* Step 4: Notes */}
          <div className="form-field-group">
            <label className="form-field-label">5. Special Instructions or Temperament Notes</label>
            <textarea
              className="editorial-textarea"
              rows={2}
              placeholder="e.g. Bruno loves treats, Mishti needs gentle towel wraps..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Receipt Summary */}
          <div style={{
            background: 'var(--white)',
            border: 'var(--border-editorial)',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span className="font-mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--charcoal-muted)', display: 'block' }}>
                Total Due at Session
              </span>
              <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--charcoal)' }}>
                ₹{bookingPrice}
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--tomato)', fontWeight: 700 }}>
              ✦ Free Cancellation
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-editorial-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-editorial-primary">
              Confirm Reservation ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
