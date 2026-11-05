# 🐾 PetPal – Pet Services Booking Platform

PetPal is a modern, responsive web application built with React, HTML5, and custom CSS. It provides pet owners with a seamless platform to discover, filter, and book local pet care services—including grooming, veterinary consultations, pet boarding, and dog walking.

---

## Features

- **Service Category Filtering**: Filter top-rated local providers instantly by service type (Grooming, Veterinary, Boarding, Walking).
- **Interactive Provider Cards**: View service pricing, customer ratings, locations, and service descriptions.
- **Dynamic Booking Modal**: Modal-driven appointment scheduling with customizable pet profiles (Dog, Cat, Other), dates, and time slots.
- **My Bookings Manager**: View active upcoming appointments with real-time status tracking and cancellation options.
- **Playful & Friendly UI**: Custom CSS styling featuring pastel design tokens, glassmorphism navigation, soft shadows, and smooth card physics.

---



## 📂 Project Structure

```text
PetPal/
├── public/                # Static assets and icons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Header navigation & booking counter badge
│   │   ├── Hero.jsx             # Hero banner with branding title
│   │   ├── ServiceFilter.jsx    # Category filter pills
│   │   ├── ProviderCard.jsx     # Individual provider card UI
│   │   ├── BookingModal.jsx     # Interactive booking modal form
│   │   └── AppointmentsView.jsx # Active bookings manager view
│   ├── data/
│   │   └── petData.js           # Mock provider data and categories
│   ├── App.jsx                  # Main application state and tab routing
│   ├── index.css                # Global styles, variables, and animations
│   └── main.jsx                 # Application entry point
├── index.html             # HTML template root
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
