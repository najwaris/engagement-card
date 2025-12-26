
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Phone, Heart, ChevronDown, Music, Music2, MessageSquare, Map as MapIcon, X, Play, Pause, SkipForward, SkipBack, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Section from './components/Section';
import { BismillahIcon, RingIcon, FloralCorner } from './constants';
import Countdown from './components/Countdown';
import Guestbook from './components/Guestbook';

const SONGS = [
  {
    title: "Beautiful In White (Piano)",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Chapter_One_Cold/Kai_Engel_-_04_-_Moonlight_Reprise.mp3",
  },
  {
    title: "A Thousand Years (Piano)",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Can't Help Falling In Love (Piano)",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  }
];

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const eventDate = "2026-03-23T13:00:00";
  const address = "65, Jalan KI 5, Taman Krubong Indah, 75250 Melaka";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleOpenInvitation = () => {
    setIsOpen(true);
    
    // Start Music
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => {});
    }

    // Haptic
    if (navigator.vibrate) navigator.vibrate(50);
    
    // Initial celebration
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C87374', '#e2b1b1', '#ffffff']
      });
    }, 800);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(10);
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

  const changeSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsMusicPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSongIndex]);

  return (
    <div className="relative h-screen main-container no-scrollbar overflow-y-auto bg-[#fdf6f6]">
      <audio ref={audioRef} loop src={SONGS[currentSongIndex].url} />

      {/* GATE OPENING TRANSITION COVER */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            exit={{ pointerEvents: "none" }}
          >
             {/* Left Gate Panel */}
             <motion.div 
               initial={{ x: 0 }}
               exit={{ x: "-100%" }}
               transition={{ duration: 1.8, ease: [0.45, 0, 0.55, 1] }}
               className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#fdf3f3] border-r border-[#C87374]/10 shadow-2xl z-10 overflow-hidden flex flex-col justify-between paper-texture"
             >
                <div className="p-4 opacity-20 -ml-8 -mt-8 rotate-[-15deg]">
                  <FloralCorner className="w-64 h-64" />
                </div>
                <div className="flex-grow"></div>
             </motion.div>

             {/* Right Gate Panel */}
             <motion.div 
               initial={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ duration: 1.8, ease: [0.45, 0, 0.55, 1] }}
               className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#fdf3f3] border-l border-[#C87374]/10 shadow-2xl z-10 overflow-hidden flex flex-col justify-between paper-texture"
             >
                <div className="flex-grow"></div>
                <div className="p-4 opacity-20 -mr-8 -mb-8 rotate-[165deg] self-end">
                  <FloralCorner className="w-64 h-64" />
                </div>
             </motion.div>

             {/* Center Circular Button / Seal */}
             <motion.div 
               initial={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.8, ease: "easeInOut" } }}
               className="relative z-[110]"
             >
                <button 
                  onClick={handleOpenInvitation}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/90 backdrop-blur-md border-2 border-white/50 shadow-[0_15px_60px_rgba(200,115,116,0.25)] flex flex-col items-center justify-center group transition-all duration-700 hover:shadow-[0_20px_80px_rgba(200,115,116,0.35)] hover:scale-[1.03] active:scale-95 animate-float"
                >
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     transition={{ delay: 0.5 }}
                     className="flex flex-col items-center justify-center space-y-2"
                   >
                     <div className="text-[#C87374] opacity-40 mb-1">
                        <Heart size={20} fill="currentColor" />
                     </div>
                     <span className="font-script text-4xl md:text-5xl text-[#C87374] drop-shadow-sm px-4">Athirah</span>
                     <span className="font-serif-elegant text-l md:text-xl text-[#8a6e6e]/50 italic tracking-widest">&</span>
                     <span className="font-script text-4xl md:text-5xl text-[#C87374] drop-shadow-sm px-4">Fahmi</span>
                   </motion.div>
                   
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex flex-col items-center"
                   >
                     <div className="h-px w-8 bg-[#C87374]/20 mb-2" />
                     <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#8a6e6e] font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                       BUKA JEMPUTAN
                     </span>
                   </motion.div>
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT - Only fully visible when isOpen is true */}
      <main className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        {/* 1. HERO SECTION */}
        <Section id="hero" className="bg-[#fdf3f3]">
          <BismillahIcon />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-12 relative"
          >
            <div className="relative inline-block mb-8">
               <Heart className="mx-auto text-[#C87374] fill-[#C87374]/10 animate-float" size={32} />
               <div className="absolute inset-0 bg-[#C87374]/5 blur-2xl rounded-full" />
            </div>
            <h2 className="text-[11px] uppercase font-bold tracking-[0.6em] text-[#8a6e6e] mb-8 opacity-80">Majlis Pertunangan</h2>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-serif-elegant text-[#C87374] tracking-tighter">Athirah</h1>
              <div className="flex items-center justify-center gap-4 py-2">
                <span className="h-px w-8 bg-[#C87374]/20" />
                <span className="text-4xl font-serif-elegant text-[#8a6e6e] italic opacity-40">&</span>
                <span className="h-px w-8 bg-[#C87374]/20" />
              </div>
              <h1 className="text-6xl font-serif-elegant text-[#C87374] tracking-tighter">Fahmi</h1>
            </div>
          </motion.div>
          
          <div className="bg-white/30 backdrop-blur-md px-6 py-2 rounded-full inline-block mb-12 border border-white/50">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#8a6e6e] uppercase italic">Isnin | 23 . 03 . 2026</p>
          </div>
          
          <div className="max-w-[280px] mx-auto mb-16 relative">
            <QuoteIcon className="absolute -left-4 -top-4 opacity-10 text-[#C87374]" />
            <p className="text-xs text-[#8a6e6e] italic leading-relaxed font-medium">
              "Dan Kami menciptakan kamu berpasang-pasangan."
              <br />
              <span className="font-bold opacity-90 mt-2 block">— Surah An-Naba (78:8)</span>
            </p>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            onClick={() => scrollToSection('couple')}
            className="cursor-pointer group flex flex-col items-center"
          >
            <span className="text-[9px] uppercase tracking-widest text-[#8a6e6e] opacity-40 mb-2 group-hover:opacity-100 transition-opacity">Tatal ke Bawah</span>
            <ChevronDown className="text-[#C87374]/30 group-hover:text-[#C87374] transition-colors" />
          </motion.div>
        </Section>

        {/* 2. COUPLE SECTION */}
        <Section id="couple" className="bg-white">
          <div className="space-y-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h3 className="font-serif-elegant text-4xl text-[#C87374] mb-3">Siti Nur Athirah</h3>
              <p className="text-[10px] text-[#8a6e6e] uppercase tracking-[0.3em] font-bold">Puteri kepada</p>
              <p className="text-xs text-[#8a6e6e] italic mt-2 font-medium">Encik Isnin Bin Katsubi & Puan Amirohaida Binti Mahaidin</p>
            </motion.div>
            
            <div className="relative py-8">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#C87374]/5 rounded-full blur-3xl animate-pulse" />
              <RingIcon />
            </div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h3 className="font-serif-elegant text-4xl text-[#C87374] mb-3">Muhammad Fahmi</h3>
              <p className="text-[10px] text-[#8a6e6e] uppercase tracking-[0.3em] font-bold">Putera kepada</p>
              <p className="text-xs text-[#8a6e6e] italic mt-2 font-medium">Encik Saleh & Puan (Placeholder)</p>
            </motion.div>
          </div>
        </Section>

        {/* 3. PRAYER SECTION */}
        <Section id="prayer" className="bg-[#faf5f5]">
          <div className="py-12 px-6 space-y-12">
            <div className="space-y-3">
              <p className="text-[11px] text-[#C87374] font-bold uppercase tracking-[0.3em]">Cincin sebentuk tanda muafakat</p>
              <p className="text-[11px] text-[#C87374] font-bold uppercase tracking-[0.3em]">Cincin dua bentuk tanda terikat</p>
            </div>

            <div className="glass p-8 rounded-[3rem] shadow-2xl shadow-[#C87374]/5">
              <div className="space-y-6 max-w-xs mx-auto">
                <p className="text-sm text-[#6b4f4f] leading-relaxed font-medium">
                  Ya Allah, berkatilah pertunangan ini, limpahkan baraqah dan rahmat kepada pasangan ini.
                </p>
                <p className="text-sm text-[#6b4f4f] leading-relaxed font-medium">
                  Teguhkanlah hati dan keimanan mereka terhadapmu Ya Allah.
                </p>
                <p className="text-sm text-[#6b4f4f] leading-relaxed font-medium">
                  Kekalkanlah ikatan pertunangan mereka sehingga hari perkahwinan.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-4xl font-serif-elegant text-[#C87374] drop-shadow-sm">آمِيْن اَللّهُمَّ آمِيْن</p>
              <p className="text-[10px] text-[#8a6e6e] uppercase tracking-[0.2em] mt-4 font-bold opacity-60">Amin Allahumma Amin</p>
            </div>
          </div>
        </Section>

        {/* 4. EVENT SECTION */}
        <Section id="event" className="bg-white">
          <div className="space-y-12">
            <div className="relative inline-block">
              <Calendar className="mx-auto text-[#C87374] opacity-80" size={28} />
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#C87374] rounded-full animate-ping opacity-20" />
            </div>
            <h2 className="text-3xl font-serif-elegant text-[#C87374]">Butiran Majlis</h2>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-10 rounded-[3rem] shadow-2xl shadow-[#C87374]/10 border border-[#C87374]/10 relative overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C87374]/5 rounded-full blur-3xl group-hover:bg-[#C87374]/10 transition-colors" />
              
              <p className="font-bold text-[#C87374] tracking-[0.5em] uppercase text-[10px] mb-4">Isnin</p>
              <p className="text-4xl font-serif-elegant text-[#6b4f4f] mb-6">23 Mac 2026</p>
              
              <div className="h-px w-16 bg-[#C87374]/20 mx-auto mb-8" />
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="text-center">
                    <p className="text-[9px] uppercase tracking-widest text-[#8a6e6e] font-bold mb-1">Majlis</p>
                    <p className="text-xl font-serif-elegant text-[#C87374]">1.00 PM</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] uppercase tracking-widest text-[#8a6e6e] font-bold mb-1">Selesai</p>
                    <p className="text-xl font-serif-elegant text-[#C87374]">4.00 PM</p>
                </div>
              </div>
              
              <div className="space-y-6 pt-8 border-t border-[#C87374]/5">
                <div className="flex flex-col items-center text-center">
                  <MapPin size={20} className="text-[#C87374] mb-3" />
                  <p className="text-xs text-[#6b4f4f] leading-loose font-semibold tracking-wide">
                    65, Jalan KI 5, Taman Krubong Indah,<br />75250 Melaka
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-6">
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(200 115 116 / 0.3)" }}
                whileTap={{ scale: 0.95 }}
                href={mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#C87374] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl shadow-[#C87374]/20 transition-all"
              >
                <MapIcon size={16} /> Buka Peta Lokasi
              </motion.a>
              <p className="text-[9px] text-[#8a6e6e] opacity-40 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <Info size={10} /> Sila guna Waze atau Google Maps
              </p>
            </div>
            
            <div className="pt-12">
              <Countdown targetDate={eventDate} />
            </div>
          </div>
        </Section>

        {/* 5. GUESTBOOK SECTION */}
        <Section id="guestbook" className="bg-[#faf5f5]">
          <div className="relative mb-8 inline-block">
            <MessageSquare className="mx-auto text-[#C87374] opacity-80" size={28} />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-1 -right-1 w-2 h-2 bg-[#C87374] rounded-full" />
          </div>
          <h2 className="text-3xl font-serif-elegant text-[#C87374] mb-12">Ucapan & Doa</h2>
          <Guestbook onWishAdded={() => {
            confetti({
              particleCount: 80,
              spread: 50,
              origin: { y: 0.8 },
              colors: ['#C87374', '#e2b1b1']
            });
            if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
          }} />
        </Section>

        <footer className="bg-[#faf5f5] pt-16 pb-32 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C87374]/20 to-transparent" />
          <p className="text-[10px] text-[#8a6e6e] uppercase tracking-[0.4em] mb-6 font-bold opacity-60 italic">Sekalung Penghargaan & Terima Kasih</p>
          <div className="flex flex-col items-center gap-2 opacity-40">
            <Heart size={14} className="text-[#C87374] fill-[#C87374]" />
            <p className="text-[9px] text-[#C87374] font-semibold tracking-widest">Designed with love by Najwa</p>
          </div>
        </footer>
      </main>

      {/* FLOATING NAVIGATION */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={isOpen ? { y: 0 } : { y: 100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-8 inset-x-0 mx-auto z-50 w-[90%] max-w-sm"
      >
        <div className="glass rounded-3xl shadow-2xl shadow-black/10 p-1.5 flex items-center justify-around">
          <NavButton icon={<Phone size={20} />} label="Kenalan" onClick={() => setShowContactModal(true)} />
          <NavButton icon={<MapIcon size={20} />} label="Lokasi" onClick={() => scrollToSection('event')} />
          <NavButton 
            icon={isMusicPlaying ? <Music size={20} className="text-[#C87374]" /> : <Music2 size={20} />} 
            label="Lagu" 
            onClick={() => setShowPlaylistModal(true)} 
            active={isMusicPlaying}
          />
        </div>
      </motion.nav>

      {/* MODALS */}
      <AnimatePresence>
        {showContactModal && (
          <Modal title="Hubungi Kami" onClose={() => setShowContactModal(false)}>
            <div className="space-y-6 py-4">
              <ContactItem name="Encik Isnin" role="Bapa Athirah" phone="0123456789" />
              <ContactItem name="Puan Amirohaida" role="Ibu Athirah" phone="0123456789" />
            </div>
          </Modal>
        )}
        
        {showPlaylistModal && (
          <Modal title="Senarai Lagu" onClose={() => setShowPlaylistModal(false)}>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {SONGS.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => changeSong(idx)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${currentSongIndex === idx ? 'bg-[#C87374]/10 text-[#C87374] border border-[#C87374]/20' : 'hover:bg-black/5'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentSongIndex === idx ? 'bg-[#C87374] text-white' : 'bg-[#C87374]/10'}`}>
                    {currentSongIndex === idx && isMusicPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="currentColor" />}
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xs font-bold leading-tight">{song.title}</p>
                    {currentSongIndex === idx && <p className="text-[9px] uppercase tracking-widest mt-1 opacity-60">Sedang Dimainkan</p>}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 border-t border-black/5 mt-6">
               <SkipBack size={22} className="cursor-pointer opacity-40 hover:opacity-100" onClick={() => changeSong((currentSongIndex - 1 + SONGS.length) % SONGS.length)} />
               <button onClick={toggleMusic} className="w-14 h-14 bg-[#C87374] text-white rounded-full flex items-center justify-center shadow-lg">
                 {isMusicPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
               </button>
               <SkipForward size={22} className="cursor-pointer opacity-40 hover:opacity-100" onClick={() => changeSong((currentSongIndex + 1) % SONGS.length)} />
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .main-container {
          scroll-behavior: smooth;
        }
        .glass {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .paper-texture {
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
        }
      `}</style>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }> = ({ icon, label, onClick, active }) => (
  <motion.button 
    whileTap={{ scale: 0.9 }}
    onClick={onClick} 
    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all ${active ? 'bg-[#C87374]/5' : ''}`}
  >
    <div>{icon}</div>
    <span className="text-[9px] uppercase font-bold tracking-tighter mt-1.5 opacity-60">{label}</span>
  </motion.button>
);

const Modal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white w-full max-w-xs rounded-[2.5rem] p-10 relative shadow-2xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8">
        <X size={20} className="cursor-pointer text-[#8a6e6e] hover:text-[#C87374]" onClick={onClose} />
      </div>
      <h3 className="text-2xl font-serif-elegant text-[#C87374] mb-8 text-center">{title}</h3>
      {children}
    </motion.div>
  </motion.div>
);

const ContactItem: React.FC<{ name: string; role: string; phone: string }> = ({ name, role, phone }) => (
  <div className="flex justify-between items-center bg-[#faf5f5] p-4 rounded-2xl border border-[#C87374]/5">
    <div>
      <p className="text-sm font-bold text-[#6b4f4f]">{name}</p>
      <p className="text-[9px] text-[#8a6e6e] uppercase tracking-widest font-semibold mt-0.5">{role}</p>
    </div>
    <a href={`tel:${phone}`} className="p-3 bg-[#C87374] rounded-full text-white shadow-lg shadow-[#C87374]/20">
      <Phone size={14} />
    </a>
  </div>
);

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12M3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56888 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56888 8 8.0166 8H4.0166C3.46432 8 3.0166 8.44772 3.0166 9V12" />
  </svg>
);

export default App;
