import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCcw, ChevronRight, ChevronLeft, Target, Zap, Star } from 'lucide-react';
import { SpeedTypingLesson } from '../../../data/speed_typing/types';
import { TypingEngine, TypingStats } from '../../typing/TypingEngine';
import { speedTypingProgressService, SpeedTypingRecord } from '../../../services/speedTypingProgressService';
import { speedTypingCurriculum } from '../../../data/speed_typing/seed';
import { sfxEngine } from '../../../utils/audioService';

interface Props {
  lesson: SpeedTypingLesson;
  onBack: () => void;
  globalSoundEnabled?: boolean;
}

export const SpeedTypingPlayer: React.FC<Props> = ({ lesson, onBack, globalSoundEnabled = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resultStats, setResultStats] = useState<{wpm: number, accuracy: number, mistakesCount: number, timeSpentSeconds: number, isNewBest: boolean, stars: number} | null>(null);
  const [progress, setProgress] = useState<Record<string, SpeedTypingRecord>>({});
  const [displayedStars, setDisplayedStars] = useState(0);

  const loadProgress = useCallback(() => {
    setProgress(speedTypingProgressService.getAllProgress());
  }, []);

  useEffect(() => {
    const allProg = speedTypingProgressService.getAllProgress();
    setProgress(allProg);
    const firstUncompleted = lesson.exercises.findIndex(ex => !allProg[ex.id]?.completed);
    if (firstUncompleted !== -1) {
      setCurrentIndex(firstUncompleted);
    }
  }, [lesson]);

  useEffect(() => {
    sfxEngine.isMuted = !globalSoundEnabled;
  }, [globalSoundEnabled]);

  const currentExercise = lesson.exercises[currentIndex];
  const targetWPM = lesson.targetWPM || 20;
  
  let currentLevelId = '';
  let currentLevelTitle = '';
  let lessonIndexInLevel = 0;
  
  for (const lvl of speedTypingCurriculum) {
    const idx = lvl.lessons.findIndex(l => l.id === lesson.id);
    if (idx !== -1) {
      currentLevelId = lvl.id;
      currentLevelTitle = lvl.title;
      lessonIndexInLevel = idx + 1;
      break;
    }
  }

  const handleComplete = (stats: TypingStats) => {
    let earnedStars = 0;
    let completed = false;

    if (stats.accuracy >= 90 && stats.wpm >= targetWPM) {
      earnedStars = 3;
      completed = true;
    } else if (stats.accuracy >= 85 && stats.wpm >= (targetWPM * 0.75)) {
      earnedStars = 2;
      completed = true;
    } else if (stats.accuracy >= 60) {
      earnedStars = 1;
      completed = true;
    } else {
      earnedStars = 0;
      completed = false; // Failed
    }

    const existing = progress[currentExercise.id];
    let isNewBest = false;

    if (completed) {
      isNewBest = !existing || stats.wpm > existing.bestWPM || stats.accuracy > existing.bestAccuracy;
      speedTypingProgressService.saveProgress(currentExercise.id, stats.wpm, stats.accuracy, earnedStars);
      loadProgress();
    }
    
    setResultStats({ ...stats, isNewBest, stars: earnedStars });
    setIsFinished(true);
    setDisplayedStars(0);
  };

  useEffect(() => {
    if (isFinished && resultStats && resultStats.stars > 0) {
      let currentStar = 0;
      const interval = setInterval(() => {
        if (currentStar < resultStats.stars) {
          currentStar++;
          setDisplayedStars(currentStar);
          sfxEngine.play('star');
        } else {
          clearInterval(interval);
        }
      }, 350); 
      return () => clearInterval(interval);
    }
  }, [isFinished, resultStats]);

  const handleNext = () => {
    if (currentIndex < lesson.exercises.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setIsFinished(false);
      setResultStats(null);
    } else {
      onBack();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(curr => curr - 1);
      setIsFinished(false);
      setResultStats(null);
    }
  };
  
  const handleRetry = () => {
    setIsFinished(false);
    setResultStats(null);
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-app-card border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
          <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2 font-mono">
            <span>Exercise {currentIndex + 1} of {lesson.exercises.length}</span>
            <span>&bull;</span>
            <span>Target: {targetWPM} WPM</span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-app-card rounded-2xl border border-white/5 p-6 sm:p-8 shadow-2xl relative flex flex-col justify-center mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none rounded-2xl" />
          
          <TypingEngine
            targetText={currentExercise.text}
            onComplete={handleComplete}
            showKeyboardGuide={true}
            soundEnabled={globalSoundEnabled}
          />
          
          <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-6 z-10 relative">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="px-4 py-2 flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="text-sm font-mono flex items-center gap-2">
               {progress[currentExercise.id]?.completed && (
                  <>
                    <span className="text-emerald-400/70">Completed</span>
                    <span className="flex text-yellow-400/80">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < progress[currentExercise.id].bestStars ? 'fill-yellow-400/80' : 'text-zinc-700 fill-transparent'}`} />
                      ))}
                    </span>
                  </>
               )}
            </div>
            <button 
              onClick={handleNext} 
              className="px-6 py-2 flex items-center gap-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-semibold transition-colors"
            >
              Skip <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-app-card rounded-2xl border border-white/5 p-8 shadow-2xl relative flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 mb-8">
          {resultStats?.stars === 0 ? (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-red-400 mb-2">Failed</h3>
              <p className="text-zinc-400 mb-8">Accuracy below 60%. Take your time and focus on the correct keys.</p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-6">Exercise Complete</h3>
              <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3].map((starIdx) => (
                  <div key={starIdx} className="relative">
                    <Star 
                      className="w-16 h-16 text-zinc-800 fill-zinc-800/50 transition-all duration-300"
                    />
                    {displayedStars >= starIdx && (
                      <Star 
                        className="w-16 h-16 text-yellow-400 fill-yellow-400 absolute inset-0 animate-in zoom-in spin-in-12 duration-300 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {resultStats?.isNewBest && (
                <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full mb-6">
                  New Personal Best!
                </span>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-mono font-bold text-white">{resultStats?.wpm}</div>
              <div className="text-xs text-zinc-400 mt-1">WPM (Target: {targetWPM})</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-mono font-bold text-white">{resultStats?.accuracy}%</div>
              <div className="text-xs text-zinc-400 mt-1">Accuracy</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <div className="text-3xl font-mono font-bold text-red-400 mt-4">{resultStats?.mistakesCount}</div>
              <div className="text-xs text-zinc-400 mt-1">Errors</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <div className="text-3xl font-mono font-bold text-blue-400 mt-4">{resultStats?.timeSpentSeconds}s</div>
              <div className="text-xs text-zinc-400 mt-1">Time</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 text-zinc-400 font-medium rounded-xl transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" /> Try Again
            </button>
            {resultStats?.stars !== 0 && (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              >
                {currentIndex < lesson.exercises.length - 1 ? 'Next Exercise' : 'Finish Lesson'} <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
