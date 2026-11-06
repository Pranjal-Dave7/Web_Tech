export function Footer({ setActiveTab, onResetDemo, onOpenBooking }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="editorial-footer">
      <div className="content-container">
        <div className="footer-columns-grid">
          {/* 1: Brand Story */}
          <div>
            <div className="footer-brand-serif">
              ✦ PetPal
            </div>
            <p className="footer-kicker-text" style={{ marginBottom: '14px' }}>
              "Good days start with happy paws." An independent pet care collective operating across Surat, Ahmedabad, and Vadodara. Gentle grooming, unhurried veterinary care, homestyle cageless boarding, and positive behavioral mentorship.
            </p>
            <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--charcoal-faint)' }}>
              VESU & ADAJAN, SURAT • GUJARAT, INDIA
            </p>
          </div>

          {/* 2: Navigation */}
          <div>
            <h4 className="footer-col-headline">Index</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => handleNav('home')}>Front Page (Home)</button></li>
              <li><button onClick={() => handleNav('services')}>Care Services</button></li>
              <li><button onClick={() => handleNav('pets')}>Companion Lookbook</button></li>
              <li><button onClick={() => handleNav('bookings')}>Appointment Ledger</button></li>
              <li><button onClick={() => onOpenBooking(null)}>Direct Reservation</button></li>
            </ul>
          </div>

          {/* 3: Care Services */}
          <div>
            <h4 className="footer-col-headline">Featured Offerings</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => handleNav('services')}>The Pawlor — Vesu, Surat</button></li>
              <li><button onClick={() => handleNav('services')}>Fur-st Clinic — City Light, Surat</button></li>
              <li><button onClick={() => handleNav('services')}>Paws & Pillows — Piplod, Surat</button></li>
              <li><button onClick={() => handleNav('services')}>Walkies with Wagh — Adajan, Surat</button></li>
              <li><button onClick={() => handleNav('services')}>Sit Happens Academy — Ahmedabad</button></li>
              <li><button onClick={() => handleNav('services')}>The Jhunjhunwala Store — Vadodara</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} PetPal • Independent Pet Care Brand • Surat & Gujarat
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span>Testing the demo?</span>
            <button
              className="btn-editorial-reset"
              onClick={onResetDemo}
              title="Restores clean initial seed data for pets and bookings"
            >
              🔄 Reset Demo Data
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
