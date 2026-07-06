import React, { useState, useEffect } from 'react';
import { Book, Keyboard, Headphones, AlignLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { reviewService, ReviewItem } from '../../services/reviewService';
import { VocabularyPlayer } from '../practice/VocabularyPlayer';
import { GrammarTypingPlayer } from '../practice/grammar/GrammarTypingPlayer';
import { ListeningTypingPlayer } from '../practice/listening/ListeningTypingPlayer';
import { SpeedTypingPlayer } from '../practice/speed_typing/SpeedTypingPlayer';

export const ReviewScreen: React.FC = () => {
  const [reviewItems, setReviewItems] = useState<{
    vocabulary: ReviewItem[];
    grammar: ReviewItem[];
    listening: ReviewItem[];
    speedTyping: ReviewItem[];
  }>({ vocabulary: [], grammar: [], listening: [], speedTyping: [] });

  const [activeCategory, setActiveCategory] = useState<'vocabulary' | 'grammar' | 'listening' | 'speedTyping' | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setReviewItems({
      vocabulary: reviewService.getVocabularyReviewItems(),
      grammar: reviewService.getGrammarReviewItems(),
      listening: reviewService.getListeningReviewItems(),
      speedTyping: reviewService.getSpeedTypingReviewItems(),
    });
  }, [refreshKey]);

  if (activeCategory === 'vocabulary') {
    const words = reviewService.resolveVocabulary(reviewItems.vocabulary.map(i => i.sourceId));
    if (words.length > 0) {
      return (
        <VocabularyPlayer
          words={words}
          isReviewMode={true}
          onBack={() => {
            setActiveCategory(null);
            setRefreshKey(k => k + 1);
          }}
        />
      );
    }
  }

  if (activeCategory === 'grammar') {
    const item = reviewItems.grammar[activeItemIndex];
    if (item) {
      const topic = reviewService.resolveGrammarTopic(item.sourceId);
      if (topic) {
        return (
          <GrammarTypingPlayer
            topic={topic}
            onBack={() => {
              setActiveCategory(null);
              setActiveItemIndex(0);
              setRefreshKey(k => k + 1);
            }}
          />
        );
      }
    }
  }

  if (activeCategory === 'listening') {
    const item = reviewItems.listening[activeItemIndex];
    if (item) {
      const resolved = reviewService.resolveListeningExercise(item.sourceId);
      if (resolved) {
        const syntheticTopic = {
          ...resolved.topic,
          exercises: [resolved.exercise]
        };
        return (
          <ListeningTypingPlayer
            topic={syntheticTopic}
            onClose={() => {
              setActiveCategory(null);
              setActiveItemIndex(0);
              setRefreshKey(k => k + 1);
            }}
          />
        );
      }
    }
  }

  if (activeCategory === 'speedTyping') {
    const item = reviewItems.speedTyping[activeItemIndex];
    if (item) {
      const lesson = reviewService.resolveSpeedTypingLesson(item.sourceId);
      if (lesson) {
        return (
          <SpeedTypingPlayer
            lesson={lesson}
            onBack={() => {
              setActiveCategory(null);
              setActiveItemIndex(0);
              setRefreshKey(k => k + 1);
            }}
          />
        );
      }
    }
  }

  const renderCard = (
    title: string,
    icon: React.ReactNode,
    category: 'vocabulary' | 'grammar' | 'listening' | 'speedTyping',
    items: ReviewItem[],
    colorScheme: { text: string, bg: string, border: string, hover: string, glow: string }
  ) => {
    const isCaughtUp = items.length === 0;

    return (
      <div className={`p-6 rounded-2xl bg-app-card border-t-[3px] border-l border-r border-b border-white/5 flex flex-col justify-between transition-all group ${colorScheme.border} ${colorScheme.glow}`}>
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${colorScheme.bg} ${colorScheme.text}`}>
              {icon}
            </div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
          </div>
          {isCaughtUp ? (
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Caught up</span>
            </div>
          ) : (
            <div className={`flex flex-col items-end`}>
              <span className={`text-2xl font-bold font-mono ${colorScheme.text}`}>{items.length}</span>
              <span className="text-xs text-zinc-500 font-semibold uppercase">Due</span>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (!isCaughtUp) {
              setActiveCategory(category);
              setActiveItemIndex(0);
            }
          }}
          disabled={isCaughtUp}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            isCaughtUp 
              ? 'bg-zinc-900/50 text-zinc-600 cursor-not-allowed border border-white/5' 
              : `${colorScheme.bg} ${colorScheme.text} ${colorScheme.hover} cursor-pointer shadow-lg`
          }`}
        >
          <span>Review {title}</span>
          {!isCaughtUp && <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-8 flex flex-col animate-in fade-in duration-300 pb-24">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Review Dashboard</h1>
        <p className="text-zinc-400 font-persian text-lg" dir="rtl">مرور تمرین‌هایی که نیاز به تقویت دارند</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderCard(
          'Vocabulary', 
          <Book className="w-6 h-6" />, 
          'vocabulary', 
          reviewItems.vocabulary,
          { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500', hover: 'hover:bg-cyan-500/20', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.05)]' }
        )}
        
        {renderCard(
          'Grammar', 
          <AlignLeft className="w-6 h-6" />, 
          'grammar', 
          reviewItems.grammar,
          { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500', hover: 'hover:bg-purple-500/20', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.05)]' }
        )}
        
        {renderCard(
          'Listening', 
          <Headphones className="w-6 h-6" />, 
          'listening', 
          reviewItems.listening,
          { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500', hover: 'hover:bg-pink-500/20', glow: 'shadow-[0_0_20px_rgba(236,72,153,0.05)]' }
        )}
        
        {renderCard(
          'Speed Typing', 
          <Keyboard className="w-6 h-6" />, 
          'speedTyping', 
          reviewItems.speedTyping,
          { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500', hover: 'hover:bg-orange-500/20', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.05)]' }
        )}
      </div>
    </div>
  );
};
