
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Phone, Heart, ChevronDown, Music, Music2, MessageSquare, Users, Map as MapIcon, X, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './components/Section';
import { BismillahIcon, RingIcon } from './constants';
import Countdown from './components/Countdown';
import Guestbook from './components/Guestbook';

const SONGS = [
  {
    title: "Beautiful In White (Piano)",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Chapter_One_Cold/Kai_Engel_-_04_-_Moonlight_Reprise.mp3", // Representative piano track
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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const eventDate = "2026-03-23T13:00:00";
  const address = "65, Jalan KI 5, Taman Krubong Indah, 75250 Melaka";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // Handle Autoplay - Browsers block autoplay without interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isMusicPlaying) {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(() => {
          console.log("Autoplay blocked, waiting for more explicit interaction.");
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

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

  const changeSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsMusicPlaying(true);
    // Audio source change is handled by the ref and re-render
  };

  useEffect(() => {
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
  }, [currentSongIndex]);

  return (
    <div className="relative h-screen main-container no-scrollbar overflow-y-auto">
      <audio 
        ref={audioRef} 
        loop 
        src={SONGS[currentSongIndex].url} 
      />

      {/* 1. HERO SECTION (PDF Page 1 Style) */}
      <Section id="hero" className="bg-[#fdf3f3]">
        <BismillahIcon />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="relative inline-block mb-4">
             <Heart className="mx-auto text-[#C87374] fill-[#C87374]/10" />
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -top-1 -right-1"
             >
               <div className="w-2 h-2 bg-[#C87374] rounded-full" />
             </motion.div>
          </div>
          <h2 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#8a6e6e] mb-6">Majlis Pertunangan</h2>
          <h1 className="text-5xl font-serif-elegant text-[#C87374] mb-2 tracking-tight">Athirah</h1>
          <span className="text-3xl font-serif-elegant text-[#8a6e6e] opacity-60 italic">&</span>
          <h1 className="text-5xl font-serif-elegant text-[#C87374] mt-2 tracking-tight">Fahmi</h1>
        </motion.div>
        
        <p className="text-xs font-bold tracking-[0.3em] text-[#8a6e6e] mb-6 uppercase">Isnin | 23 . 03 . 2026</p>
        
        <div className="max-w-[250px] mx-auto mb-12">
          <p className="text-[11px] text-[#8a6e6e] italic leading-relaxed">
            "And We created you in pairs."
            <br />
            <span className="font-bold opacity-80">— Surah An-Naba (78:8)</span>
          </p>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToSection('couple')}
          className="cursor-pointer"
        >
          <ChevronDown className="mx-auto text-[#C87374]/50" />
        </motion.div>
      </Section>

      {/* 2. COUPLE SECTION (PDF Page 3 Data) */}
      <Section id="couple" className="bg-white">
         <div className="space-y-12">
           <div>
             <h3 className="font-serif-elegant text-3xl text-[#C87374] mb-2">Athirah</h3>
             <p className="text-[10px] text-[#8a6e6e] uppercase tracking-widest font-bold">Puteri kepada</p>
             <p className="text-xs text-[#8a6e6e] italic mt-1">Encik Isnin Bin Katsubi & Puan Amirohaida Binti Mahaidin</p>
           </div>
           
           <div className="relative py-4">
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#C87374]/5 rounded-full blur-xl" />
             <RingIcon />
           </div>
           
           <div>
             <h3 className="font-serif-elegant text-3xl text-[#C87374] mb-2">Muhammad Fahmi</h3>
             <p className="text-[10px] text-[#8a6e6e] uppercase tracking-widest font-bold">Putera kepada</p>
             <p className="text-xs text-[#8a6e6e] italic mt-1">Encik Saleh & Puan (Placeholder)</p>
           </div>
         </div>
      </Section>

      {/* 3. PRAYER SECTION (PDF Page 5 Data) */}
      <Section id="prayer" className="bg-[#faf5f5] relative overflow-hidden">
        <div className="py-8 px-4 space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] text-[#C87374] font-bold uppercase tracking-[0.2em]">Cincin sebentuk tanda muafakat</p>
            <p className="text-[10px] text-[#C87374] font-bold uppercase tracking-[0.2em]">Cincin dua bentuk tanda terikat</p>
          </div>

          <BismillahIcon />

          <div className="space-y-4 max-w-xs mx-auto">
            <p className="text-sm text-[#6b4f4f] leading-relaxed">
              Ya Allah, berkatilah pertunangan ini, limpahkan baraqah dan rahmat kepada pasangan ini.
            </p>
            <p className="text-sm text-[#6b4f4f] leading-relaxed">
              Teguhkanlah hati dan keimanan mereka terhadapmu Ya Allah.
            </p>
            <p className="text-sm text-[#6b4f4f] leading-relaxed">
              Kekalkanlah ikatan pertunangan mereka sehingga hari perkahwinan.
            </p>
          </div>

          <div className="pt-4">
             <p className="text-2xl font-serif-elegant text-[#C87374]">آمِيْن اَللّهُمَّ آمِيْن</p>
             <p className="text-[9px] text-[#8a6e6e] uppercase tracking-widest mt-2 font-bold">Amin Allahumma Amin</p>
          </div>
        </div>
      </Section>

      {/* 4. EVENT SECTION (PDF Page 4 Data) */}
      <Section id="event" className="bg-white">
        <div className="space-y-8">
          <Calendar className="mx-auto text-[#C87374] opacity-60" />
          <h2 className="text-2xl font-serif-elegant text-[#C87374]">Butiran Majlis</h2>
          
          <div className="bg-[#faf5f5] p-8 rounded-[2.5rem] border border-[#C87374]/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calendar size={40} />
            </div>
            
            <p className="font-bold text-[#C87374] tracking-widest uppercase text-[10px] mb-2">Isnin</p>
            <p className="text-3xl font-serif-elegant text-[#6b4f4f] mb-4">23 Mac 2026</p>
            
            <div className="h-px w-12 bg-[#C87374]/20 mx-auto mb-6" />
            
            <div className="space-y-1 mb-8">
               <p className="text-sm font-bold text-[#6b4f4f]">Jamuan Makan:</p>
               <p className="text-lg font-serif-elegant text-[#C87374]">1.00 PM</p>
               <p className="text-[10px] text-[#8a6e6e] uppercase tracking-tighter">(Lepas Zohor)</p>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-[#C87374]/5">
              <div className="flex flex-col items-center text-center">
                <MapPin size={16} className="text-[#C87374] mb-2" />
                <p className="text-xs text-[#6b4f4f] leading-relaxed font-medium">
                  65, Jalan KI 5, Taman Krubong Indah,<br />75250 Melaka
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#C87374] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-[#C87374]/20 transition-all"
            >
              <MapIcon size={14} /> Navigasi Lokasi
            </motion.a>
          </div>
          
          <div className="pt-8">
            <Countdown targetDate={eventDate} />
          </div>
        </div>
      </Section>

      {/* 5. GUESTBOOK SECTION */}
      <Section id="guestbook" className="bg-[#faf5f5]">
        <MessageSquare className="mx-auto text-[#C87374] mb-4 opacity-60" />
        <h2 className="text-2xl font-serif-elegant text-[#C87374] mb-8">Ucapan & Doa</h2>
        <Guestbook />
      </Section>

      {/* DOCK-STYLE BOTTOM NAV BAR */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 inset-x-0 mx-auto z-50 w-[85%] max-w-sm"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-[#C87374]/20 border border-white/40 p-1 flex items-center justify-around">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowContactModal(true)} 
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 text-[#6b4f4f] hover:text-[#C87374] transition-colors rounded-xl active:bg-[#C87374]/5"
          >
            <Phone size={18} strokeWidth={2} />
            <span className="text-[9px] uppercase font-bold tracking-tighter mt-1.5 opacity-80">Kenalan</span>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection('event')} 
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 text-[#6b4f4f] hover:text-[#C87374] transition-colors rounded-xl active:bg-[#C87374]/5 border-x border-[#C87374]/5"
          >
            <MapIcon size={18} strokeWidth={2} />
            <span className="text-[9px] uppercase font-bold tracking-tighter mt-1.5 opacity-80">Lokasi</span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPlaylistModal(true)} 
            className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all rounded-xl active:bg-[#C87374]/5 ${isMusicPlaying ? 'text-[#C87374]' : 'text-[#6b4f4f]'}`}
          >
            <div className={isMusicPlaying ? 'animate-spin-slow' : ''}>
              {isMusicPlaying ? <Music size={18} strokeWidth={2} /> : <Music2 size={18} strokeWidth={2} />}
            </div>
            <span className="text-[9px] uppercase font-bold tracking-tighter mt-1.5 opacity-80">Playlist</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* CONTACT MODAL */}
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
                className="absolute top-6 right-6 text-[#8a6e6e] hover:text-[#C87374] transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-serif-elegant text-[#C87374] mb-6 text-center">Hubungi</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#C87374]/10 pb-4">
                  <div>
                    <p className="text-sm font-bold text-[#6b4f4f]">Encik Isnin</p>
                    <p className="text-[10px] text-[#8a6e6e] uppercase tracking-widest">Bapa Athirah</p>
                  </div>
                  <a href="tel:0123456789" className="p-2 bg-[#C87374]/10 rounded-full text-[#C87374] hover:bg-[#C87374]/20 transition-colors">
                    <Phone size={16} />
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-[#6b4f4f]">Puan Amirohaida</p>
                    <p className="text-[10px] text-[#8a6e6e] uppercase tracking-widest">Ibu Athirah</p>
                  </div>
                  <a href="tel:0123456789" className="p-2 bg-[#C87374]/10 rounded-full text-[#C87374] hover:bg-[#C87374]/20 transition-colors">
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAYLIST MODAL */}
      <AnimatePresence>
        {showPlaylistModal && (
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
              className="bg-white w-full max-w-xs rounded-[2rem] p-8 relative shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowPlaylistModal(false)}
                className="absolute top-6 right-6 text-[#8a6e6e] hover:text-[#C87374] transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-serif-elegant text-[#C87374] mb-2 text-center">Playlist</h3>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a6e6e] font-bold text-center mb-6">Pilih Lagu</p>
              
              <div className="space-y-4 mb-8">
                {SONGS.map((song, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => changeSong(idx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${currentSongIndex === idx ? 'bg-[#C87374]/10 text-[#C87374]' : 'bg-transparent text-[#6b4f4f] hover:bg-[#C87374]/5'}`}
                  >
                    <div className={`p-2 rounded-full ${currentSongIndex === idx ? 'bg-[#C87374] text-white' : 'bg-[#C87374]/10 text-[#C87374]'}`}>
                      {currentSongIndex === idx && isMusicPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    </div>
                    <div className="text-left flex-1">
                      <p className={`text-xs font-bold leading-none mb-1 ${currentSongIndex === idx ? 'text-[#C87374]' : 'text-[#6b4f4f]'}`}>{song.title}</p>
                      {currentSongIndex === idx && <p className="text-[9px] uppercase tracking-widest opacity-60">Sedang Dimainkan</p>}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#C87374]/10">
                <button onClick={() => changeSong((currentSongIndex - 1 + SONGS.length) % SONGS.length)} className="text-[#8a6e6e] hover:text-[#C87374]">
                  <SkipBack size={20} />
                </button>
                <button 
                  onClick={toggleMusic} 
                  className="w-12 h-12 bg-[#C87374] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#C87374]/20"
                >
                  {isMusicPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={() => changeSong((currentSongIndex + 1) % SONGS.length)} className="text-[#8a6e6e] hover:text-[#C87374]">
                  <SkipForward size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#faf5f5] pt-12 pb-32 text-center">
        <p className="text-[10px] text-[#8a6e6e] uppercase tracking-[0.3em] mb-4">Terima Kasih</p>
        <div className="flex flex-col items-center gap-1 opacity-60">
           <Heart size={10} className="text-[#C87374] fill-[#C87374]" />
           <p className="text-[9px] text-[#C87374] font-medium tracking-wide">Created with much love by Najwa</p>
        </div>
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
