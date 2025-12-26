
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: string;
}

interface CountdownTime {
  hari: number;
  jam: number;
  minit: number;
  saat: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): CountdownTime => {
    const target = +new Date(targetDate);
    const now = +new Date();
    const difference = target - now;
    
    let timeLeft: CountdownTime = { hari: 0, jam: 0, minit: 0, saat: 0 };

    if (difference > 0) {
      timeLeft = {
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minit: Math.floor((difference / 1000 / 60) % 60),
        saat: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-3 md:gap-4 my-8">
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <motion.div 
          key={unit}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // CRITICAL: Ensures it stays visible once loaded
          transition={{ 
            delay: index * 0.1, 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="flex flex-col items-center group cursor-default"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white border border-[#b07d7d]/10 rounded-2xl shadow-sm flex items-center justify-center mb-2 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 group-hover:border-[#b07d7d]/30">
            <span className="text-xl md:text-2xl font-serif-elegant font-bold text-[#b07d7d]">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#8a6e6e] font-bold opacity-60">
            {unit}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
