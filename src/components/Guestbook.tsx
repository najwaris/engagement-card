import React, { useState, useEffect } from 'react';
import { Send, Quote, Sparkles, Flower2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface GuestbookProps {
  onWishAdded?: () => void;
}

const Guestbook: React.FC<GuestbookProps> = ({ onWishAdded }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('engagement_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      const defaults = [
        { 
          id: '1', 
          name: 'Zafirah & Rizwan', 
          message: 'Selamat bertunang Athirah & Fahmi! Semoga dipermudahkan segala urusan ke jinjang pelamin. Barakallah!', 
          date: '12/10/2025' 
        },
        { 
          id: '2', 
          name: 'Amirul Hakim', 
          message: 'Tahniah korang! Doa kami menyertai kalian. Tak sabar nak tunggu hari besar nanti.', 
          date: '15/10/2025' 
        },
        { 
          id: '3', 
          name: 'Nadia & Aiman', 
          message: 'Semoga ikatan ini diberkati hingga ke syurga. Tahniah Athirah! Moga menjadi pasangan yang sakinah mawaddah warahmah.', 
          date: '18/10/2025' 
        }
      ];
      setWishes(defaults);
      localStorage.setItem('engagement_wishes', JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    if (wishes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [wishes.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('ms-MY'),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('engagement_wishes', JSON.stringify(updated));
    setName('');
    setMessage('');
    setCurrentIndex(0);
    setIsSubmitting(false);
    if (onWishAdded) onWishAdded();
  };

  return (
    <div className="w-full space-y-10 relative">
      {/* Decorative corner elements */}
      <div className="absolute -top-6 -left-6 text-[#C87374]/10">
        <Flower2 size={24} />
      </div>
      <div className="absolute -top-6 -right-6 text-[#C87374]/10">
        <Flower2 size={24} />
      </div>

      {/* Featured Wish Gallery */}
      <div className="relative h-52">
        <AnimatePresence mode="wait">
          {wishes.length > 0 && (
            <motion.div
              key={wishes[currentIndex].id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_25px_50px_-12px_rgba(200,115,116,0.15)] overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 3C15.089 3 3 15.089 3 30c0 14.911 12.089 27 27 27 14.911 0 27-12.089 27-27C57 15.089 44.911 3 30 3z%22 fill=%22%23C87374%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')]" />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <Quote className="w-5 h-5 text-[#C87374]/30" />
                </div>
                <p className="text-[#6b4f4f] font-serif-elegant italic text-sm md:text-base leading-relaxed mb-4 line-clamp-3 px-4">
                  "{wishes[currentIndex].message}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent via-[#C87374]/20 to-[#C87374]/40" />
                  <div className="flex items-center gap-2">
                    <Sparkles size={10} className="text-[#C87374]/40" />
                    <p className="text-xs font-bold text-[#C87374] uppercase tracking-[0.15em]">
                      {wishes[currentIndex].name}
                    </p>
                    <Sparkles size={10} className="text-[#C87374]/40" />
                  </div>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent via-[#C87374]/20 to-[#C87374]/40" />
                </div>
                <p className="text-[10px] text-[#8a6e6e]/60 mt-2">
                  {wishes[currentIndex].date}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {wishes.slice(0, 5).map((_, idx) => (
            <motion.button 
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#C87374]/30 ${
                idx === currentIndex 
                  ? 'w-3 h-3 bg-gradient-to-br from-[#C87374] to-[#a85555] shadow-[0_0_12px_rgba(200,115,116,0.4)]' 
                  : 'w-2 h-2 bg-[#C87374]/20 hover:bg-[#C87374]/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Guestbook Form */}
      <motion.form 
        layout
        onSubmit={handleSubmit} 
        className="relative space-y-4 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-[0_20px_40px_rgba(200,115,116,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Form header */}
        <div className="text-center mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C87374] font-bold mb-1">
            Kongsi Ucapan & Doa
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#C87374]/30 to-transparent mx-auto" />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/90 border border-[#C87374]/10 rounded-2xl px-5 py-4 text-sm text-[#6b4f4f] focus:outline-none focus:ring-2 focus:ring-[#C87374]/20 focus:border-transparent placeholder:text-[#8a6e6e]/50 transition-all duration-300 hover:border-[#C87374]/20"
              required
              disabled={isSubmitting}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-[#C87374]/10" />
            </div>
          </div>
          
          <div className="relative">
            <textarea
              placeholder="Tuliskan ucapan dan doa ikhlas anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-white/90 border border-[#C87374]/10 rounded-2xl px-5 py-4 text-sm text-[#6b4f4f] focus:outline-none focus:ring-2 focus:ring-[#C87374]/20 focus:border-transparent placeholder:text-[#8a6e6e]/50 transition-all duration-300 hover:border-[#C87374]/20 resize-none"
              required
              disabled={isSubmitting}
            />
            <div className="absolute right-4 top-4">
              <div className="w-2 h-2 rounded-full bg-[#C87374]/10" />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-[#C87374] to-[#a85555] text-white py-4 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(200,115,116,0.3)] hover:shadow-[0_15px_40px_rgba(200,115,116,0.4)] ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Menghantar...</span>
            </>
          ) : (
            <>
              <Send size={12} />
              <span>Hantar Ucapan</span>
            </>
          )}
        </motion.button>
      </motion.form>

      {/* List Scroll Area */}
      <div className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C87374]/20 to-transparent" />
        </div>
        
        <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3 custom-scrollbar text-left pt-2">
          <AnimatePresence initial={false}>
            {wishes.map((wish, index) => (
              <motion.div 
                key={wish.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className="bg-gradient-to-r from-white/80 to-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C87374] to-[#a85555]" />
                    <p className="text-xs font-bold text-[#C87374] uppercase tracking-tighter">
                      {wish.name}
                    </p>
                  </div>
                  <p className="text-[9px] text-[#8a6e6e] italic opacity-60">
                    {wish.date}
                  </p>
                </div>
                <p className="text-xs text-[#6b4f4f] leading-relaxed line-clamp-2 pl-2 border-l-2 border-[#C87374]/10">
                  {wish.message}
                </p>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#C87374] to-transparent group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(200, 115, 116, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(200, 115, 116, 0.2), rgba(200, 115, 116, 0.4));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(200, 115, 116, 0.3), rgba(200, 115, 116, 0.5));
        }
      `}</style>
    </div>
  );
};

export default Guestbook;