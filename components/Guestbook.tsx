
import React, { useState, useEffect } from 'react';
import { Send, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('engagement_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      const defaults = [
        { id: '1', name: 'Zafirah & Rizwan', message: 'Selamat bertunang Athirah & Fahmi! Semoga dipermudahkan segala urusan ke jinjang pelamin.', date: '12/10/2025' },
        { id: '2', name: 'Amirul Hakim', message: 'Barakallah! Tahniah korang. Tak sabar nak tunggu hari besar nanti.', date: '15/10/2025' },
        { id: '3', name: 'Nadia & Aiman', message: 'Semoga ikatan ini diberkati hingga ke syurga. Tahniah Athirah!', date: '18/10/2025' }
      ];
      setWishes(defaults);
      localStorage.setItem('engagement_wishes', JSON.stringify(defaults));
    }
  }, []);

  // Auto-cycle the gallery
  useEffect(() => {
    if (wishes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 4500); // Slightly faster cycle for better engagement
    return () => clearInterval(interval);
  }, [wishes.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name,
      message,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('engagement_wishes', JSON.stringify(updated));
    setName('');
    setMessage('');
    setCurrentIndex(0);
  };

  return (
    <div className="w-full space-y-8">
      {/* Featured Wish Gallery (Lookalike Gallery) */}
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {wishes.length > 0 && (
            <motion.div
              key={wishes[currentIndex].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-white/40 rounded-[2.5rem] border border-[#C87374]/5 backdrop-blur-sm"
            >
              <Quote className="w-4 h-4 text-[#C87374]/30 mb-3" />
              <p className="text-[#6b4f4f] font-serif-elegant italic text-xs md:text-sm leading-relaxed mb-3 line-clamp-3">
                "{wishes[currentIndex].message}"
              </p>
              <div className="flex items-center gap-2">
                <span className="h-px w-3 bg-[#C87374]/10" />
                <p className="text-[9px] font-bold text-[#C87374] uppercase tracking-[0.2em]">
                  {wishes[currentIndex].name}
                </p>
                <span className="h-px w-3 bg-[#C87374]/10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {wishes.slice(0, 5).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-0.5 rounded-full transition-all duration-500 focus:outline-none ${idx === currentIndex ? 'w-3 bg-[#C87374]' : 'w-1 bg-[#C87374]/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Guestbook Form */}
      <motion.form 
        layout
        onSubmit={handleSubmit} 
        className="space-y-3 bg-white/40 p-4 rounded-3xl border border-[#C87374]/10 backdrop-blur-sm"
      >
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/80 border border-[#C87374]/10 rounded-2xl px-4 py-3 text-xs text-[#6b4f4f] focus:outline-none focus:ring-1 focus:ring-[#C87374]/20 placeholder:text-[#8a6e6e]/40 transition-all"
          required
        />
        <textarea
          placeholder="Ucapan & Doa..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full bg-white/80 border border-[#C87374]/10 rounded-2xl px-4 py-3 text-xs text-[#6b4f4f] focus:outline-none focus:ring-1 focus:ring-[#C87374]/20 placeholder:text-[#8a6e6e]/40 transition-all resize-none"
          required
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-[#C87374] text-white py-3 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#a06d6d] transition-all"
        >
          Hantar <Send size={10} />
        </motion.button>
      </motion.form>

      {/* List Scroll Area */}
      <div className="max-h-[180px] overflow-y-auto pr-2 space-y-3 custom-scrollbar text-left">
        <AnimatePresence initial={false}>
          {wishes.map((wish) => (
            <motion.div 
              key={wish.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/20 p-3 rounded-2xl border border-[#C87374]/5 backdrop-blur-[1px]"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-[9px] font-bold text-[#C87374] uppercase tracking-tighter">{wish.name}</p>
                <p className="text-[8px] text-[#8a6e6e] italic opacity-60">{wish.date}</p>
              </div>
              <p className="text-[11px] text-[#6b4f4f] leading-relaxed line-clamp-2">{wish.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(200, 115, 116, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default Guestbook;
