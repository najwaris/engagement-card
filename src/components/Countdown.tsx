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
    <div className="relative">
      {/* Enhanced background effect */}
      <div className="absolute inset-0 -inset-4 bg-gradient-to-r from-[#C87374]/0 via-[#C87374]/5 to-[#C87374]/0 blur-xl rounded-full" />
      
      <div className="flex justify-center gap-3 md:gap-6 my-12 relative z-10">
        {Object.entries(timeLeft).map(([unit, value], index) => (
          <motion.div 
            key={unit}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.15, 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="flex flex-col items-center group cursor-default relative"
          >
            {/* Floating particle effect */}
            <div className="absolute -top-2 -right-2 w-1 h-1 bg-[#C87374] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-[#C87374] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            
            {/* Enhanced time unit container */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#C87374]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
              
              {/* Main time card */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white to-white/90 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(200,115,116,0.15)] flex items-center justify-center mb-3 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(200,115,116,0.25)] group-hover:-translate-y-2 group-hover:border-[#C87374]/30 overflow-hidden">
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Inner subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h20v20H0V0zm1 1h18v18H1V1z%22 fill=%22%23C87374%22 fill-opacity=%220.4%22/%3E%3C/svg%3E')]" />
                
                <span className="relative text-2xl md:text-3xl font-serif-elegant font-bold text-[#C87374] tracking-tighter">
                  {value.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            
            {/* Enhanced label */}
            <div className="relative">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#6b4f4f] font-bold opacity-80 group-hover:opacity-100 group-hover:text-[#C87374] transition-all duration-300">
                {unit}
              </span>
              {/* Label underline effect */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-[#C87374] to-transparent group-hover:w-6 transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="flex justify-center gap-8 mt-8 opacity-30">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#C87374] to-transparent" />
        <p className="text-xs text-[#6b4f4f] italic font-serif-elegant">Menanti Saat Bahagia</p>
        <div className="h-px w-12 bg-gradient-to-l from-transparent via-[#C87374] to-transparent" />
      </div>
    </div>
  );
};

export default Countdown;