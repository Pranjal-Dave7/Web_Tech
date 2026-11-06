import { PROVIDERS, TESTIMONIALS } from '../data/petData';

/**
 * Editorial Home View
 * Indian independent magazine-style landing page for PetPal (Surat, Ahmedabad & Vadodara).
 */
export function HomeView({ setActiveTab, onBookService }) {
  // Featured service: The Pawlor, Vesu
  const featuredService = PROVIDERS[0];
  const secondaryServices = PROVIDERS.slice(1, 4);

  return (
    <div className="home-view">
      {/* 1. Bold Editorial Hero Section */}
      <section className="editorial-hero">
        <div className="content-container">
          <div className="hero-editorial-grid">
            <div className="hero-left-block">
              <div className="hero-kicker-strip">
                <span className="hero-kicker-label">Vol. 04 — Gujarat Care Issue</span>
                <span className="hero-issue-no font-mono">✦ Surat • Ahmedabad • Vadodara</span>
              </div>

              <h1 className="hero-headline">
                Good days start with <span className="serif-italic">happy paws.</span>
              </h1>

              <p className="hero-narrative">
                PetPal is an independent pet-care collective founded in Surat. We connect loving pet parents with cage-free bathhouses like <strong>The Pawlor</strong>, gentle checkups at <strong>Fur-st Clinic</strong>, cozy homestyle stays at <strong>Paws & Pillows</strong>, and trail walks with <strong>Walkies with Wagh</strong>.
              </p>

              <div className="hero-cta-group">
                <button
                  className="btn-editorial-primary"
                  onClick={() => setActiveTab('services')}
                >
                  Explore Offerings ✦
                </button>
                <button
                  className="btn-editorial-secondary"
                  onClick={() => setActiveTab('pets')}
                >
                  My Companions
                </button>
              </div>

              {/* Editorial Ledger / Statistics */}
              <div className="hero-ledger-strip">
                <div className="hero-ledger-cell">
                  <h4>4,800+</h4>
                  <p>Gentle Care Visits</p>
                </div>
                <div className="hero-ledger-cell">
                  <h4>100%</h4>
                  <p>Cageless Philosophy</p>
                </div>
                <div className="hero-ledger-cell">
                  <h4>4.9 / 5</h4>
                  <p>Parent Rating Score</p>
                </div>
              </div>
            </div>

            {/* Overlapping Visual Photo Block */}
            <div className="hero-visual-card">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80"
                alt="Golden retriever relaxed during a gentle grooming visit"
                className="hero-visual-img"
              />
              <div className="hero-photo-caption">
                <span>PLATE NO. 24 — BRUNO AT THE PAWLOR</span>
                <span>VESU, SURAT • 2026</span>
              </div>

              {/* Overlapping Callout Stamp */}
              <div className="hero-overlap-ticket">
                <h5>The Pawlor • Vesu</h5>
                <p>Herbal neem washes, paw balms & zero stainless steel cages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Printed Ribbon Ticker Strip */}
      <div className="printed-ticker-ribbon">
        <div className="ticker-content-track">
          <div className="ticker-item">
            <span>✦ Independent Pet Care Brand</span>
            <span className="ticker-dot">•</span>
            <span>The Pawlor (Vesu)</span>
            <span className="ticker-dot">•</span>
            <span>Fur-st Clinic (City Light)</span>
            <span className="ticker-dot">•</span>
            <span>Paws & Pillows (Piplod)</span>
            <span className="ticker-dot">•</span>
            <span>Walkies with Wagh (Adajan)</span>
            <span className="ticker-dot">•</span>
            <span>Sit Happens Academy (Satellite)</span>
            <span className="ticker-dot">•</span>
            <span>The Jhunjhunwala Store (Alkapuri)</span>
            <span className="ticker-dot">•</span>
            <span>Surat • Ahmedabad • Vadodara</span>
          </div>
        </div>
      </div>

      {/* 3. Popular Offerings: Asymmetric Editorial Showcase */}
      <section className="editorial-section">
        <div className="content-container">
          <div className="section-editorial-header">
            <div>
              <span className="editorial-tag font-mono">✦ Selected Offerings</span>
              <h2 className="section-head-title">Curated Care for Fine Companions</h2>
            </div>
            <button
              className="btn-editorial-secondary btn-editorial-sm"
              onClick={() => setActiveTab('services')}
            >
              View All Services →
            </button>
          </div>

          <div className="editorial-services-grid">
            {/* Featured Left Card: The Pawlor */}
            <div className="featured-service-block">
              <img
                src={featuredService.image}
                alt={featuredService.name}
                className="featured-service-img"
              />
              <div className="featured-service-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="category-tag-chip">{featuredService.categoryLabel}</span>
                  <span className="font-mono" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--tomato)' }}>
                    ₹{featuredService.price} / {featuredService.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.75rem', marginBottom: '6px' }}>
                  {featuredService.name}
                </h3>
                <p className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', marginBottom: '14px' }}>
                  📍 {featuredService.location} • ⭐ {featuredService.rating} ({featuredService.reviews} reviews)
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-soft)', lineHeight: '1.55', marginBottom: '24px' }}>
                  {featuredService.bio}
                </p>

                <button
                  className="btn-editorial-primary"
                  onClick={() => onBookService(featuredService)}
                >
                  Book Session at The Pawlor ↗
                </button>
              </div>
            </div>

            {/* Secondary Right Column: Fur-st Clinic, Paws & Pillows, Walkies with Wagh */}
            <div className="services-secondary-col">
              {secondaryServices.map((service) => (
                <div key={service.id} className="service-mini-card">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="service-mini-img"
                  />
                  <div className="service-mini-info">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="category-tag-chip">{service.categoryLabel}</span>
                        <span className="font-mono" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--tomato)' }}>
                          ₹{service.price}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', margin: '3px 0' }}>{service.name}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', lineHeight: '1.4' }}>
                        📍 {service.location} • {service.tagline}
                      </p>
                    </div>

                    <button
                      className="btn-editorial-secondary btn-editorial-sm"
                      style={{ alignSelf: 'flex-start', marginTop: '10px' }}
                      onClick={() => onBookService(service)}
                    >
                      Book Visit ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Creative "Why PetPal?" Poster Manifesto */}
      <section className="manifesto-section">
        <div className="content-container">
          <div className="manifesto-grid">
            <div className="manifesto-header-block">
              <span className="font-mono" style={{ color: 'var(--butter-yellow)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ✦ The PetPal Manifesto
              </span>
              <h2>We believe pet care should feel like family, not an assembly line.</h2>
              <p>
                From Tapi Riverfront morning walks to gentle checkups in City Light, PetPal is built with warmth, local love, and an unwavering commitment to low-stress handling.
              </p>
            </div>

            <div className="manifesto-rules-list">
              <div className="manifesto-rule-card">
                <span className="rule-number">PRINCIPLE NO. 01</span>
                <h3>Cage-Free Sanctuary</h3>
                <p>Animals belong on soft rugs, sunlit balconies, and grassy yards at Paws & Pillows—never locked inside cold metal crates.</p>
              </div>

              <div className="manifesto-rule-card">
                <span className="rule-number">PRINCIPLE NO. 02</span>
                <h3>Floor-First Consultations</h3>
                <p>At Fur-st Clinic, our veterinarians sit on the rug, offer treats, and wait until Bruno and Mishti feel safe before beginning.</p>
              </div>

              <div className="manifesto-rule-card">
                <span className="rule-number">PRINCIPLE NO. 03</span>
                <h3>Local & Transparent</h3>
                <p>No hidden commissions or automated call bots. Direct scheduling with trusted, verified caregivers in Surat, Ahmedabad & Vadodara.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scrapbook Parent Journal (Testimonials) */}
      <section className="editorial-section">
        <div className="content-container">
          <div className="section-editorial-header">
            <div>
              <span className="editorial-tag font-mono">✦ Parent Journal</span>
              <h2 className="section-head-title">Dispatches From Fellow Pet Parents</h2>
            </div>
            <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>
              Verified Reviews • Surat & Gujarat Edition
            </span>
          </div>

          <div className="scrapbook-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="scrapbook-card">
                <div>
                  <div className="scrapbook-pin-tag">✦ {item.tag}</div>
                  <p className="scrapbook-quote">"{item.quote}"</p>
                </div>

                <div className="scrapbook-author-row">
                  <img src={item.petAvatar} alt={item.author} className="scrapbook-pet-avatar" />
                  <div className="scrapbook-author-meta">
                    <h5>{item.author} ({item.pet})</h5>
                    <span>{item.city} • Verified Pet Parent</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial Pre-Footer Callout Block */}
      <section className="content-container" style={{ padding: '60px 28px' }}>
        <div style={{
          background: 'var(--tomato)',
          border: 'var(--border-editorial)',
          boxShadow: 'var(--shadow-offset-lg)',
          padding: '48px 36px',
          color: 'var(--white)',
          textAlign: 'center'
        }}>
          <span className="font-mono" style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--charcoal)', color: 'var(--cream)', padding: '3px 8px' }}>
            Ready for your companion?
          </span>
          <h2 style={{ fontSize: '3rem', color: 'var(--white)', margin: '16px 0 14px' }}>
            Give Bruno, Mishti or Simba the care they deserve.
          </h2>
          <p style={{ maxWidth: '580px', margin: '0 auto 28px', color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.05rem' }}>
            Book a soothing herbal bath at The Pawlor, reserve a consultation at Fur-st Clinic, or schedule an Adajan trail walk with Walkies with Wagh in under two minutes.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-editorial-secondary"
              style={{ background: 'var(--charcoal)', color: 'var(--cream)', borderColor: 'var(--charcoal)' }}
              onClick={() => setActiveTab('services')}
            >
              Browse All Services ↗
            </button>
            <button
              className="btn-editorial-secondary"
              onClick={() => setActiveTab('pets')}
            >
              Register Your Pet 🐾
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
