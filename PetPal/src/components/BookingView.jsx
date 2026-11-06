import { useState } from 'react';

/**
 * Editorial Bookings Ledger & Timeline
 * Clean list/timeline layout with date columns in Space Mono, status stamps, and cancellation workflow.
 */
export function BookingsView({
  appointments = [],
  onCancelBooking,
  onNavigateToServices
}) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredAppointments = appointments.filter((appt) => {
    if (activeTab === 'upcoming') return appt.status === 'Upcoming';
    if (activeTab === 'completed') return appt.status === 'Completed';
    if (activeTab === 'cancelled') return appt.status === 'Cancelled';
    return true; // 'all'
  });

  const countUpcoming = appointments.filter(a => a.status === 'Upcoming').length;
  const countCompleted = appointments.filter(a => a.status === 'Completed').length;
  const countCancelled = appointments.filter(a => a.status === 'Cancelled').length;

  return (
    <div className="content-container">
      {/* Editorial Header */}
      <div className="editorial-page-head">
        <div>
          <span className="editorial-tag font-mono">✦ The Appointment Ledger</span>
          <h1 className="editorial-title">Care Visits & Schedule</h1>
          <p className="editorial-subtitle">
            Timeline of upcoming sessions, past care visits, and reservation records.
          </p>
        </div>

        <div>
          <button className="btn-editorial-primary" onClick={onNavigateToServices}>
            + Schedule New Visit
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bookings-filter-tabs">
        <button
          className={`booking-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({countUpcoming})
        </button>
        <button
          className={`booking-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({countCompleted})
        </button>
        <button
          className={`booking-tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled ({countCancelled})
        </button>
        <button
          className={`booking-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Records ({appointments.length})
        </button>
      </div>

      {/* Timeline / Ledger List */}
      {filteredAppointments.length > 0 ? (
        <div className="bookings-ledger-list">
          {filteredAppointments.map((item) => {
            const isUpcoming = item.status === 'Upcoming';

            return (
              <div key={item.id} className="booking-ledger-item">
                {/* Column 1: Date & Time in Space Mono */}
                <div className="ledger-date-cell">
                  <div className="ledger-date-big">{item.date}</div>
                  <div className="ledger-time-slot">🕒 {item.time}</div>
                  <div style={{ marginTop: '8px' }}>
                    <span className={`stamp-badge ${item.status?.toLowerCase() || 'upcoming'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Column 2: Provider & Service details */}
                <div className="ledger-details-cell">
                  <span className="category-tag-chip" style={{ marginBottom: '4px', display: 'inline-block' }}>
                    {item.service}
                  </span>
                  <h3>{item.providerName}</h3>
                  <p>
                    Booked for <strong>{item.petName}</strong> ({item.petType}) • 📍 {item.location || 'Studio'}
                  </p>
                  {item.notes && (
                    <div style={{
                      marginTop: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--charcoal-muted)',
                      fontStyle: 'italic'
                    }}>
                      "{item.notes}"
                    </div>
                  )}
                </div>

                {/* Column 3: Fee in Space Mono */}
                <div className="ledger-price-cell">
                  ₹{item.price}
                </div>

                {/* Column 4: Actions */}
                <div className="ledger-action-cell">
                  {isUpcoming ? (
                    <button
                      className="btn-editorial-danger"
                      onClick={() => onCancelBooking(item.id)}
                    >
                      Cancel Visit
                    </button>
                  ) : (
                    <button
                      className="btn-editorial-secondary btn-editorial-sm"
                      onClick={onNavigateToServices}
                    >
                      Re-book ↗
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="editorial-empty-state">
          <div className="empty-star-symbol">📅</div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
            No {activeTab} bookings recorded
          </h3>
          <p style={{ color: 'var(--charcoal-muted)', marginBottom: '20px' }}>
            {activeTab === 'upcoming'
              ? 'You have no pending care sessions on the calendar. Reserve a grooming or clinic visit today.'
              : `There are currently no ${activeTab} visits in your history.`}
          </p>
          <button className="btn-editorial-primary" onClick={onNavigateToServices}>
            Schedule a Service ✦
          </button>
        </div>
      )}
    </div>
  );
}
