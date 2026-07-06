import React from 'react';

export type FingerType = 
  | 'l_pinky' | 'l_ring' | 'l_middle' | 'l_index' | 'l_thumb'
  | 'r_thumb' | 'r_index' | 'r_middle' | 'r_ring' | 'r_pinky';

interface Props {
  activeFinger: FingerType | null;
}

export const HandGuide: React.FC<Props> = ({ activeFinger }) => {
  const getFingerStyle = (finger: FingerType) => {
    const isActive = activeFinger === finger;
    return {
      fill: isActive ? '#a855f7' : 'currentColor',
      opacity: isActive ? 1 : 0.3,
      transition: 'all 0.2s ease',
    };
  };

  return (
    <div className="flex justify-center gap-8 mt-6 max-w-lg mx-auto text-zinc-600">
      {/* Left Hand SVG */}
      <svg width="120" height="150" viewBox="0 0 100 120" className="opacity-80">
        {/* Palm */}
        <path d="M 30,70 Q 50,110 70,120 L 70,70 Z" fill="currentColor" opacity="0.3" />
        {/* Pinky */}
        <rect x="25" y="45" width="10" height="30" rx="5" style={getFingerStyle('l_pinky')} />
        {/* Ring */}
        <rect x="40" y="30" width="10" height="45" rx="5" style={getFingerStyle('l_ring')} />
        {/* Middle */}
        <rect x="55" y="25" width="10" height="50" rx="5" style={getFingerStyle('l_middle')} />
        {/* Index */}
        <rect x="70" y="35" width="10" height="40" rx="5" style={getFingerStyle('l_index')} />
        {/* Thumb */}
        <rect x="85" y="75" width="10" height="30" rx="5" transform="rotate(45 85 75)" style={getFingerStyle('l_thumb')} />
      </svg>
      
      {/* Right Hand SVG */}
      <svg width="120" height="150" viewBox="0 0 100 120" className="opacity-80">
        {/* Palm */}
        <path d="M 30,70 L 30,120 Q 50,110 70,70 Z" fill="currentColor" opacity="0.3" />
        {/* Thumb */}
        <rect x="5" y="75" width="10" height="30" rx="5" transform="rotate(-45 15 75)" style={getFingerStyle('r_thumb')} />
        {/* Index */}
        <rect x="20" y="35" width="10" height="40" rx="5" style={getFingerStyle('r_index')} />
        {/* Middle */}
        <rect x="35" y="25" width="10" height="50" rx="5" style={getFingerStyle('r_middle')} />
        {/* Ring */}
        <rect x="50" y="30" width="10" height="45" rx="5" style={getFingerStyle('r_ring')} />
        {/* Pinky */}
        <rect x="65" y="45" width="10" height="30" rx="5" style={getFingerStyle('r_pinky')} />
      </svg>
    </div>
  );
};
