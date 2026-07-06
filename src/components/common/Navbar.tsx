import React from 'react';
import { Flame, Zap, Volume2, VolumeX, Languages, Compass } from 'lucide-react';
import { User, CEFRLevel } from '../../types';

interface NavbarProps {
  user: User;
  showPersian: boolean;
  onTogglePersian: () => void;
  onToggleSound: () => void;
  onOpenPlacement: () => void;
  onSelectLevel: (lvl: CEFRLevel) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  showPersian,
  onTogglePersian,
  onToggleSound,
  onOpenPlacement,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0e0f15]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand & Level */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm shadow-inner shadow-purple-500/10">
              ⌨
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white leading-none">
                TypeEnglish
              </span>
              <span className="text-[10px] text-zinc-400 font-persian leading-tight" dir="rtl">
                یادگیری با تایپ
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Level Pill */}
          <button
            onClick={onOpenPlacement}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 hover:border-purple-400/50 text-purple-300 text-xs font-semibold transition-colors group cursor-pointer"
            title="Click to change level or take Placement Test"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>{user.level}</span>
            <span className="text-[11px] text-purple-400/70 hidden md:inline font-persian">
              {user.level === 'A1' ? 'مبتدی' : user.level === 'A2' ? 'مقدماتی' : user.level === 'B1' ? 'متوسط' : user.level}
            </span>
            <Compass className="w-3 h-3 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
          </button>
        </div>

        {/* Right: Streak, XP, Persian Toggle, Sound */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Persian Toggle */}
          <button
            onClick={onTogglePersian}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
              showPersian
                ? 'bg-purple-950/30 border-purple-500/30 text-purple-300'
                : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Toggle Persian translations"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="font-persian text-[11px]">{showPersian ? 'فارسی روشن' : 'فارسی خاموش'}</span>
          </button>

          {/* Streak */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/20 border border-orange-500/20 text-orange-400 text-xs font-semibold"
            title={`${user.streak} day learning streak`}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-400/30" />
            <span>{user.streak}</span>
          </div>

          {/* XP */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-950/20 border border-yellow-500/20 text-yellow-400 text-xs font-semibold"
            title={`${user.xp} Total XP earned`}
          >
            <Zap className="w-3.5 h-3.5 fill-yellow-400/30" />
            <span>{user.xp} <span className="text-[10px] opacity-75">XP</span></span>
          </div>

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border transition-colors ${
              user.settings.soundEnabled
                ? 'bg-zinc-900 border-white/5 text-zinc-300 hover:text-white'
                : 'bg-zinc-900 border-red-500/20 text-red-400'
            }`}
            title={user.settings.soundEnabled ? 'Sound is on' : 'Sound is muted'}
          >
            {user.settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
