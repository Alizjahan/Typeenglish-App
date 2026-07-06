import React, { useState } from 'react';
import { ChevronRight, PlayCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { listening_seed } from '../../../data/listening_typing/listening_seed';
import { listeningProgressService } from '../../../services/listeningProgressService';
import { CEFRLevel } from '../../../types/listening';

interface Props {
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}

export function ListeningTypingRoadmap({ onSelectTopic, onBack, initialLevel }: Props & { initialLevel?: string | null }) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(initialLevel || null);
  const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const getLevelProgress = (level: string) => {
    const topic = listening_seed[level];
    if (!topic) return { total: 0, completed: 0, percent: 0 };
    
    const total = topic.exercises.length;
    let completed = 0;
    
    const partsCount = Math.ceil(total / 20);
    for (let i = 0; i < partsCount; i++) {
      const p = listeningProgressService.getTopicProgress(level + "_" + i);
      completed += p.completedExerciseIds.length;
    }
    
    return {
      total,
      completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getSubsectionProgress = (level: string, partIndex: number, exercisesCount: number) => {
    const p = listeningProgressService.getTopicProgress(level + "_" + partIndex);
    const completed = p.completedExerciseIds.length;
    return {
      total: exercisesCount,
      completed,
      percent: exercisesCount > 0 ? Math.round((completed / exercisesCount) * 100) : 0
    };
  };

  if (selectedLevel) {
    const topic = listening_seed[selectedLevel];
    const totalExercises = topic.exercises.length;
    const partsCount = Math.ceil(totalExercises / 20);
    
    return (
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setSelectedLevel(null)} className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">{topic.titleEn} Subsections</h2>
            <p className="text-zinc-400 text-sm">Select a part to practice.</p>
          </div>
        </div>

        <div className="grid gap-4">
          {Array.from({ length: partsCount }).map((_, i) => {
            const exercisesInPart = Math.min(20, totalExercises - i * 20);
            const progress = getSubsectionProgress(selectedLevel, i, exercisesInPart);
            const isComplete = progress.completed === progress.total && progress.total > 0;
            const topicId = selectedLevel + "_" + i;

            return (
              <button
                key={i}
                onClick={() => onSelectTopic(topicId)}
                className="bg-app-card rounded-2xl p-6 border border-white/5 hover:border-indigo-500/50 transition-all text-left flex items-center justify-between group cursor-pointer w-full"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-[60px] h-[44px] rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-semibold text-sm shrink-0 whitespace-nowrap">
                    Part {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white truncate">Exercises {i * 20 + 1} - {i * 20 + exercisesInPart}</h3>
                      {isComplete && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-500"
                          style={{ width: progress.percent + '%' }}
                        />
                      </div>
                      <span className="text-xs font-medium text-zinc-500 w-12 text-right">
                        {progress.percent}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-6 pl-6 border-l border-white/5 flex flex-col items-end gap-2 shrink-0">
                  <div className="text-xs text-zinc-500 font-medium">
                    {progress.completed} / {progress.total}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 group-hover:bg-indigo-500 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Lab
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Listening Typing</h2>
          <p className="text-zinc-400 text-sm">Listen to native audio and type exactly what you hear.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {cefrLevels.map(level => {
          const topic = listening_seed[level];
          if (!topic) return null;
          
          const progress = getLevelProgress(level);
          const isComplete = progress.completed === progress.total && progress.total > 0;

          return (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className="bg-app-card rounded-2xl p-6 border border-white/5 hover:border-indigo-500/50 transition-all text-left flex items-center justify-between group cursor-pointer w-full"
            >
              <div className="flex items-center gap-6 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-bold text-2xl shrink-0">
                  {level}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white truncate">{topic.titleEn}</h3>
                    {isComplete && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-sm text-zinc-400 mb-3 truncate">{topic.titleFa}</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-500"
                        style={{ width: progress.percent + '%' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-zinc-500 w-12 text-right">
                      {progress.percent}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-6 pl-6 border-l border-white/5 flex flex-col items-end gap-2 shrink-0">
                <div className="text-xs text-zinc-500 font-medium">
                  {progress.completed} / {progress.total}
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-800 group-hover:bg-indigo-500 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
