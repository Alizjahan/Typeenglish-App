import React from 'react';
import { Home, Dumbbell, Repeat, UserCircle2 } from 'lucide-react';
import { NavigationTab } from '../../types';

interface Props {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  reviewCount?: number;
}

export const BottomNav: React.FC<Props> = ({ currentTab, onSelectTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-app-card/95 backdrop-blur-xl border-t border-white/5 pb-safe z-50">
      <div className="flex items-center justify-around p-3 max-w-[1200px] mx-auto w-full">
        <button
          onClick={() => onSelectTab('practice')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[70px] transition-all duration-200 ${
            currentTab === 'practice' ? 'text-cyan-400 bg-cyan-950/30' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <Dumbbell className={`w-6 h-6 ${currentTab === 'practice' ? 'animate-bounce-subtle' : ''}`} />
          <span className="text-[10px] font-semibold tracking-wide">Practice</span>
        </button>

        <button
          onClick={() => onSelectTab('review')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[70px] transition-all duration-200 relative ${
            currentTab === 'review' ? 'text-fuchsia-400 bg-fuchsia-950/30' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <Repeat className={`w-6 h-6 ${currentTab === 'review' ? 'animate-bounce-subtle' : ''}`} />
          <span className="text-[10px] font-semibold tracking-wide">Review</span>
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[70px] transition-all duration-200 ${
            currentTab === 'profile' ? 'text-indigo-400 bg-indigo-950/30' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          <UserCircle2 className={`w-6 h-6 ${currentTab === 'profile' ? 'animate-bounce-subtle' : ''}`} />
          <span className="text-[10px] font-semibold tracking-wide">Profile</span>
        </button>
      </div>
    </div>
  );
};
