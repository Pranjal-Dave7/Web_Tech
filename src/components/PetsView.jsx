
export function PetsView({
  pets = [],
  onAddPet,
  onEditPet,
  onDeletePet,
  onBookForPet
}) {
  return (
    <div className="content-container">
      {/* Editorial Page Header */}
      <div className="editorial-page-head">
        <div>
          <span className="editorial-tag font-mono">✦ The Pet Roster</span>
          <h1 className="editorial-title">My Companions ({pets.length})</h1>
          <p className="editorial-subtitle">
            Personal profiles, dietary quirks, and temperament notes for your household furry members.
          </p>
        </div>

        <div>
          <button className="btn-editorial-primary" onClick={onAddPet}>
            + Register Companion
          </button>
        </div>
      </div>

      {/* Pets Grid */}
      {pets.length > 0 ? (
        <div className="pets-lookbook-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-lookbook-card">
              <div className="pet-photo-frame">
                <img src={pet.image} alt={pet.name} />
                <span className="pet-type-stamp">
                  {pet.type === 'Dog' ? '🐶 Canine' : pet.type === 'Cat' ? '🐱 Feline' : '🐾 Companion'}
                </span>
              </div>

              <div className="pet-lookbook-body">
                <h3 className="pet-name-serif">{pet.name}</h3>
                <div className="pet-breed-kicker font-mono">
                  {pet.breed} {pet.color ? `• ${pet.color}` : ''}
                </div>

                {/* Specs Table */}
                <table className="pet-specs-table-mono">
                  <tbody>
                    <tr>
                      <td>AGE</td>
                      <td>{pet.age || '—'}</td>
                    </tr>
                    <tr>
                      <td>GENDER</td>
                      <td>{pet.gender || '—'}</td>
                    </tr>
                    <tr>
                      <td>WEIGHT</td>
                      <td>{pet.weight || '—'}</td>
                    </tr>
                    {pet.allergies && (
                      <tr>
                        <td style={{ color: 'var(--tomato)' }}>ALLERGY</td>
                        <td style={{ color: 'var(--tomato)', fontWeight: 700 }}>{pet.allergies}</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Temperament / Notes */}
                <div className="pet-temperament-box">
                  <div className="font-mono" style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--charcoal-muted)', marginBottom: '4px' }}>
                    Care & Personality Notes:
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-soft)' }}>
                    {pet.medicalNotes || pet.temperament || 'A beloved family member with a calm demeanor.'}
                  </p>
                </div>

                {/* Action Toolbar */}
                <div className="pet-actions-toolbar">
                  <button
                    className="btn-editorial-primary btn-editorial-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => onBookForPet(pet)}
                  >
                    Book Care ↗
                  </button>
                  <button
                    className="btn-editorial-secondary btn-editorial-sm"
                    onClick={() => onEditPet(pet)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-editorial-danger btn-editorial-sm"
                    onClick={() => onDeletePet(pet)}
                    title="Remove profile"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="editorial-empty-state">
          <div className="empty-star-symbol">🐾</div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>No pets registered yet</h3>
          <p style={{ color: 'var(--charcoal-muted)', marginBottom: '20px' }}>
            Add your dog or cat companion to easily schedule herbal grooming, walks, and boarding visits.
          </p>
          <button className="btn-editorial-primary" onClick={onAddPet}>
            + Register Your First Pet
          </button>
        </div>
      )}
    </div>
  );
}
