import React, { useState, useEffect } from 'react';
import { User, UserProgress, NavigationTab } from './types';
import { storageService } from './services/storageService';
import { BottomNav } from './components/common/BottomNav';
import { PracticeScreen } from './components/practice/PracticeScreen';
import { ReviewScreen } from './components/review/ReviewScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { PlacementModal } from './components/onboarding/PlacementModal';

export default function App() {
  const [user, setUser] = useState<User>(() => storageService.getUser());
  const [progress, setProgress] = useState<UserProgress>(() => storageService.getProgress());
  const [currentTab, setCurrentTab] = useState<NavigationTab>('profile');
  const [isPlacementOpen, setIsPlacementOpen] = useState(false);

  useEffect(() => {
    if (!user.placementTaken) {
      setIsPlacementOpen(true);
    }
  }, [user.placementTaken]);

  const handleUpdateUser = (partial: Partial<User>) => {
    const updated = storageService.updateUser(partial);
    setUser(updated);
  };

  const handleSetLevel = (lvl: any) => {
    storageService.unlockLevel(lvl);
    setUser(storageService.getUser());
    setProgress(storageService.getProgress());
  };

  return (
    <div className={`min-h-[100dvh] transition-colors duration-300 ${user.settings.appTheme || 'default'}`}>
      <div className="flex flex-col min-h-[100dvh] max-w-[1200px] mx-auto w-full bg-app-bg text-white relative shadow-2xl overflow-hidden font-sans border-x border-white/5 selection:bg-purple-500/30">
        
        {/* Abstract Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex-1 flex flex-col relative z-10 overflow-y-auto overflow-x-hidden scroll-smooth">
          <PlacementModal
            isOpen={isPlacementOpen}
            onClose={() => setIsPlacementOpen(false)}
            currentLevel={user.level}
            onSetLevel={handleSetLevel}
          />

          <main className="flex-1 pb-24">
            {currentTab === 'practice' && (
              <PracticeScreen />
            )}

            {currentTab === 'review' && (
              <ReviewScreen />
            )}

            {currentTab === 'profile' && (
              <ProfileScreen
                user={user}
                progress={progress}
                onUpdateUser={handleUpdateUser}
                onOpenPlacementTest={() => setIsPlacementOpen(true)}
              />
            )}
          </main>

          <BottomNav
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </div>
      </div>
    </div>
  );
}
