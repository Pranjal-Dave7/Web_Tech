import { useState } from 'react';
import { PROVIDERS, SERVICE_CATEGORIES } from '../data/petData';

/**
 * Editorial Services Catalog
 * Distinctive layout for 5 core pet care categories with real-time search & filters.
 */
export function ServicesView({ onBookService }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = PROVIDERS.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="content-container">
      {/* Editorial Header */}
      <div className="editorial-page-head">
        <div>
          <span className="editorial-tag font-mono">✦ The Service Directory</span>
          <h1 className="editorial-title">Independent Care Offerings</h1>
          <p className="editorial-subtitle">
            Explore slow-crafted grooming sessions, low-stress veterinary medicine, prairie boarding retreats, nature trail rambles, and positive canine training.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="services-editorial-filter-bar">
        {/* Search */}
        <div className="editorial-search-wrap">
          <span style={{ fontSize: '1rem', color: 'var(--charcoal-muted)' }}>🔍</span>
          <input
            type="text"
            className="editorial-search-input"
            placeholder="Search by title, location or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="editorial-category-pills">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`editorial-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span> <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="services-catalog-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-catalog-card">
              <div className="service-media-frame">
                <img src={service.image} alt={service.name} className="service-media-img" />
                <span className="category-tag-chip" style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--white)' }}>
                  {service.categoryLabel}
                </span>
                <span className="service-price-badge-mono">
                  ₹{service.price} / {service.duration}
                </span>
              </div>

              <div className="service-catalog-body">
                <h3 className="service-title-lg">{service.name}</h3>
                <div className="service-tagline-text font-mono">
                  ✦ {service.tagline}
                </div>

                <p className="service-desc-text">
                  {service.bio}
                </p>

                <div className="service-footer-row font-mono" style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
                  <span>📍 {service.location}</span>
                  <span>⭐ {service.rating} ({service.reviews})</span>
                </div>

                <button
                  className="btn-editorial-primary"
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={() => onBookService(service)}
                >
                  Book Appointment ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="editorial-empty-state">
          <div className="empty-star-symbol">✦</div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>No offerings found</h3>
          <p style={{ color: 'var(--charcoal-muted)', marginBottom: '20px' }}>
            We could not find any services matching "{searchQuery}". Try selecting "All Offerings" or resetting your search.
          </p>
          <button
            className="btn-editorial-secondary"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
