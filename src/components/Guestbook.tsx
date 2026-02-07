import React, { useState, useEffect } from 'react';
import { Send, Quote, Sparkles, Flower2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWishes, submitWish, submitWishJson, type Wish } from '../services/api';

interface GuestbookProps {
  onWishAdded?: () => void;
}

const Guestbook: React.FC<GuestbookProps> = ({ onWishAdded }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [lastSubmission, setLastSubmission] = useState<Wish | null>(null);

  // Load wishes from API
  useEffect(() => {
    checkApiAndLoadWishes();

    // Set up periodic refresh every 60 seconds
    const interval = setInterval(() => {
      loadWishes();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const checkApiAndLoadWishes = async () => {
    setApiStatus('checking');
    setIsLoading(true);

    try {
      const fetchedWishes = await fetchWishes();

      // If we reached here, API is reachable
      setApiStatus('online');

      if (fetchedWishes.length > 0) {
        setWishes(fetchedWishes);
        localStorage.setItem('engagement_wishes', JSON.stringify(fetchedWishes));
      } else {
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('API failed, using offline mode:', error);
      setApiStatus('offline');
      loadFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };


  const loadWishes = async () => {
    try {
      const fetchedWishes = await fetchWishes();

      if (fetchedWishes.length > 0) {
        setWishes(fetchedWishes);
        // Also update localStorage as cache
        localStorage.setItem('engagement_wishes', JSON.stringify(fetchedWishes));
      } else {
        // If API returns empty, check localStorage
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('Failed to load wishes from API:', error);
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('engagement_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      setWishes(getDefaultWishes());
    }
  };

  const getDefaultWishes = (): Wish[] => [
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

    // Create temporary wish for immediate UI feedback
    const tempWish: Wish = {
      id: `temp_${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('ms-MY'),
      timestamp: new Date().toISOString()
    };

    // Add to UI immediately for better UX
    const updatedWithTemp = [tempWish, ...wishes];
    setWishes(updatedWithTemp);
    setLastSubmission(tempWish);

    try {
      let submittedWish: Wish | null = null;

      // Try JSON submission first
      submittedWish = await submitWishJson(name.trim(), message.trim());

      // If JSON fails, try URL parameter method
      if (!submittedWish) {
        submittedWish = await submitWish(name.trim(), message.trim());
      }

      if (submittedWish) {
        // Replace temp wish with real one from API
        const updated = [submittedWish, ...wishes.filter(w => w.id !== tempWish.id)];
        setWishes(prev =>
          [submittedWish, ...prev.filter(w => w.id !== tempWish.id)]
        );


        // Save to localStorage
        localStorage.setItem('engagement_wishes', JSON.stringify(updated));

        console.log('Successfully saved to Google Sheets:', submittedWish);
      } else {
        // API failed, keep the temp wish and save to localStorage only
        const updated = updatedWithTemp;
        localStorage.setItem('engagement_wishes', JSON.stringify(updated));

        console.log('Saved to localStorage only (API failed)');
      }

      // Show success
      if (onWishAdded) onWishAdded();

      // Reset form
      setName('');
      setMessage('');
      setCurrentIndex(0);

    } catch (error) {
      console.error('Submission error:', error);
      // Keep the temp wish in the list
      localStorage.setItem('engagement_wishes', JSON.stringify(updatedWithTemp));

      if (onWishAdded) onWishAdded();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await checkApiAndLoadWishes();
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-10 relative">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7b6a58] mx-auto"></div>
          <p className="mt-4 text-sm text-[#2f2a26]">Memuatkan ucapan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 relative">
      {/* Decorative corner elements */}
      <div className="absolute -top-6 -left-6 text-[#7b6a58]/10">
        <Flower2 size={24} />
      </div>
      <div className="absolute -top-6 -right-6 text-[#7b6a58]/10">
        <Flower2 size={24} />
      </div>

      {/* API Status Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2">
          {apiStatus === 'online' && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
          )}
          {apiStatus === 'offline' && (
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Offline Mode</span>
            </div>
          )}
          <button
            onClick={handleRefresh}
            className="p-1 hover:bg-[#7b6a58]/10 rounded-full transition-colors"
            title="Refresh wishes"
          >
            <RefreshCw size={14} className="text-[#2f2a26]" />
          </button>
        </div>
      </div>

      {/* Featured Wish Gallery */}
      <div className="relative h-52">
        <AnimatePresence mode="wait">
          {wishes.length > 0 ? (
            <motion.div
              key={wishes[currentIndex].id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_25px_50px_-12px_rgba(123,106,88,0.15)] overflow-hidden"
            >
              {/* Highlight last submission */}
              {lastSubmission && wishes[currentIndex].id === lastSubmission.id && (
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 bg-gradient-to-r from-[#7b6a58] to-[#5b4d3f] text-white text-[10px] rounded-full">
                    Baru!
                  </div>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <Quote className="w-5 h-5 text-[#7b6a58]/30" />
                </div>
                <p className="text-[#2f2a26] font-serif-elegant italic text-sm md:text-base leading-relaxed mb-4 line-clamp-3 px-4">
                  "{wishes[currentIndex].message}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent via-[#7b6a58]/20 to-[#7b6a58]/40" />
                  <div className="flex items-center gap-2">
                    <Sparkles size={10} className="text-[#7b6a58]/40" />
                    <p className="text-xs font-bold text-[#7b6a58] uppercase tracking-[0.15em]">
                      {wishes[currentIndex].name}
                    </p>
                    <Sparkles size={10} className="text-[#7b6a58]/40" />
                  </div>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent via-[#7b6a58]/20 to-[#7b6a58]/40" />
                </div>
                <p className="text-[10px] text-[#6a5f56]/60 mt-2">
                  {wishes[currentIndex].date}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-[2.5rem] border border-white/60">
              <p className="text-[#2f2a26] italic">Tiada ucapan buat masa ini. Jadilah yang pertama!</p>
            </div>
          )}
        </AnimatePresence>

        {/* Enhanced Indicators */}
        {wishes.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {wishes.slice(0, 5).map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#7b6a58]/30 ${idx === currentIndex
                  ? 'w-3 h-3 bg-gradient-to-br from-[#7b6a58] to-[#5b4d3f] shadow-[0_0_12px_rgba(123,106,88,0.4)]'
                  : 'w-2 h-2 bg-[#7b6a58]/20 hover:bg-[#7b6a58]/40'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Guestbook Form */}
      <motion.form
        layout
        onSubmit={handleSubmit}
        className="relative space-y-4 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-[0_20px_40px_rgba(123,106,88,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Form header */}
        <div className="text-center mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7b6a58] font-bold mb-1">
            Kongsi Ucapan & Doa
          </p>
          <p className="text-[10px] text-[#6a5f56] mb-2">
            {apiStatus === 'online'
              ? 'Ucapan akan disimpan ke Google Sheets'
              : 'Mode offline - Ucapan disimpan secara tempatan sahaja'}
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#7b6a58]/30 to-transparent mx-auto" />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/90 border border-[#7b6a58]/10 rounded-2xl px-5 py-4 text-sm text-[#2f2a26] focus:outline-none focus:ring-2 focus:ring-[#7b6a58]/20 focus:border-transparent placeholder:text-[#6a5f56]/50 transition-all duration-300 hover:border-[#7b6a58]/20"
              required
              disabled={isSubmitting}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-[#7b6a58]/10" />
            </div>
          </div>

          <div className="relative">
            <textarea
              placeholder="Tuliskan ucapan dan doa ikhlas anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-white/90 border border-[#7b6a58]/10 rounded-2xl px-5 py-4 text-sm text-[#2f2a26] focus:outline-none focus:ring-2 focus:ring-[#7b6a58]/20 focus:border-transparent placeholder:text-[#6a5f56]/50 transition-all duration-300 hover:border-[#7b6a58]/20 resize-none"
              required
              disabled={isSubmitting}
            />
            <div className="absolute right-4 top-4">
              <div className="w-2 h-2 rounded-full bg-[#7b6a58]/10" />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-[#7b6a58] to-[#5b4d3f] text-white py-4 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(123,106,88,0.3)] hover:shadow-[0_15px_40px_rgba(123,106,88,0.4)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
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
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#7b6a58]/20 to-transparent" />
        </div>

        <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3 custom-scrollbar text-left pt-2">
          <AnimatePresence initial={false}>
            {wishes.length > 0 ? (
              wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="bg-gradient-to-r from-white/80 to-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group relative"
                >
                  {/* Temporary indicator */}
                  {/* {wish.id.startsWith('temp_') && (
                    <div className="absolute -top-2 -right-2">
                      <div className="px-2 py-1 bg-amber-500 text-white text-[8px] rounded-full">
                        Menyimpan...
                      </div>
                    </div>
                  )} */}

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7b6a58] to-[#5b4d3f]" />
                      <p className="text-xs font-bold text-[#7b6a58] uppercase tracking-tighter">
                        {wish.name}
                      </p>
                    </div>
                    <p className="text-[9px] text-[#6a5f56] italic opacity-60">
                      {wish.date}
                    </p>
                  </div>
                  <p className="text-xs text-[#2f2a26] leading-relaxed line-clamp-2 pl-2 border-l-2 border-[#7b6a58]/10">
                    {wish.message}
                  </p>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#7b6a58] to-transparent group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-sm text-[#2f2a26] italic">
                Tiada ucapan buat masa ini. Kongsikan ucapan anda!
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(123, 106, 88, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(123, 106, 88, 0.2), rgba(123, 106, 88, 0.4));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(123, 106, 88, 0.3), rgba(123, 106, 88, 0.5));
        }
      `}</style>
    </div>
  );
};

export default Guestbook;