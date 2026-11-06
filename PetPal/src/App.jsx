import { useState, useEffect } from 'react';
import './index.css';
import './App.css';

// Seed Data and LocalStorage Utilities
import {
  STORAGE_KEYS,
  INITIAL_PETS,
  INITIAL_BOOKINGS,
  DEFAULT_USER,
  loadFromStorage,
  saveToStorage,
  resetDemoData
} from './data/petData';

// Shared Components & Modals
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { PetModal } from './components/PetModal';
import { AuthModal } from './components/AuthModal';
import { ConfirmationModal } from './components/ConfirmationModal';

// Streamlined Core Views
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { PetsView } from './components/PetsView';
import { BookingsView } from './components/BookingsView';

/**
 * PetPal Main Application
 * Independent editorial pet care brand with 4 core views:
 * Home, Services, My Pets, and My Bookings.
 */
export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');

  // Persistent Application State
  const [pets, setPets] = useState(() => loadFromStorage(STORAGE_KEYS.PETS, INITIAL_PETS));
  const [appointments, setAppointments] = useState(() => loadFromStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS));
  const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEYS.USER, DEFAULT_USER));

  // Modal States
  const [bookingModalState, setBookingModalState] = useState({
    isOpen: false,
    provider: null,
    preselectedPetId: null
  });

  const [petModalOpen, setPetModalOpen] = useState(false);
  const [petToEdit, setPetToEdit] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    isDangerous: false,
    onConfirm: () => {}
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Synchronize state with localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PETS, pets);
  }, [pets]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BOOKINGS, appointments);
  }, [appointments]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USER, user);
  }, [user]);

  // --------------------------------------------------------------------------
  // Booking Handlers
  // --------------------------------------------------------------------------
  const handleOpenBooking = (provider = null, preselectedPetId = null) => {
    setBookingModalState({
      isOpen: true,
      provider,
      preselectedPetId
    });
  };

  const handleCloseBooking = () => {
    setBookingModalState({
      isOpen: false,
      provider: null,
      preselectedPetId: null
    });
  };

  const handleConfirmBooking = (newAppointment) => {
    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    handleCloseBooking();
    showToast(`Reservation confirmed for ${newAppointment.petName} with ${newAppointment.providerName}!`);
    setActiveTab('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelBooking = (bookingId) => {
    const booking = appointments.find(a => a.id === bookingId);
    setConfirmDialog({
      isOpen: true,
      title: 'Cancel Reservation',
      message: `Are you sure you want to cancel the visit for ${booking?.petName || 'your pet'} with ${booking?.providerName || 'this service'}?`,
      confirmText: 'Yes, Cancel Reservation',
      isDangerous: true,
      onConfirm: () => {
        const updated = appointments.map(a =>
          a.id === bookingId ? { ...a, status: 'Cancelled' } : a
        );
        setAppointments(updated);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        showToast('Reservation has been cancelled.');
      }
    });
  };

  // --------------------------------------------------------------------------
  // Pet Management Handlers
  // --------------------------------------------------------------------------
  const handleOpenAddPet = () => {
    setPetToEdit(null);
    setPetModalOpen(true);
  };

  const handleOpenEditPet = (pet) => {
    setPetToEdit(pet);
    setPetModalOpen(true);
  };

  const handleSavePet = (petData) => {
    const existingIndex = pets.findIndex(p => p.id === petData.id);
    if (existingIndex >= 0) {
      const updated = [...pets];
      updated[existingIndex] = petData;
      setPets(updated);
      showToast(`Updated profile for ${petData.name}.`);
    } else {
      setPets([...pets, petData]);
      showToast(`Registered ${petData.name} in your companion lookbook!`);
    }
  };

  const handleDeletePet = (pet) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete ${pet.name}'s Profile`,
      message: `Are you sure you want to remove ${pet.name} from your companion lookbook?`,
      confirmText: 'Yes, Delete',
      isDangerous: true,
      onConfirm: () => {
        setPets(pets.filter(p => p.id !== pet.id));
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        showToast(`${pet.name} has been removed.`);
      }
    });
  };

  // --------------------------------------------------------------------------
  // Reset Demo Data Handler
  // --------------------------------------------------------------------------
  const handleResetDemoData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reset Demo Data',
      message: 'Restore all pets, appointment ledger records, and parent profile back to initial demonstration values?',
      confirmText: 'Reset to Fresh State',
      isDangerous: false,
      onConfirm: () => {
        resetDemoData();
        setPets(INITIAL_PETS);
        setAppointments(INITIAL_BOOKINGS);
        setUser(DEFAULT_USER);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        showToast('Demonstration data restored successfully!');
      }
    });
  };

  const upcomingCount = appointments.filter(a => a.status === 'Upcoming').length;

  return (
    <div className="app-container font-sans">
      {/* Navigation Masthead */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        upcomingCount={upcomingCount}
        user={user}
        onOpenProfile={() => setAuthModalOpen(true)}
        onOpenBooking={() => handleOpenBooking(null)}
      />

      {/* Main Pages */}
      <main className="page-wrapper">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onBookService={(service) => handleOpenBooking(service)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            onBookService={(service) => handleOpenBooking(service)}
          />
        )}

        {activeTab === 'pets' && (
          <PetsView
            pets={pets}
            onAddPet={handleOpenAddPet}
            onEditPet={handleOpenEditPet}
            onDeletePet={handleDeletePet}
            onBookForPet={(pet) => handleOpenBooking(null, pet.id)}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingsView
            appointments={appointments}
            onCancelBooking={handleCancelBooking}
            onNavigateToServices={() => setActiveTab('services')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onResetDemo={handleResetDemoData}
        onOpenBooking={() => handleOpenBooking(null)}
      />

      {/* Direct Booking Modal */}
      {bookingModalState.isOpen && (
        <BookingModal
          key={bookingModalState.provider?.id || 'booking-modal'}
          provider={bookingModalState.provider}
          pets={pets}
          preselectedPetId={bookingModalState.preselectedPetId}
          onClose={handleCloseBooking}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* Pet Modal */}
      {petModalOpen && (
        <PetModal
          key={petToEdit ? petToEdit.id : 'new-pet'}
          isOpen={petModalOpen}
          petToEdit={petToEdit}
          onClose={() => setPetModalOpen(false)}
          onSavePet={handleSavePet}
        />
      )}

      {/* Profile / Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        user={user}
        onClose={() => setAuthModalOpen(false)}
        onSaveUser={(updatedUser) => {
          setUser(updatedUser);
          showToast('Profile updated!');
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        isDangerous={confirmDialog.isDangerous}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
