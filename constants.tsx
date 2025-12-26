
import React from 'react';

export const COLORS = {
  primary: '#b07d7d', // Dusty Rose
  secondary: '#6b4f4f', // Deep Brown
  background: '#fff9f9', // Soft Cream
  accent: '#e2b1b1', // Lighter Pink
};

export const FloralCorner = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-36 h-36 ${className}`}
    fill="currentColor"
  >
    <defs>
      {/* Gradient for stroke + flower fill */}
      <linearGradient id="roseGoldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7a4a4a" />
        <stop offset="50%" stopColor="#c9a2a2" />
        <stop offset="100%" stopColor="#e4c2a5" />
      </linearGradient>

      {/* Soft drop shadow */}
      <filter id="softShadow" x="-20%" y="-20%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="1.2" result="shadow" />
        <feOffset dx="1" dy="1" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Shimmer Animation */}
      <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        <animate
          attributeName="x1"
          values="0%;100%"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          values="100%;200%"
          dur="4s"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>

    {/* Main stroke + decoration with shimmer overlay */}
    <g filter="url(#softShadow)">
      <path
        d="M6 94 Q8 18 88 8"
        fill="none"
        stroke="url(#roseGoldGradient)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 88 C26 66 42 58 60 60"
        fill="none"
        stroke="url(#roseGoldGradient)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M76 20 C66 30 56 46 58 64"
        fill="none"
        stroke="url(#roseGoldGradient)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>

    {/* Botanical cluster */}
    <g fill="url(#roseGoldGradient)" filter="url(#softShadow)">
      <circle cx="18" cy="82" r="3.8" />
      <circle cx="21" cy="79" r="2.8" />
      <circle cx="15" cy="84" r="2.4" />

      <ellipse cx="23" cy="82" rx="4" ry="2" transform="rotate(-35 23 82)" />
      <ellipse cx="16" cy="78" rx="3" ry="1.6" transform="rotate(-45 16 78)" />
      <ellipse cx="20" cy="86" rx="3" ry="1.8" transform="rotate(-60 20 86)" />

      <circle cx="28" cy="72" r="2" />
      <circle cx="33" cy="68" r="1.4" />
      <circle cx="70" cy="28" r="2" />
      <circle cx="74" cy="24" r="1.4" />

      <circle cx="26" cy="75" r="1" />
      <circle cx="66" cy="30" r="1" />
      <circle cx="80" cy="18" r="2" />
    </g>

    {/* 🌟 The shimmer highlight (overlay on strokes) */}
    <path
      d="M6 94 Q8 18 88 8"
      stroke="url(#shimmerGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
    />
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
