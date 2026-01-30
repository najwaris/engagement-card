import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Heart, ChevronDown, Music2, MessageSquare, Users, Gift, Clock, Phone, Menu, X, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Section from './components/Section';
import { BismillahIcon, RingIcon, FloralCorner, QuranVerseIcon, ElegantDivider, SparkleParticles } from './constants';
import Countdown from './components/Countdown';
import Guestbook from './components/Guestbook';
// import ringsImage from './assets';

const SONGS = [
  {
    title: "Beautiful In White (Piano)",
    artist: "Instrumental",
    url: "/music/beautiful-in-white.mp3",
  },
  {
    title: "A Thousand Years (Piano)",
    artist: "Instrumental",
    url: "/music/barbie-entrance-1.mp3",
  },
  {
    title: "Can't Help Falling In Love",
    artist: "Instrumental",
    url: "/music/barbie-entrance-2.mp3",
  },
];


const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMapOptions, setShowMapOptions] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showGiftsModal, setShowGiftsModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpening, setIsOpening] = useState(false);


  const eventDate = "2026-03-23T13:00:00";
  const address = "65, Jalan KI 5, Taman Krubong Indah, 75250 Melaka";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const getGoogleCalendarUrl = (startIso: string, endIso: string) => {
    const title = encodeURIComponent("Majlis Pertunangan Athirah & Fahmi");
    const details = encodeURIComponent("Sila sertai kami pada hari bahagia.");
    const location = encodeURIComponent(address);
    const formatForGC = (iso: string) => iso.replace(/-|:|\. /g, '').replace(/Z$/, 'Z');
    const start = formatForGC(new Date(startIso).toISOString());
    const end = formatForGC(new Date(endIso).toISOString());
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true`;
  }

  const downloadICS = (startIso: string, endIso: string) => {
    const uid = `${Date.now()}@engagement-card`;
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const dtstart = new Date(startIso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const dtend = new Date(endIso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const summary = 'Majlis Pertunangan Athirah & Fahmi';
    const description = 'Sila sertai kami pada hari bahagia.';
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//engagement-card//EN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${address}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'majlis-pertunangan.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  // const handleOpenInvitation = () => {
  //   setIsOpen(true);

  //   if (audioRef.current) {
  //     audioRef.current.volume = 0.5;
  //     audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => { });
  //   }

  //   if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

  //   setTimeout(() => {
  //     confetti({
  //       particleCount: 200,
  //       spread: 100,
  //       origin: { y: 0.6 },
  //       colors: ['#C87374', '#e2b1b1', '#ffffff', '#f8e3e3']
  //     });
  //   }, 1000);
  // };

  const handleOpenInvitation = () => {
    // Hide the CTA immediately so its exit animation can run
    setIsOpening(true);

    // Play audio and vibrate immediately
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => { });
    }

    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

    // Give the CTA a short moment to run its exit animation, then open the gate
    setTimeout(() => {
      setIsOpen(true);
    }, 80);

    // Confetti after a short delay (as before)
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#C87374', '#e2b1b1', '#ffffff', '#f8e3e3'],
      });
    }, 1000);
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
    if (audioRef.current) {
      audioRef.current.src = SONGS[index].url;
      audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => { });
    }
  };

  useEffect(() => {
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.play().catch(() => { });
    }
  }, [currentSongIndex]);

  return (
    <div className="relative h-screen main-container no-scrollbar overflow-y-auto bg-gradient-to-b from-[#fdf9f9] to-[#f8f0f0]">
      <audio
        ref={audioRef}
        src={SONGS[currentSongIndex].url}
        loop
      />


      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03]">
        <div className="absolute top-20 left-20">
          <FloralCorner className="w-60 h-60" opacity={0.05} />
        </div>
        <div className="absolute bottom-20 right-20">
          <FloralCorner className="w-60 h-60 rotate-180" opacity={0.05} />
        </div>
      </div>

      {/* GATE OPENING (REDESIGNED) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="bg-gate fixed inset-0 z-[100] flex items-center justify-center"
            exit={{ pointerEvents: "none" }}
          >
            {/* Left Panel */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
              className="gate-panel left"
            />

            {/* Right Panel */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
              className="gate-panel right"
            />

            {/* Center Seal */}
            {/* <motion.button
              onClick={handleOpenInvitation}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="gate-seal"
            >
              <div className="seal-inner">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <Heart className="seal-heart" fill="currentColor" />
                </motion.div>

                <div className="seal-names">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="seal-name"
                  >
                    Athirah
                  </motion.span>
                  <span className="seal-and">&</span>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="seal-name"
                  >
                    Fahmi
                  </motion.span>
                </div>

                <div className="seal-divider" />

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="seal-cta"
                >
                  BUKA JEMPUTAN
                </motion.span>
              </div>
            </motion.button> */}

            {/* Center Seal + CTA */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Seal (names only) */}
              <motion.div
                initial={{ scale: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="gate-seal ring-glow"
              >
                <div className="seal-inner">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="seal-heart" fill="currentColor" />
                  </motion.div>

                  <div className="seal-names">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="seal-name"
                    >
                      Athirah
                    </motion.span>

                    <span className="seal-and">&</span>

                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="seal-name"
                    >
                      Fahmi
                    </motion.span>
                  </div>

                  <div className="seal-divider" />
                </div>
              </motion.div>

              {/* Small Open Button */}
              <AnimatePresence>
                {!isOpening && (
                  <motion.button
                    onClick={handleOpenInvitation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}   // 👈 FAST exit
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C87374] to-[#a85555] text-white text-xs font-bold tracking-[0.35em] shadow-lg shadow-[#C87374]/40 ring-glow glow-button"
                  >
                    BUKA JEMPUTAN
                  </motion.button>
                )}
              </AnimatePresence>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className={`relative z-10 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-1000`}>

        {/* 1. HERO SECTION - Redesigned */}
        <Section id="hero" className="relative overflow-hidden pt-20">
          {/* Background Elements */}
          <div className="absolute top-10 left-10 w-48 h-48 bg-[#C87374]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#C87374]/5 rounded-full blur-3xl" />

          <div className="relative z-20 max-w-2xl mx-auto">
            {/* Bismillah */}
            <BismillahIcon className="mb-12" />

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-serif-elegant text-[#6b4f4f] mb-4">
                Majlis Pertunangan
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C87374] to-transparent mx-auto mb-8" />
            </motion.div>

            {/* Couple Names - Large Display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
              className="mb-16 relative"
            >
              <div className="space-y-2">
                <h2 className="text-6xl md:text-7xl font-script text-[#C87374] tracking-tight text-center leading-none">
                  Athirah
                </h2>

                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#C87374]/40 to-transparent" />
                  <Heart className="text-[#C87374]/60 w-8 h-8" fill="currentColor" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#C87374]/40 to-transparent" />
                </div>

                <h2 className="text-6xl md:text-7xl font-script text-[#C87374] tracking-tight text-center leading-none">
                  Fahmi
                </h2>
              </div>

              {/* Ring Icon in Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* <RingIcon className="w-16 h-16 opacity-20" /> */}
              </div>
            </motion.div>

            {/* Date Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-white/80 to-white/50 backdrop-blur-lg px-8 py-5 rounded-full inline-block border border-white/70 shadow-lg shadow-[#C87374]/10">
                <div className="flex items-center justify-center gap-4">
                  <Calendar className="text-[#C87374] w-5 h-5" />
                  <p className="text-sm font-bold tracking-[0.3em] text-[#6b4f4f] uppercase">
                    ISNIN | 23 . 03 . 2026
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Parents Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-md mx-auto mb-20"
            >
              <div className="text-center">
                <p className="text-sm text-[#8a6e6e] mb-6 italic">
                  Atas restu ibu bapa
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bride's Parents */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#8a6e6e] font-bold mb-2">
                      Bapa & Ibu Pengantin
                    </h3>
                    <p className="text-lg font-serif-elegant text-[#6b4f4f]">
                      Encik Isnin Bin Katsubi<br />
                      &<br />
                      Puan Amirohaida Binti Mahaidin
                    </p>
                  </div>

                  {/* Groom's Parents */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#8a6e6e] font-bold mb-2">
                      Bapa & Ibu Pengantin
                    </h3>
                    <p className="text-lg font-serif-elegant text-[#6b4f4f]">
                      Encik Saleh<br />
                      &<br />
                      Puan [Placeholder]
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quran Verse */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-xs mx-auto mb-20 relative"
            >
              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-[#C87374]/10">
                <QuranVerseIcon className="absolute -left-3 -top-3 opacity-10 text-[#C87374] w-12 h-12" />
                <p className="text-sm text-[#6b4f4f] italic leading-relaxed font-medium text-center">
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya."
                  <br />
                  <span className="font-bold opacity-90 mt-4 block text-[#C87374]">— Surah Ar-Rum (30:21)</span>
                </p>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            {/* <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="cursor-pointer group flex flex-col items-center"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8a6e6e] opacity-60 mb-3 group-hover:opacity-100 transition-opacity">
                Teruskan
              </span>
              <ChevronDown className="text-[#C87374]/40 group-hover:text-[#C87374] transition-colors animate-bounce" />
            </motion.div> */}
          </div>
        </Section>

        {/* 2. EVENT DETAILS SECTION */}
        <Section id="details" className="bg-gradient-to-b from-white to-[#fefafa]">
          <div className="max-w-xl mx-auto space-y-16">
            {/* Section Header */}
            <div className="text-center">
              <div className="inline-block p-4 bg-white/50 rounded-2xl mb-6">
                {/* <Calendar className="w-8 h-8 text-[#C87374] mx-auto" /> */}
              </div>
              <h2 className="text-4xl font-serif-elegant text-[#6b4f4f] mb-4">
                Butiran Majlis
              </h2>
              <ElegantDivider />
            </div>

            {/* Event Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-10 rounded-[3rem] shadow-2xl shadow-[#C87374]/10 border border-[#C87374]/10 relative overflow-hidden group"
            >
              <SparkleParticles />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Date & Time */}
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <Calendar className="mx-auto text-[#C87374] w-8 h-8" />
                    </div>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#8a6e6e] font-bold mb-3">Tarikh</h3>
                    <p className="text-2xl font-serif-elegant text-[#C87374]">
                      23 Mac 2026
                    </p>
                    <p className="text-sm text-[#8a6e6e] mt-2">(Isnin)</p>
                  </div>

                  <div className="text-center">
                    <div className="mb-4">
                      <Clock className="mx-auto text-[#C87374] w-8 h-8" />
                    </div>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#8a6e6e] font-bold mb-3">Masa</h3>
                    <p className="text-2xl font-serif-elegant text-[#C87374]">
                      1.00 PM
                    </p>
                    <p className="text-sm text-[#8a6e6e] mt-2">hingga 4.00 PM</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <MapPin className="mx-auto text-[#C87374] w-8 h-8" />
                    </div>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#8a6e6e] font-bold mb-3">Lokasi</h3>
                    <p className="text-sm text-[#6b4f4f] leading-loose font-medium">
                      65, Jalan KI 5,<br />
                      Taman Krubong Indah,<br />
                      75250 Melaka
                    </p>
                  </div>

                  {/* Map Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMapOptions(true)}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#C87374] to-[#a85555] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-[#C87374]/30 transition-all hover:shadow-[#C87374]/40 w-full"
                  >
                    <MapPin size={16} /> Navigasi
                  </motion.button>
                </div>
              </div>

              {/* Countdown Section */}
              <div className="mt-16 pt-12 border-t border-[#C87374]/10">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-serif-elegant text-[#6b4f4f] mb-4">
                    Menjelang Hari Bahagia
                  </h3>
                  <p className="text-sm text-[#8a6e6e]">
                    Berdoa dan nantikan bersama kami
                  </p>
                </div>
                <Countdown targetDate={eventDate} />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* 3. PRAYER SECTION */}
        <Section id="prayer" className="bg-gradient-to-b from-[#faf5f5] to-[#f6efef] relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            {/* Section Header */}
            <div className="text-center">
              <div className="inline-block p-4 bg-white/50 rounded-2xl mb-6">
                {/* <Calendar className="w-8 h-8 text-[#C87374] mx-auto" /> */}
              </div>
              <h2 className="text-4xl font-serif-elegant text-[#6b4f4f] mb-4">
                Doa & Restu
              </h2>
              <ElegantDivider />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-12 rounded-[3rem] shadow-2xl shadow-[#C87374]/10 border border-white/50 relative overflow-hidden"
            >
              <div className="space-y-8">
                <p className="text-lg text-[#6b4f4f] leading-relaxed font-serif-elegant text-center">
                  Ya Allah, berkatilah pertunangan Athirah & Fahmi ini.
                </p>
                <p className="text-lg text-[#6b4f4f] leading-relaxed font-serif-elegant text-center">
                  Limpahkan rahmat dan keberkatan ke atas ikatan suci mereka.
                </p>
                <p className="text-lg text-[#6b4f4f] leading-relaxed font-serif-elegant text-center">
                  Kukuhkanlah hati dan keimanan mereka, dan sampaikanlah mereka ke jenjang perkahwinan dengan penuh keberkatan.
                </p>
              </div>

              {/* Amen Section */}
              <div className="mt-16 pt-12 border-t border-[#C87374]/10 text-center">
                <p className="text-5xl font-arabic text-[#C87374] mb-6">
                  آمِيْن يَا رَبَّ الْعَالَمِيْن
                </p>
                <p className="text-sm text-[#8a6e6e] uppercase tracking-[0.3em] font-bold">
                  Amin Ya Rabbal 'Alamin
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* 4. GUESTBOOK SECTION */}
        <Section id="guestbook" className="bg-gradient-to-b from-white to-[#fefafa]">
          <div className="max-w-2xl mx-auto">
            {/* Section Header */}
            <div className="text-center">
              <div className="inline-block p-4 bg-white/50 rounded-2xl mb-6">
                {/* <Calendar className="w-8 h-8 text-[#C87374] mx-auto" /> */}
              </div>
              <h2 className="text-4xl font-serif-elegant text-[#6b4f4f] mb-4">
                Ucapan & Doa
              </h2>
              <ElegantDivider />
            </div>

            <Guestbook />
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="bg-gradient-to-b from-[#faf5f5] to-[#f6efef] pt-20 pb-40 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C87374]/30 to-transparent" />

          <div className="relative z-10 max-w-md mx-auto">
            <img src="/src/assets/ring.png" alt="Rings" className="w-16 h-16 mx-auto mb-8 opacity-40 object-contain" />

            <p className="text-xs text-[#8a6e6e] uppercase tracking-[0.5em] mb-8 font-bold opacity-70 italic">
              Sekalung Penghargaan
            </p>

            <div className="mb-12">
              <p className="text-sm text-[#6b4f4f] font-serif-elegant mb-4">
                Atas kehadiran dan doa restu anda
              </p>
              <p className="text-xs text-[#8a6e6e]">
                Semoga Allah membalas segala kebaikan
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 mb-12">
              <Heart size={16} className="text-[#C87374] fill-[#C87374] animate-pulse" />
              <p className="text-xs text-[#C87374] font-semibold tracking-widest">
                Dengan kasih, Athirah & Fahmi
              </p>
            </div>

            <div className="text-[10px] text-[#8a6e6e] opacity-50 uppercase tracking-[0.3em]">
              © 2025 • Majlis Pertunangan
            </div>
          </div>

          {/* Floating Hearts */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#C87374]/10"
              style={{
                left: `${(i + 1) * 25}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Heart size={20} fill="currentColor" />
            </motion.div>
          ))}
        </footer>
      </main>

      {/* FLOATING NAVIGATION */}
      <motion.nav
        initial={{ y: 100 }}
        animate={isOpen ? { y: 0 } : { y: 100 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        className="fixed bottom-8 inset-x-0 mx-auto z-50 w-[90%] max-w-md"
      >
        <div className="glass rounded-[2.5rem] shadow-2xl shadow-black/20 p-3 flex items-center justify-around border border-white/50">
          <NavButton
            icon={<Phone size={20} />}
            label="Hubungi"
            onClick={() => setShowContactModal(true)}
          />
          {/* <NavButton
            icon={<Gift size={20} />}
            label="Hadiah"
            onClick={() => setShowGiftsModal(true)}
          /> */}
          <NavButton
            icon={<MapPin size={20} />}
            label="Lokasi"
            onClick={() => {
              const element = document.getElementById('details');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          />
          <NavButton
            icon={isMusicPlaying ? <Play size={20} className="text-[#C87374]" /> : <Music2 size={20} />}
            label="Muzik"
            onClick={() => setShowPlaylistModal(true)}
            active={isMusicPlaying}
          />
          <NavButton
            icon={<MessageSquare size={20} />}
            label="Ucapan"
            onClick={() => {
              const element = document.getElementById('guestbook');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          />
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      {/* <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 glass rounded-full flex items-center justify-center shadow-lg"
      >
        {showMobileMenu ? <X size={24} className="text-[#6b4f4f]" /> : <Menu size={24} className="text-[#6b4f4f]" />}
      </button> */}

      {/* Mobile Menu */}
      {/* <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-24 right-6 z-50 glass rounded-3xl p-6 shadow-2xl w-64"
          >
            <div className="space-y-4">
              <MobileMenuItem 
                label="Maklumat" 
                onClick={() => {
                  setShowMobileMenu(false);
                  const element = document.getElementById('hero');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <MobileMenuItem 
                label="Butiran Majlis" 
                onClick={() => {
                  setShowMobileMenu(false);
                  const element = document.getElementById('details');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <MobileMenuItem 
                label="Doa" 
                onClick={() => {
                  setShowMobileMenu(false);
                  const element = document.getElementById('prayer');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <MobileMenuItem 
                label="Ucapan" 
                onClick={() => {
                  setShowMobileMenu(false);
                  const element = document.getElementById('guestbook');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <div className="h-px bg-[#C87374]/10 my-4" />
              <MobileMenuItem 
                label="Hubungi" 
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowContactModal(true);
                }}
              />
              <MobileMenuItem 
                label="Muzik" 
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowPlaylistModal(true);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* MODALS */}
      <AnimatePresence>
        {/* Contact Modal */}
        {showContactModal && (
          <Modal title="Maklumat Hubungan" onClose={() => setShowContactModal(false)}>
            <div className="space-y-6 py-6">
              <ContactItem
                name="Encik Isnin"
                role="Bapa Athirah"
                phone="0179826529"
              />
              <ContactItem
                name="Puan Amirohaida"
                role="Ibu Athirah"
                phone="01164152889"
              />
              <ContactItem
                name="Encik Saleh"
                role="Bapa Fahmi"
                phone="0123456789"
              />
            </div>
            <div className="mt-8 pt-6 border-t border-[#C87374]/10 text-center">
              <p className="text-xs text-[#8a6e6e] opacity-70">
                Untuk sebarang pertanyaan berkaitan majlis
              </p>
            </div>
          </Modal>
        )}

        {/* Map Options Modal */}
        {showMapOptions && (
          <Modal title="Navigasi" onClose={() => setShowMapOptions(false)}>
            <div className="space-y-4 py-4">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-2xl bg-gradient-to-r from-[#C87374] to-[#a85555] text-white font-bold"
              >
                Google Maps
              </a>
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-2xl bg-[#25D366] text-white font-bold"
              >
                Waze
              </a>
            </div>
          </Modal>
        )}

        {/* Gifts Modal */}
        {showGiftsModal && (
          <Modal title="Maklumat Hadiah" onClose={() => setShowGiftsModal(false)}>
            <div className="py-6 space-y-6">
              <div className="text-center">
                <Gift className="w-12 h-12 text-[#C87374] mx-auto mb-4" />
                <p className="text-sm text-[#6b4f4f] font-medium mb-2">
                  Kehadiran dan doa anda<br />sudah cukup bermakna
                </p>
                <p className="text-xs text-[#8a6e6e] opacity-80">
                  Namun jika ingin memberi hadiah...
                </p>
              </div>

              <div className="glass-dark p-6 rounded-3xl">
                <p className="text-xs font-bold text-[#C87374] uppercase tracking-[0.2em] mb-3 text-center">
                  Cadangan Hadiah
                </p>
                <ul className="text-sm text-[#6b4f4f] space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#C87374] rounded-full" />
                    <span>Duit Raya / Duit Hijau</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#C87374] rounded-full" />
                    <span>Barangan Perkahwinan</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#C87374] rounded-full" />
                    <span>Doa dan Restu Ikhlas</span>
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        )}

        {/* Music Modal */}
        {showPlaylistModal && (
          <Modal title="Senarai Lagu" onClose={() => setShowPlaylistModal(false)}>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar py-2">
              {SONGS.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => changeSong(idx)}
                  className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all ${currentSongIndex === idx
                    ? 'bg-gradient-to-r from-[#C87374]/10 to-[#C87374]/5 text-[#C87374] border border-[#C87374]/20'
                    : 'hover:bg-black/5'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentSongIndex === idx
                    ? 'bg-gradient-to-br from-[#C87374] to-[#a85555] text-white'
                    : 'bg-[#C87374]/10'
                    }`}>
                    {currentSongIndex === idx && isMusicPlaying ? (
                      <Pause size={16} fill="currentColor" />
                    ) : (
                      <Play size={16} fill="currentColor" className="ml-1" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold leading-tight">{song.title}</p>
                    <p className="text-xs text-[#8a6e6e] mt-1">{song.artist}</p>
                    {currentSongIndex === idx && (
                      <p className="text-[10px] uppercase tracking-widest mt-2 text-[#C87374]">
                        Sedang Dimainkan
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-10 pt-8 border-t border-[#C87374]/10 mt-8">
              <SkipBack
                size={24}
                className="cursor-pointer text-[#8a6e6e] hover:text-[#C87374] transition-colors"
                onClick={() => changeSong((currentSongIndex - 1 + SONGS.length) % SONGS.length)}
              />
              <button
                onClick={toggleMusic}
                className="w-14 h-14 bg-gradient-to-br from-[#C87374] to-[#a85555] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#C87374]/30 hover:shadow-[#C87374]/40 transition-shadow"
              >
                {isMusicPlaying ? (
                  <Pause size={24} fill="white" />
                ) : (
                  <Play size={24} fill="white" className="ml-1" />
                )}
              </button>
              <SkipForward
                size={24}
                className="cursor-pointer text-[#8a6e6e] hover:text-[#C87374] transition-colors"
                onClick={() => changeSong((currentSongIndex + 1) % SONGS.length)}
              />
            </div>
            <div className="text-center mt-8">
              <p className="text-xs text-[#8a6e6e] opacity-60">
                Muzik latar akan berterusan sehingga anda menutup kad jemputan
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style>{`
        .main-container {
          scroll-behavior: smooth;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .glass {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(200, 115, 116, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(200, 115, 116, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(200, 115, 116, 0.2);
          border-radius: 10px;
        }

        /* Gate Opening Styles */
        .bg-gate {
          background: radial-gradient(
            circle at center,
            #fffafa 0%,
            #f6eaea 70%,
            #f0dddd 100%
          );
        }

        /* Panels */
        .gate-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  filter: contrast(1.05) saturate(0.9);

  /* Layered background */
  background:
    url("/src/assets/floral-patterns.png") repeat,
    linear-gradient(
      to bottom,
      #fdf3f3,
      #f6e1e1
    );

  background-size:
    220px 220px, /* pattern size — tweak this */
    cover;

  background-position:
    center,
    center;

  box-shadow:
    inset 0 0 40px rgba(200, 115, 116, 0.18);

  opacity: 0.95;
}


        .gate-panel.left {
  left: 0;
  border-right: 1px solid rgba(200, 115, 116, 0.25);
  background-position:
    right center,
    center;
}

.gate-panel.right {
  right: 0;
  border-left: 1px solid rgba(200, 115, 116, 0.25);
  background-position:
    left center,
    center;
}

.gate-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    // rgba(255,255,255,0.85),
    transparent 40%,
    transparent 60%,
    // rgba(255,255,255,0.85)
  );
  pointer-events: none;
}

.gate-panel.left::after {
  background: linear-gradient(
    to right,
    // rgba(255,255,255,0.9),
    transparent 55%
  );
}

.gate-panel.right::after {
  background: linear-gradient(
    to left,
    // rgba(255,255,255,0.9),
    transparent 55%
  );
}



        /* Seal */
        .gate-seal {
          position: relative;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.95),
            rgba(255,255,255,0.85)
          );
          backdrop-filter: blur(18px);
          border: 2px solid rgba(200,115,116,0.35);
          box-shadow:
            0 30px 60px rgba(200,115,116,0.35),
            inset 0 0 30px rgba(255,255,255,0.6);
          display: grid;
          place-items: center;
          cursor: pointer;
          padding: 0;
        }

        /* Inner layout */
        .seal-inner {
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-rows: auto 1fr auto auto;
          align-items: center;
          justify-items: center;
          padding: 2.5rem;
          text-align: center;
        }

        /* Heart */
        .seal-heart {
          color: #C87374;
          width: 32px;
          height: 32px;
        }

        /* Names */
        .seal-names {
          line-height: 1.2;
        }

        .seal-name {
          display: block;
          font-family: "Great Vibes", "Allura", "Alex Brush", cursive;
          font-size: 3.2rem;
          background: linear-gradient(to right, #C87374, #a85555);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }


        .seal-and {
          font-family: "Playfair Display", "Cormorant Garamond", serif;
          font-size: 2.2rem;
          font-style: italic;
          color: rgba(200,115,116,0.65);
          margin: 0.8rem 0;
          display: block;
          line-height: 1;
        }


        /* Divider */
        .seal-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(200,115,116,0.5),
            transparent
          );
        }

        /* CTA */
        .seal-cta {
          font-size: 0.7rem;
          letter-spacing: 0.45em;
          font-weight: 700;
          color: #8a6e6e;
          display: block;
        }

        /* Glow effects */
        .ring-glow {
          box-shadow:
            0 0 40px rgba(200,115,116,0.25),
            0 0 100px rgba(200,115,116,0.12),
            0 20px 60px rgba(200,115,116,0.12);
          animation: pulse-glow 2.8s ease-in-out infinite;
        }

        .glow-button {
          transition: box-shadow 180ms ease, transform 120ms ease;
        }

        .glow-button:hover {
          box-shadow: 0 18px 50px rgba(200,115,116,0.45), 0 0 30px rgba(200,115,116,0.22);
          transform: translateY(-2px);
        }

        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(200,115,116,0.12)); }
          50% { filter: drop-shadow(0 0 22px rgba(200,115,116,0.24)); }
        }
      `}</style>
    </div>
  );
};

const NavButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean
}> = ({ icon, label, onClick, active }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-3xl transition-all duration-300 ${active ? 'bg-gradient-to-b from-[#C87374]/10 to-transparent' : ''
      }`}
  >
    <div className={`${active ? 'text-[#C87374]' : 'text-[#8a6e6e]'}`}>
      {icon}
    </div>
    <span className={`text-[10px] uppercase font-bold tracking-tighter mt-2 ${active ? 'text-[#C87374]' : 'text-[#8a6e6e] opacity-70'
      }`}>
      {label}
    </span>
  </motion.button>
);

const MobileMenuItem: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left text-sm text-[#6b4f4f] hover:text-[#C87374] transition-colors py-2 px-4 rounded-2xl hover:bg-[#C87374]/5"
  >
    {label}
  </button>
);

const Modal: React.FC<{
  title: string;
  children: React.ReactNode;
  onClose: () => void
}> = ({ title, children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="glass w-full max-w-xs rounded-[2.5rem] p-8 relative shadow-2xl overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-20"
      >
        <X size={20} className="text-[#8a6e6e] hover:text-[#C87374]" />
      </button>

      <div className="relative">
        <h3 className="text-2xl font-serif-elegant text-[#C87374] mb-8 text-center">
          {title}
        </h3>
        {children}
      </div>
    </motion.div>
  </motion.div>
);

const ContactItem: React.FC<{
  name: string;
  role: string;
  phone: string;
}> = ({ name, role, phone }) => {
  const formatWhatsapp = (p: string) => {
    const digits = p.replace(/\D/g, '');
    if (digits.startsWith('0')) return '60' + digits.slice(1);
    return digits;
  }

  return (
    <div className="glass-dark p-5 rounded-3xl border border-[#C87374]/5 hover:border-[#C87374]/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#C87374] rounded-full" />
            <p className="text-sm font-bold text-[#6b4f4f]">{name}</p>
          </div>
          <p className="text-xs text-[#8a6e6e] uppercase tracking-widest font-semibold opacity-80">{role}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <a
          href={`tel:${phone}`}
          className="flex-1 text-center py-2 px-4 rounded-xl bg-gradient-to-r from-[#C87374] to-[#a85555] text-white font-semibold text-sm hover:shadow-lg transition-shadow"
        >
          Call
        </a>
        <a
          href={`https://wa.me/${formatWhatsapp(phone)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:shadow-lg transition-shadow"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default App;