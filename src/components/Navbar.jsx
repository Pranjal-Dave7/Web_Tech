import { useState } from 'react';

/**
 * Editorial Navbar Masthead
 * Playful independent masthead with clean navigation and direct booking action.
 */
export function Navbar({
  activeTab,
  setActiveTab,
  upcomingCount = 0,
  user,
  onOpenProfile,
  onOpenBooking
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Temporarily trimmed to 2 navigation items for initial commit
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pets', label: 'My Pets' },
    { id: 'bookings', label: 'My Bookings', badge: upcomingCount }
  ];

  return (
    <nav className="editorial-navbar">
      <div className="navbar-inner-row">
        {/* Brand Masthead */}
        <div className="brand-masthead" onClick={() => handleNavClick('home')}>
          <span className="brand-symbol">✦</span>
          <span className="brand-text">PetPal</span>
          <span className="brand-edition-tag">Care Studio</span>
        </div>

        {/* Desktop Links */}
        <div className="nav-links-row">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`editorial-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span>{item.label}</span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span
                  style={{
                    marginLeft: '6px',
                    background: activeTab === item.id ? 'var(--butter-yellow)' : 'var(--tomato)',
                    color: activeTab === item.id ? 'var(--charcoal)' : 'var(--white)',
                    padding: '1px 6px',
                    fontSize: '0.7rem',
                    borderRadius: '2px'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* Book Appointment CTA */}
          <button
            className="btn-editorial-primary btn-editorial-sm"
            onClick={() => onOpenBooking(null)}
          >
            Book Care ↗
          </button>

          {/* User Profile Pill */}
          <div className="nav-profile-pill" onClick={onOpenProfile} title="Parent Profile">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt="User Avatar"
              className="nav-avatar-mini"
            />
            <span className="nav-profile-name">{user?.name?.split(' ')[0] || 'Ananya'}</span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-box ${mobileMenuOpen ? 'open' : ''}`}>
        <div
          className="nav-profile-pill"
          style={{ width: '100%', marginBottom: '8px', justifyContent: 'center' }}
          onClick={() => {
            onOpenProfile();
            setMobileMenuOpen(false);
          }}
        >
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
            alt="User Avatar"
            className="nav-avatar-mini"
          />
          <span className="nav-profile-name">{user?.name || 'Ananya Shah'} (View Profile)</span>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-drawer-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span>{item.label}</span>
            {typeof item.badge === 'number' && item.badge > 0 && (
              <span className="stamp-badge upcoming">{item.badge} Active</span>
            )}
          </button>
        ))}

        <button
          className="btn-editorial-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
          onClick={() => {
            onOpenBooking(null);
            setMobileMenuOpen(false);
          }}
        >
          Book An Appointment ↗
        </button>
      </div>
    </nav>
  );
}
