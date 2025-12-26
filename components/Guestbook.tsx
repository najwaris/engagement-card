
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
      // Default placeholder wishes
      const defaults = [
        { id: '1', name: 'Zafirah & Rizwan', message: 'Selamat bertunang Athirah & Fahmi! Semoga dipermudahkan segala urusan ke jinjang pelamin.', date: '12/10/2025' },
        { id: '2', name: 'Amirul Hakim', message: 'Barakallah! Tahniah korang. Tak sabar nak tunggu hari besar nanti.', date: '15/10/2025' }
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
    }, 5000);
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
    setCurrentIndex(0); // View the newest wish immediately
  };

  return (
    <div className="w-full space-y-8">
      {/* Featured Wish Gallery */}
      <div className="relative h-48 flex items-center justify-center bg-transparent group">
        <AnimatePresence mode="wait">
          {wishes.length > 0 && (
            <motion.div
              key={wishes[currentIndex].id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 10px 30px -10px rgba(176, 125, 125, 0.2)"
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-white/20 backdrop-blur-[2px] rounded-[2.5rem] border border-[#b07d7d]/10 transition-all"
            >
              <Quote className="w-5 h-5 text-[#b07d7d]/30 mb-3" />
              <p className="text-[#6b4f4f] font-serif-elegant italic text-sm md:text-base leading-relaxed mb-3 line-clamp-3">
                "{wishes[currentIndex].message}"
              </p>
              <div className="flex items-center gap-2">
                <span className="h-px w-3 bg-[#b07d7d]/20" />
                <p className="text-[9px] font-bold text-[#b07d7d] uppercase tracking-[0.2em]">
                  {wishes[currentIndex].name}
                </p>
                <span className="h-px w-3 bg-[#b07d7d]/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Gallery Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {wishes.slice(0, 5).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-500 focus:outline-none ${idx === currentIndex ? 'w-4 bg-[#b07d7d]' : 'w-1 bg-[#b07d7d]/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Guestbook Form */}
      <motion.form 
        layout
        onSubmit={handleSubmit} 
        className="space-y-3 bg-white/40 p-4 rounded-3xl border border-[#b07d7d]/10 backdrop-blur-sm"
      >
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/80 border border-[#b07d7d]/10 rounded-2xl px-4 py-3 text-sm text-[#6b4f4f] focus:outline-none focus:ring-2 focus:ring-[#b07d7d]/20 placeholder:text-[#8a6e6e]/60 shadow-inner transition-all"
          required
        />
        <textarea
          placeholder="Ucapan & Doa..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full bg-white/80 border border-[#b07d7d]/10 rounded-2xl px-4 py-3 text-sm text-[#6b4f4f] focus:outline-none focus:ring-2 focus:ring-[#b07d7d]/20 placeholder:text-[#8a6e6e]/60 shadow-inner transition-all resize-none"
          required
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-[#b07d7d] text-white py-3 rounded-2xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#a06d6d] transition-colors shadow-lg shadow-[#b07d7d]/20"
        >
          Hantar <Send size={12} />
        </motion.button>
      </motion.form>

      {/* Full Wish List Scroll */}
      <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        <AnimatePresence initial={false}>
          {wishes.map((wish) => (
            <motion.div 
              key={wish.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/20 p-3 rounded-xl border border-[#b07d7d]/5 text-left backdrop-blur-[1px]"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-[10px] font-bold text-[#b07d7d]">{wish.name}</p>
                <p className="text-[8px] text-[#8a6e6e] uppercase tracking-tighter">{wish.date}</p>
              </div>
              <p className="text-xs text-[#6b4f4f] line-clamp-2">{wish.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(176, 125, 125, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Guestbook;
