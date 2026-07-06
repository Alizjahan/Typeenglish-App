import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, CheckCircle2, ChevronDown, ChevronUp, Lock, Sparkles, Target } from 'lucide-react';
import { a1Level } from '../../data/cefr/a1';
import { a2Level } from '../../data/cefr/a2';
import { b1Level } from '../../data/cefr/b1';
import { b2Level } from '../../data/cefr/b2';
import { c1Level } from '../../data/cefr/c1';
import { GrammarTypingPlayer } from './grammar/GrammarTypingPlayer';
import { grammar_seed } from '../../data/grammar_typing/grammar_seed';
import { grammarProgressService, GrammarProgressMap } from '../../services/grammarProgressService';

interface GrammarTypingRoadmapProps {
  onBack: () => void;
}

const cefrLevels = [a1Level, a2Level, b1Level, b2Level, c1Level];

export const GrammarTypingRoadmap: React.FC<GrammarTypingRoadmapProps> = ({ onBack }) => {
  const [expandedLevel, setExpandedLevel] = useState<string>('A1');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<GrammarProgressMap>({});

  const refreshProgress = () => {
    setProgressMap(grammarProgressService.getAllProgress());
  };

  useEffect(() => {
    refreshProgress();
  }, [selectedTopicId]); // Refresh when returning from a topic

  if (selectedTopicId) {
    const topicData = grammar_seed[selectedTopicId]; // In real app, load from appropriate dictionary
    if (topicData) {
      return (
        <GrammarTypingPlayer 
          topic={topicData} 
          onBack={() => {
            setSelectedTopicId(null);
            refreshProgress();
          }} 
        />
      );
    } else {
      alert('Content for this topic is under development.');
      setSelectedTopicId(null);
    }
  }

  const levelColors: Record<string, string> = {
    A1: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    A2: 'text-sky-400 bg-sky-950/40 border-sky-500/30',
    B1: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30',
    B2: 'text-purple-400 bg-purple-950/40 border-purple-500/30',
    C1: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Practice Modes</span>
      </button>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Grammar Typing</h1>
        <p className="text-zinc-400 font-persian max-w-2xl mx-auto" dir="rtl">
          مسیر یادگیری گرامر مبتنی بر CEFR (همراه با تمرین تایپ و تحلیل ساختار جملات)
        </p>
      </div>

      <div className="space-y-4">
        {cefrLevels.map((level) => {
          const isExpanded = expandedLevel === level.id;
          const isUnlocked = true; // Temporary unlock all levels for dev
          
          const allLessons = level.units.flatMap(u => u.lessons);
          const totalLessons = allLessons.length;
          
          // Calculate completed lessons based on actual progress
          const completedLessons = allLessons.filter(l => {
             const p = progressMap[l.id];
             return p && p.status === 'completed';
          }).length;
          
          const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
          const colorClass = levelColors[level.id] || levelColors.A1;

          return (
            <div
              key={level.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isUnlocked ? 'bg-app-card border-white/10' : 'bg-zinc-900/30 border-white/5 opacity-75'
              }`}
            >
              {/* Level Header */}
              <div
                onClick={() => isUnlocked && setExpandedLevel(isExpanded ? '' : level.id)}
                className={`p-5 flex items-center justify-between transition-colors ${
                  isUnlocked ? 'cursor-pointer hover:bg-white/5' : 'cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center shrink-0 ${colorClass}`}>
                    <span className="text-xl font-bold font-mono">{level.id}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{level.title}</h3>
                      <span className="text-xs text-zinc-500 font-persian hidden sm:inline-block" dir="rtl">
                        ({level.persianTitle})
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{level.tagline}</p>
                    {isUnlocked && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">{completedLessons}/{totalLessons} topics</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isUnlocked ? (
                    <>
                      {progressPercent === 100 && totalLessons > 0 && <Sparkles className="w-4 h-4 text-yellow-400" />}
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                    </>
                  ) : (
                    <Lock className="w-5 h-5 text-zinc-600" />
                  )}
                </div>
              </div>

              {/* Topics List */}
              {isExpanded && isUnlocked && (
                <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-2">
                  {allLessons.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-2 italic font-persian" dir="rtl">
                      در حال تدوین محتوا...
                    </p>
                  ) : (
                    allLessons.map((lesson, index) => {
                      const p = progressMap[lesson.id];
                      const isCompleted = p && p.status === 'completed';
                      
                      return (
                        <div
                          key={lesson.id}
                          className="p-3 rounded-lg bg-zinc-900/50 hover:bg-purple-950/20 border border-white/5 hover:border-purple-500/30 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                              isCompleted 
                                ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-zinc-800 text-zinc-400 group-hover:bg-purple-600 group-hover:text-white'
                            }`}>
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : (index + 1)}
                            </div>

                            <div>
                              <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors block">
                                {lesson.title}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setSelectedTopicId(lesson.id)}
                              className="px-3 py-1.5 rounded-md bg-purple-600/20 text-purple-400 text-xs font-semibold group-hover:bg-purple-600 group-hover:text-white transition-colors"
                            >
                              Practice
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
