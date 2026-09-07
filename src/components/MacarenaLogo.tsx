import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
}

export const MacarenaLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightMode = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-9',
    md: 'w-10 h-11',
    lg: 'w-14 h-16',
    xl: 'w-20 h-24',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exact Vector Emblem matching the user's uploaded logo */}
      <div className={`relative ${sizeMap[size]} flex-shrink-0 drop-shadow-md`}>
        <svg viewBox="0 0 400 450" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDB813" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="logoWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="logoRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="45%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="logoPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Location Pin Base Tip */}
          <path d="M 130 325 L 200 435 L 265 330 Z" fill="url(#logoPinGrad)" />

          {/* Golden Sun Circle */}
          <circle cx="200" cy="190" r="138" fill="url(#logoSunGrad)" />

          {/* Palm Tree Silhouette in deep navy/black */}
          <g fill="#0F172A">
            <path d="M 148 235 Q 165 190 178 140 Q 183 140 181 143 Q 170 190 156 236 Z" />
            <path d="M 178 140 Q 150 145 130 165 Q 148 152 178 140 Z" />
            <path d="M 178 140 Q 155 120 135 125 Q 155 130 178 140 Z" />
            <path d="M 178 140 Q 175 105 185 100 Q 185 120 178 140 Z" />
            <path d="M 178 140 Q 205 115 225 120 Q 200 130 178 140 Z" />
            <path d="M 178 140 Q 215 140 230 160 Q 205 148 178 140 Z" />
            <path d="M 145 150 L 138 162 M 155 142 L 148 155 M 165 138 L 160 150 M 190 130 L 200 142" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Sea Wave Shapes */}
          <path d="M 160 230 C 180 200 240 170 280 210 C 295 225 310 200 315 190 C 330 220 338 245 330 270 C 290 260 230 290 160 230 Z" fill="url(#logoWaveGrad)" />
          <path d="M 85 240 C 120 220 180 260 240 225 C 280 200 305 210 320 240 C 275 295 190 320 100 295 C 80 280 75 255 85 240 Z" fill="#38BDF8" />
          <circle cx="295" cy="180" r="5" fill="#38BDF8" />
          <circle cx="312" cy="175" r="4" fill="#38BDF8" />

          {/* White Soaring Jet Trail */}
          <path d="M 80 120 C 60 230 100 320 280 340 C 250 345 120 320 95 230 C 85 190 90 140 110 90 Z" fill="#FFFFFF" opacity="0.95" />

          {/* Airplane at the top left flight curve */}
          <g transform="translate(75, 45) rotate(-35)">
            <path d="M 25 0 L 35 15 L 35 45 L 25 55 L 20 45 L 20 15 Z" fill="#1E3A8A" />
            <path d="M 0 25 L 25 15 L 45 25 L 30 30 L 25 25 L 15 30 Z" fill="#1E3A8A" />
            <path d="M 12 50 L 25 42 L 35 50 L 25 48 Z" fill="#1E3A8A" />
            <circle cx="25" cy="10" r="2" fill="#FFFFFF" />
          </g>

          {/* Orbital Orange Ring */}
          <path d="M 40 240 C 25 290 80 350 180 365 C 280 380 370 330 380 270 C 385 240 370 210 345 190 C 355 210 360 240 345 265 C 320 310 245 345 170 335 C 105 325 55 285 55 245 C 55 235 50 238 40 240 Z" fill="url(#logoRingGrad)" />
          <path d="M 60 260 C 90 310 180 345 260 340 C 320 335 360 295 370 265 C 355 290 305 325 245 325 C 160 325 90 295 60 260 Z" fill="#FED7AA" opacity="0.6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-black tracking-tight font-display ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'
            } ${lightMode ? 'text-white' : 'text-slate-900'}`}
          >
            MACARENA
          </span>
          <span
            className={`font-bold tracking-widest text-[10px] uppercase ${
              lightMode ? 'text-amber-300' : 'text-amber-600'
            }`}
          >
            TRAVEL & TOURS
          </span>
        </div>
      )}
    </div>
  );
};
