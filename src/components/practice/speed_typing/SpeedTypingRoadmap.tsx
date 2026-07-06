import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, ChevronDown, ChevronUp, Zap, CheckCircle2, Star } from 'lucide-react';
import { speedTypingCurriculum } from '../../../data/speed_typing/seed';
import { SpeedTypingPlayer } from './SpeedTypingPlayer';
import { SpeedTypingLesson } from '../../../data/speed_typing/types';
import { speedTypingProgressService, SpeedTypingProgress } from '../../../services/speedTypingProgressService';

interface Props {
  onBack: () => void;
}

export const SpeedTypingRoadmap: React.FC<Props> = ({ onBack }) => {
  const [expandedLevel, setExpandedLevel] = useState<string>('beginner');
  const [activeLesson, setActiveLesson] = useState<SpeedTypingLesson | null>(null);
  const [progress, setProgress] = useState<SpeedTypingProgress>({});

  const refreshProgress = () => {
    setProgress(speedTypingProgressService.getAllProgress());
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  if (activeLesson) {
    return (
      <SpeedTypingPlayer 
        lesson={activeLesson} 
        onBack={() => {
          setActiveLesson(null);
          refreshProgress();
        }} 
      />
    );
  }

  const isLessonCompleted = (lesson: SpeedTypingLesson) => {
    return lesson.exercises.length > 0 && lesson.exercises.every(ex => progress[ex.id]?.completed);
  };

  const getLessonCompletionCount = (lesson: SpeedTypingLesson) => {
    return lesson.exercises.filter(ex => progress[ex.id]?.completed).length;
  };
  
  const getLessonStars = (lesson: SpeedTypingLesson) => {
    return lesson.exercises.reduce((acc, ex) => acc + (progress[ex.id]?.bestStars || 0), 0);
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-app-card border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Speed Typing
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Build typing muscle memory and fluent English keyboard speed</p>
        </div>
      </div>

      <div className="space-y-4">
        {speedTypingCurriculum.map(level => {
          const isExpanded = expandedLevel === level.id;
          
          let levelCompletedLessons = 0;
          level.lessons.forEach(l => {
            if (isLessonCompleted(l)) levelCompletedLessons++;
          });
          
          const levelProgress = Math.round((levelCompletedLessons / level.lessons.length) * 100);

          return (
            <div 
              key={level.id}
              className={`bg-app-card rounded-2xl border transition-all duration-300 ${
                isExpanded ? 'border-yellow-500/30 shadow-lg shadow-yellow-500/10' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setExpandedLevel(isExpanded ? '' : level.id)}
                className="w-full flex items-center justify-between p-5"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                    isExpanded ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400' : 'border-white/10 bg-white/5 text-zinc-400'
                  }`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">{level.title}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-zinc-400">{level.description}</span>
                      <span className="text-white/20">&bull;</span>
                      <span className="text-yellow-400/80 font-mono">{levelProgress}% Complete</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-400" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-white/5 p-5 bg-black/20">
                  <div className="space-y-3">
                    {level.lessons.map(lesson => {
                      const completedCount = getLessonCompletionCount(lesson);
                      const isComplete = isLessonCompleted(lesson);
                      const maxStars = lesson.exercises.length * 3;
                      const earnedStars = getLessonStars(lesson);
                      
                      return (
                        <div 
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className="group flex items-center justify-between p-4 rounded-xl bg-app-card border border-white/5 hover:border-yellow-500/30 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-4">
                            {isComplete ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-white/10 group-hover:border-yellow-500/30" />
                            )}
                            <div>
                              <h4 className={`font-semibold transition-colors ${isComplete ? 'text-zinc-300' : 'text-white group-hover:text-yellow-400'}`}>
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-zinc-500 font-mono">
                                  {completedCount} / {lesson.exercises.length} Exercises &bull; Target: {lesson.targetWPM || 20} WPM
                                </span>
                                {completedCount > 0 && (
                                  <>
                                    <span className="text-white/20">&bull;</span>
                                    <span className="flex items-center text-xs text-yellow-500/80">
                                      <Star className="w-3 h-3 fill-yellow-500/80 mr-1" />
                                      {earnedStars} / {maxStars}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                            <Play className="w-5 h-5 text-yellow-400 ml-1" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
