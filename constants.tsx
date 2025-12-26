
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
  <div className="flex justify-center items-center py-2">
    <svg 
      className="w-16 h-16 text-[#b07d7d]" 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Secondary Ring (Plain) */}
      <circle 
        cx="40" 
        cy="38" 
        r="14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        className="opacity-70"
      />
      {/* Primary Engagement Ring (Interlocked) */}
      <g>
        {/* The Diamond / Stone */}
        <path 
          d="M24 14L28 10L32 14L28 18L24 14Z" 
          fill="white" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
        <path 
          d="M28 10V18M24 14H32" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          className="opacity-40"
        />
        {/* The Ring Band */}
        <circle 
          cx="28" 
          cy="32" 
          r="16" 
          stroke="currentColor" 
          strokeWidth="2" 
        />
      </g>
      {/* Interlocking detail - small masking lines to simulate depth if needed, 
          but keeping it clean as a single-stroke aesthetic works best here */}
    </svg>
  </div>
);
