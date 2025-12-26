
import React from 'react';

export const COLORS = {
  primary: '#b07d7d', // Dusty Rose
  secondary: '#6b4f4f', // Deep Brown
  background: '#fff9f9', // Soft Cream
  accent: '#e2b1b1', // Lighter Pink
};

export const FloralCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-32 h-32 text-[#b07d7d] opacity-40 ${className}`} fill="currentColor">
    <path d="M10,90 Q10,10 90,10 T90,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="15" cy="85" r="2" />
    <circle cx="25" cy="75" r="1.5" />
    <path d="M10,90 C20,70 40,60 60,65" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M90,10 C70,20 60,40 65,60" fill="none" stroke="currentColor" strokeWidth="1" />
    {/* Simplified floral shapes */}
    <ellipse cx="20" cy="80" rx="5" ry="3" transform="rotate(-45 20 80)" />
    <ellipse cx="80" cy="20" rx="5" ry="3" transform="rotate(-45 80 20)" />
  </svg>
);

export const BismillahIcon = () => (
  <div className="flex justify-center my-6">
    <span 
      className="text-4xl md:text-5xl text-[#b07d7d] opacity-90 leading-none select-none" 
      style={{ fontFamily: 'serif' }}
      aria-label="Bismillah"
    >
      ﷽
    </span>
  </div>
);

export const RingIcon = () => (
  <div className="flex justify-center items-center py-4">
    <svg 
      className="w-16 h-16 text-[#b07d7d]" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Right Ring */}
      <circle cx="15.5" cy="13.5" r="5.5" />
      {/* Left Ring - Interlocked */}
      <path d="M11.5 13.5C11.5 16.5376 9.03757 19 6 19C2.96243 19 0.5 16.5376 0.5 13.5C0.5 10.4624 2.96243 8 6 8C9.03757 8 11.5 10.4624 11.5 13.5Z" />
      {/* Diamond/Stone for the Left Ring */}
      <path 
        d="M6 3L8.5 5.5L6 8L3.5 5.5L6 3Z" 
        fill="white"
        strokeWidth="1"
      />
      {/* Small glisten detail */}
      <path d="M6 4.5V6.5M5 5.5H7" strokeWidth="0.5" className="opacity-40" />
      
      {/* Interlocking visual detail: shows one ring passing through the other */}
      <path d="M10.2 11.8C10.5 12.3 10.7 12.9 10.7 13.5" stroke="white" strokeWidth="2.5" />
      <path d="M10.2 11.8C10.5 12.3 10.7 12.9 10.7 13.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  </div>
);
