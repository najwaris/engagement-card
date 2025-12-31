import React from 'react';
import { Heart } from 'lucide-react';

export const COLORS = {
  primary: '#C87374',
  secondary: '#6b4f4f',
  background: '#fff9f9',
  accent: '#e2b1b1',
  gold: '#D4AF37',
};

// Enhanced FloralCorner with more elegance
export const FloralCorner = ({ className = "", opacity = 0.3 }: { className?: string; opacity?: number }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-40 h-40 ${className}`}
    fill="currentColor"
    style={{ opacity }}
  >
    <defs>
      <linearGradient id="elegantGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C87374" />
        <stop offset="30%" stopColor="#E89999" />
        <stop offset="70%" stopColor="#F0ADAD" />
        <stop offset="100%" stopColor="#F5D5D5" />
      </linearGradient>

      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
        <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
        <feMerge>
          <feMergeNode in="offsetBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <pattern id="floralPattern" patternUnits="userSpaceOnUse" width="4" height="4">
        <circle cx="2" cy="2" r="0.5" fill="#C87374" opacity="0.1" />
      </pattern>
    </defs>

    <g filter="url(#softGlow)">
      {/* Main elegant curve */}
      <path
        d="M5 95 Q10 25 92 8"
        fill="none"
        stroke="url(#elegantGradient)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="0.1, 4"
      />
      
      {/* Secondary decorative curves */}
      <path
        d="M15 85 C30 60 45 50 65 55"
        fill="none"
        stroke="url(#elegantGradient)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      
      <path
        d="M75 25 C65 40 55 55 58 70"
        fill="none"
        stroke="url(#elegantGradient)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </g>

    {/* Ornamental floral clusters */}
    <g fill="url(#elegantGradient)">
      {/* Main cluster */}
      <circle cx="20" cy="80" r="4" opacity="0.8" />
      <circle cx="25" cy="77" r="3" opacity="0.6" />
      <circle cx="18" cy="84" r="2.5" opacity="0.7" />
      
      {/* Decorative leaves */}
      <ellipse cx="15" cy="78" rx="3.5" ry="1.8" transform="rotate(-40 15 78)" opacity="0.6" />
      <ellipse cx="22" cy="84" rx="3" ry="1.5" transform="rotate(20 22 84)" opacity="0.6" />
      
      {/* Secondary clusters */}
      <g opacity="0.5">
        <circle cx="30" cy="70" r="2" />
        <circle cx="35" cy="65" r="1.5" />
        <circle cx="70" cy="30" r="2" />
        <circle cx="75" cy="25" r="1.5" />
        <circle cx="85" cy="15" r="2.5" />
      </g>
    </g>

    {/* Pearls/dots along the curve */}
    <g fill="#FFFFFF" opacity="0.9">
      {[15, 30, 45, 60, 75, 90].map((t, i) => (
        <circle
          key={i}
          cx={5 + (92 - 5) * (t / 100)}
          cy={95 - (95 - 8) * Math.pow(t / 100, 1.5)}
          r={1 + Math.sin(i * 0.8) * 0.5}
        />
      ))}
    </g>
  </svg>
);

// Enhanced Bismillah with gradient - FIXED CENTERING
export const BismillahIcon = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex justify-center my-8 ${className}`}>
    {/* Background glow effect - positioned properly */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-48 h-48 bg-gradient-to-r from-[#C87374]/10 to-transparent rounded-full blur-xl opacity-50" />
    </div>
    
    {/* Main text */}
    <span 
      className="relative text-5xl md:text-6xl bg-gradient-to-b from-[#7a4a4a] via-[#C87374] to-[#e2b1b1] bg-clip-text text-transparent leading-none select-none drop-shadow-lg"
      style={{ fontFamily: 'Amiri, serif' }}
      aria-label="Bismillah"
    >
      ﷽
    </span>
  </div>
);

// Enhanced RingIcon with more detail
export const RingIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <div className="relative flex justify-center items-center">
    {/* Outer glow rings */}
    <div className="absolute inset-0 animate-ping opacity-20">
      <div className="w-full h-full rounded-full border-2 border-[#C87374]" />
    </div>
    
    <div className="absolute inset-0 animate-spin-slow">
      <div className="w-full h-full rounded-full border border-[#C87374]/30" />
    </div>
    
    <svg 
      className={`${className} relative`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C87374" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C87374" />
        </linearGradient>
        
        <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
        
        <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C87374" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Interlocking rings */}
      <g filter="url(#ringShadow)">
        {/* Right ring */}
        <circle cx="65" cy="50" r="22" fill="none" stroke="url(#ringGradient)" strokeWidth="3" />
        
        {/* Left ring */}
        <path 
          d="M35 50 a22 22 0 1 1 44 0" 
          fill="none" 
          stroke="url(#ringGradient)" 
          strokeWidth="3"
          strokeDasharray="2,2"
        />
        
        {/* Diamond */}
        <g transform="translate(35, 28)">
          <path 
            d="M0 0 L8 8 L0 16 L-8 8 Z" 
            fill="url(#diamondGradient)"
            stroke="#C87374"
            strokeWidth="1"
          />
          <path 
            d="M0 4 L4 8 L0 12 L-4 8 Z" 
            fill="#FFFFFF"
            opacity="0.8"
          />
        </g>
        
        {/* Ring details */}
        <circle cx="65" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="35" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </g>
      
      {/* Sparkle effects */}
      <g>
        {[[65, 28], [75, 45], [85, 50], [75, 55], [65, 72], [55, 55], [45, 50], [55, 45]].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1"
            fill="#FFFFFF"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${2 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1;1.5;1"
              dur={`${2 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  </div>
);

// Enhanced QuranVerseIcon
export const QuranVerseIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className="relative">
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="currentColor"
      opacity="0.8"
    >
      <defs>
        <linearGradient id="quranGradient">
          <stop offset="0%" stopColor="#7a4a4a" />
          <stop offset="100%" stopColor="#C87374" />
        </linearGradient>
      </defs>
      
      <path 
        d="M50 90 C75 90 90 75 90 50 C90 25 75 10 50 10 C25 10 10 25 10 50 C10 75 25 90 50 90 Z" 
        fill="none" 
        stroke="url(#quranGradient)" 
        strokeWidth="2"
      />
      
      <path 
        d="M30 40 L70 40 M30 50 L70 50 M30 60 L70 60" 
        stroke="url(#quranGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      
      <path 
        d="M50 25 L55 35 L65 38 L58 45 L60 55 L50 50 L40 55 L42 45 L35 38 L45 35 Z" 
        fill="url(#quranGradient)"
      />
    </svg>
  </div>
);

// New: Elegant Divider Component
export const ElegantDivider = ({ className = "" }: { className?: string }) => (
  <div className={`relative h-6 flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 flex items-center">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C87374]/30 to-transparent" />
    </div>
    <div className="relative px-4">
      <Heart className="w-4 h-4 text-[#C87374]/50" fill="currentColor" />
    </div>
  </div>
);

// New: Sparkle Particles Component
export const SparkleParticles = ({ count = 12 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: Math.random() * 0.5 + 0.2,
        }}
      />
    ))}
  </div>
);