
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Phone, Heart, ChevronDown, Music, Music2, MessageSquare, Users, Map as MapIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './components/Section';
import { BismillahIcon, RingIcon } from './constants';
import Countdown from './components/Countdown';
import Guestbook from './components/Guestbook';

const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const eventDate = "2026-03-23T13:00:00";
  const address = "65, Jalan KI 5, Taman Krubong Indah, 75250 Melaka";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="relative h-screen main-container no-scrollbar overflow-y-auto">
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      {/* 1. HERO SECTION */}
      <Section id="hero" className="bg-[#f2e6e6]">
        <BismillahIcon />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <Heart className="mx-auto text-[#b07d7d] mb-4 fill-[#b07d7d]/10" />
          <h2 className="text-sm uppercase tracking-[0.4em] text-[#8a6e6e] mb-4">Majlis Pertunangan</h2>
          <h1 className="text-5xl md:text-6xl font-serif-elegant text-[#b07d7d] mb-2">Athirah</h1>
          <span className="text-3xl font-serif-elegant text-[#8a6e6e]">&</span>
          <h1 className="text-5xl md:text-6xl font-serif-elegant text-[#b07d7d] mt-2">Fahmi</h1>
        </motion.div>
        
        <p className="text-xs tracking-[0.2em] text-[#8a6e6e] mb-12 uppercase">Isnin | 23 Mac 2026</p>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToSection('couple')}
          className="cursor-pointer"
        >
          <ChevronDown className="mx-auto text-[#b07d7d]" />
        </motion.div>
      </Section>

      {/* 2. COUPLE SECTION */}
      <Section id="couple" className="bg-white">
         <div className="space-y-12">
           <div>
             <h3 className="font-serif-elegant text-3xl text-[#b07d7d] mb-2">Siti Nur Athirah</h3>
             <p className="text-xs text-[#8a6e6e] italic">Puteri kepada Encik Kamal & Puan Salmah</p>
           </div>
           
           <RingIcon />
           
           <div>
             <h3 className="font-serif-elegant text-3xl text-[#b07d7d] mb-2">Muhammad Fahmi</h3>
             <p className="text-xs text-[#8a6e6e] italic">Putera kepada Encik Idris & Puan Zainab</p>
           </div>
         </div>
         
         <div className="mt-12">
           <p className="text-sm text-[#8a6e6e] italic leading-relaxed px-4">
             "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
             <br />
             <span className="font-bold block mt-2">(Ar-Rum: 21)</span>
           </p>
         </div>
      </Section>

      {/* 3. EVENT SECTION */}
      <Section id="event" className="bg-[#faf5f5]">
        <div className="space-y-8">
          <Calendar className="mx-auto text-[#b07d7d]" />
          <h2 className="text-2xl font-serif-elegant text-[#b07d7d]">Butiran Majlis</h2>
          
          <div className="bg-white/50 p-6 rounded-3xl border border-[#b07d7d]/10 shadow-sm backdrop-blur-sm">
            <p className="font-bold text-[#6b4f4f] mb-1">Isnin</p>
            <p className="text-2xl font-serif-elegant text-[#b07d7d] mb-4">23 Mac 2026</p>
            <p className="text-sm text-[#8a6e6e] mb-6">1:00 Petang - 5:00 Petang</p>
            
            <div className="space-y-4">
              <div className="flex items-start justify-center gap-3 text-left">
                <MapPin size={18} className="text-[#b07d7d] shrink-0 mt-1" />
                <p className="text-sm text-[#6b4f4f] leading-relaxed">
                  {address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#b07d7d] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#a06d6d] transition-colors"
            >
              <MapIcon size={14} /> Google Maps
            </a>
          </div>
          
          <div className="pt-8">
            <Countdown targetDate={eventDate} />
          </div>
        </div>
      </Section>

      {/* 4. GUESTBOOK SECTION */}
      <Section id="guestbook" className="bg-white">
        <MessageSquare className="mx-auto text-[#b07d7d] mb-4" />
        <h2 className="text-2xl font-serif-elegant text-[#b07d7d] mb-8">Ucapan & Doa</h2>
        <Guestbook />
      </Section>

      {/* FIXED BOTTOM NAV BAR - 3 SECTIONS: KENALAN, LOKASI, PLAYLIST */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 inset-x-0 mx-auto z-50 w-[92%] max-w-sm px-2"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-2xl shadow-[#b07d7d]/30 border border-white/50 p-2 flex items-center">
          {/* Section 1: Kenalan */}
          <button 
            onClick={() => setShowContactModal(true)} 
            className="flex-1 flex flex-col items-center justify-center p-2 text-[#6b4f4f] hover:text-[#b07d7d] transition-colors focus:outline-none"
          >
            <Phone size={20} />
            <span className="text-[10px] uppercase font-bold tracking-tighter mt-1">Kenalan</span>
          </button>
          
          {/* Section 2: Lokasi (Featured Center) */}
          <button 
            onClick={() => scrollToSection('event')} 
            className="flex-1 flex flex-col items-center justify-center p-2 text-[#6b4f4f] hover:text-[#b07d7d] transition-colors focus:outline-none border-x border-[#b07d7d]/10"
          >
            <MapIcon size={20} />
            <span className="text-[10px] uppercase font-bold tracking-tighter mt-1">Lokasi</span>
          </button>

          {/* Section 3: Playlist */}
          <button 
            onClick={toggleMusic} 
            className={`flex-1 flex flex-col items-center justify-center p-2 transition-all focus:outline-none ${isMusicPlaying ? 'text-[#b07d7d]' : 'text-[#6b4f4f]'}`}
          >
            <div className={isMusicPlaying ? 'animate-spin-slow' : ''}>
              {isMusicPlaying ? <Music size={20} /> : <Music2 size={20} />}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-tighter mt-1">Playlist</span>
          </button>
        </div>
      </motion.nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xs rounded-[2rem] p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 text-[#8a6e6e] hover:text-[#b07d7d] transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-serif-elegant text-[#b07d7d] mb-6 text-center">Hubungi</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#b07d7d]/10 pb-4">
                  <div>
                    <p className="text-sm font-bold text-[#6b4f4f]">Encik Kamal</p>
                    <p className="text-[10px] text-[#8a6e6e] uppercase tracking-widest">Bapa Athirah</p>
                  </div>
                  <a href="tel:0123456789" className="p-2 bg-[#b07d7d]/10 rounded-full text-[#b07d7d] hover:bg-[#b07d7d]/20 transition-colors">
                    <Phone size={16} />
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-[#6b4f4f]">Puan Salmah</p>
                    <p className="text-[10px] text-[#8a6e6e] uppercase tracking-widest">Ibu Athirah</p>
                  </div>
                  <a href="tel:0123456789" className="p-2 bg-[#b07d7d]/10 rounded-full text-[#b07d7d] hover:bg-[#b07d7d]/20 transition-colors">
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#f2e6e6] pt-12 pb-24 text-center">
        <p className="text-[10px] text-[#8a6e6e] uppercase tracking-[0.3em] mb-2">Terima Kasih</p>
        <p className="text-[8px] text-[#b07d7d] italic opacity-80">Created with much love by Najwa</p>
      </footer>

      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .main-container {
          scroll-behavior: smooth;
        }
        .paper-texture {
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
        }
      `}</style>
    </div>
  );
};

export default App;
