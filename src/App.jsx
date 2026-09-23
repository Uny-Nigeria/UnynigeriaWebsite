import React, { useState } from 'react';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import CampusBanner from './components/CampusBanner.jsx';
import EventsSection from './components/EventsSection.jsx';
import EverythingAroundSection from './components/EverythingAroundSection.jsx';
import MapSection from './components/MapSection.jsx';
import BusinessSection from './components/BusinessSection.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import WaitlistModal from './components/WaitlistModal.jsx';

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleOpenWaitlist = () => setIsWaitlistOpen(true);
  const handleCloseWaitlist = () => setIsWaitlistOpen(false);

  return (
    <div className="uny-app">
      {/* Navigation Header */}
      <Header onOpenWaitlist={handleOpenWaitlist} />

      {/* Main Page Content */}
      <main>
        <HeroSection onOpenWaitlist={handleOpenWaitlist} />
        <CampusBanner />
        <EventsSection onOpenWaitlist={handleOpenWaitlist} />
        <EverythingAroundSection onOpenWaitlist={handleOpenWaitlist} />
        <MapSection onOpenWaitlist={handleOpenWaitlist} />
        <BusinessSection onOpenWaitlist={handleOpenWaitlist} />
        <CtaBanner onOpenWaitlist={handleOpenWaitlist} />
      </main>

      {/* Footer */}
      <Footer onOpenWaitlist={handleOpenWaitlist} />

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={handleCloseWaitlist} 
      />
    </div>
  );
}

