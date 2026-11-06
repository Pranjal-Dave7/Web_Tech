# PetPal — Pet Care Management Platform

A React-based web application for managing pet profiles, exploring care services, booking appointments, and tracking reservations.

## Tech Stack

- **React 19** – Component-based UI
- **Vite 8** – Development and build tool
- **JavaScript (ES6+)** – Application logic
- **HTML5 & CSS3** – Structure and styling
- **React Hooks** – State and lifecycle management
- **LocalStorage** – Client-side data persistence

## Project Structure

```text
PetPal/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── HomeView.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PetsView.jsx
│   │   ├── PetModal.jsx
│   │   ├── ServicesView.jsx
│   │   ├── BookingModal.jsx
│   │   ├── BookingView.jsx
│   │   ├── ConfirmationModal.jsx
│   │   ├── AuthModal.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   └── petData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Key Features

- Pet profile management with CRUD operations.
- Service directory with search and category filters.
- Appointment booking with date and time selection.
- Booking history, cancellation, and rebooking.
- Editable user profile.
- LocalStorage-based data persistence.

## Implementation

- Functional React components and Hooks (`useState`, `useEffect`).
- Props and component-based architecture.
- Dynamic rendering using `map()` and `filter()`.
- Conditional rendering for modals and booking statuses.
- Responsive layouts using CSS Flexbox and Grid.

## Getting Started

```bash
git clone <repository-url>
cd PetPal
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Build & Testing

```bash
npm run lint
npm run build
```

**Note:** PetPal is a frontend-only academic project. No backend or external database is required.
