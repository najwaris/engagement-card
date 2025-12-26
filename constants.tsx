
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
    <img 
      src="https://img.icons8.com/ios/100/b07d7d/bismillah.png" 
      alt="Bismillah" 
      className="h-12 w-auto opacity-80"
    />
  </div>
);

export const RingIcon = () => (
  <svg className="w-12 h-12 mx-auto text-[#b07d7d] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="4" />
    <circle cx="16" cy="15" r="4" />
    <path d="M8 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
  </svg>
);
