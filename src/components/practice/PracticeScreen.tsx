import React, { useState, useMemo } from 'react';
import { 
  Keyboard, 
  Headphones, 
  Languages, 
  Code2, 
  Zap, 
  ArrowLeft, 
  RefreshCcw,
  BookOpen
} from 'lucide-react';
import { PracticeMode } from '../../types';
import { TypingEngine } from '../typing/TypingEngine';
import { book1Vocab, book2Vocab, book3Vocab, book4Vocab, book5Vocab, book6Vocab, EEWWord } from '../../data/vocabulary/eew_books';
import { VocabularyPlayer } from './VocabularyPlayer';
import { VocabDashboard } from './VocabDashboard';
import { GrammarTypingRoadmap } from './GrammarTypingRoadmap';
import { SpeedTypingRoadmap } from './speed_typing/SpeedTypingRoadmap';
import { ListeningTypingRoadmap } from './listening/ListeningTypingRoadmap';
import { ListeningTypingPlayer } from './listening/ListeningTypingPlayer';
import { listening_seed } from '../../data/listening_typing/listening_seed';
import { vocabProgressService } from '../../services/vocabProgressService';
import { VocabularyMediaService } from '../../services/vocabularyMediaService';

interface PracticeItem {
  prompt: string;
  persianPrompt?: string;
  targetText: string;
  hint?: string;
  audioPrompt?: boolean;
}

const mockData: Record<string, PracticeItem[]> = {
  sentence_typing: [
    {
      prompt: 'Type the daily routine sentence:',
      persianPrompt: 'من معمولاً ساعت هفت بیدار می‌شوم.',
      targetText: 'I usually wake up at seven.'
    }
  ],
  listening_typing: [
    {
      prompt: 'Listen to the audio and type what you hear:',
      targetText: 'Where can I find the check-in desk?',
      persianPrompt: 'میز پذیرش را کجا می‌توانم پیدا کنم؟',
      audioPrompt: true
    }
  ],
  translation_typing: [
    {
      prompt: 'Translate into English and type:',
      persianPrompt: 'من هر صبح قهوه می‌نوشم.',
      targetText: 'I drink coffee every morning.',
      hint: 'I drink ...'
    }
  ],
  grammar_typing: [
    {
      prompt: 'Complete the sentence with correct verb to be:',
      persianPrompt: 'سه صندلی در آشپزخانه وجود دارد.',
      targetText: 'There are three chairs in the kitchen.',
      hint: 'Use "There are" for plurals.'
    }
  ],
  speed_typing: [
    {
      prompt: 'Type as fast and accurately as you can:',
      persianPrompt: 'سرعت و روانی تایپ خود را بسنجید.',
      targetText: 'Practice makes perfect when learning a new language through daily typing.'
    }
  ]
};

const books = [
  { id: 1, title: 'Book 1', vocab: book1Vocab },
  { id: 2, title: 'Book 2', vocab: book2Vocab },
  { id: 3, title: 'Book 3', vocab: book3Vocab },
  { id: 4, title: 'Book 4', vocab: book4Vocab },
  { id: 5, title: 'Book 5', vocab: book5Vocab },
  { id: 6, title: 'Book 6', vocab: book6Vocab }
];

export const PracticeScreen: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PracticeMode | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [reviewWords, setReviewWords] = useState<EEWWord[] | null>(null);
  
  // States for standard typing modes
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedStats, setCompletedStats] = useState<{ accuracy: number; wpm: number; mistakesCount: number } | null>(null);
  
  // Refresh stats
  const [refreshKey, setRefreshKey] = useState(0);

  const practiceModes = [
    {
      id: 'listening_typing' as PracticeMode,
      title: 'Listening Typing',
      titleFa: 'شنیدن و تایپ (Dictation)',
      description: 'Listen to native audio and type what you hear.',
      icon: <Headphones className="w-6 h-6 text-indigo-400" />,
      color: 'border-indigo-500/20 bg-indigo-950/20'
    },
    {
      id: 'grammar_typing' as PracticeMode,
      title: 'Grammar Typing',
      titleFa: 'تایپ و تکمیل گرامر',
      description: 'Fill in grammatical blanks directly by typing the whole sentence.',
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-500/20 bg-emerald-950/20'
    },
    {
      id: 'speed_typing' as PracticeMode,
      title: 'Speed Typing',
      titleFa: 'تایپ سرعتی انگلیسی',
      description: 'Build typing muscle memory and fluent English keyboard speed.',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: 'border-yellow-500/20 bg-yellow-950/20'
    },
    {
      id: 'vocabulary' as PracticeMode,
      title: '4000 Essential Words',
      titleFa: 'یادگیری و تایپ (۴۰۰۰ لغت)',
      description: 'Master new words with translation and pronunciation.',
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/20 bg-cyan-950/20'
    }
  ];

  const currentData = activeMode && activeMode !== 'vocabulary' ? mockData[activeMode as string] || [] : [];

  const handleComplete = (stats: { accuracy: number; wpm: number; mistakesCount: number }) => {
    setCompletedStats({ accuracy: stats.accuracy, wpm: stats.wpm, mistakesCount: stats.mistakesCount });
  };

  const handleNext = () => {
    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCompletedStats(null);
    }
  };

  const handleRetry = () => {
    setCompletedStats(null);
  };

  const handleModeSelect = (mode: PracticeMode) => {
    setActiveMode(mode);
    setCurrentIndex(0);
    setCompletedStats(null);
    setSelectedBook(null);
    setReviewWords(null);
    setRefreshKey(k => k + 1);
  };

  const allProgress = useMemo(() => vocabProgressService.getAllProgress(), [refreshKey, activeMode, selectedBook, reviewWords]);

  
  if (activeMode === 'listening_typing') {
    let initialLevel = null;
    if (selectedTopicId) {
      const [level, subIndex] = selectedTopicId.split('_');
      const topic = listening_seed[level];
      if (topic) {
        if (subIndex !== undefined) {
          const sIdx = parseInt(subIndex, 10);
          const activeTopic = {
            ...topic,
            topicId: selectedTopicId,
            exercises: topic.exercises.slice(sIdx * 20, (sIdx + 1) * 20),
            titleEn: topic.titleEn + ' (Part ' + (sIdx + 1) + ')'
          };
          // Go back to the level's subsection list
          return <ListeningTypingPlayer topic={activeTopic} onClose={() => setSelectedTopicId(level)} />;
        } else {
          initialLevel = level;
        }
      }
    }
    return (
      <ListeningTypingRoadmap 
        onSelectTopic={setSelectedTopicId}
        onBack={() => {
          setSelectedTopicId(null);
          setActiveMode(null);
        }}
        initialLevel={initialLevel}
      />
    );
  }

  if (activeMode === 'grammar_typing') {
    return <GrammarTypingRoadmap onBack={() => setActiveMode(null)} />;
  }

  if (activeMode === 'speed_typing') {
    return <SpeedTypingRoadmap onBack={() => setActiveMode(null)} />;
  }

  if (activeMode === 'vocabulary' && !selectedBook && !reviewWords) {
    return (
      <VocabDashboard 
        onBack={() => setActiveMode(null)} 
        onSelectBook={(bookId) => setSelectedBook(bookId)}
        onStartReview={(words) => setReviewWords(words)}
      />
    );
  }

  if (activeMode === 'vocabulary' && reviewWords) {
    return (
      <VocabularyPlayer 
        words={reviewWords} 
        isReviewMode={true}
        onBack={() => {
          setReviewWords(null);
          setRefreshKey(k => k + 1);
        }} 
      />
    );
  }

  if (activeMode === 'vocabulary' && selectedBook) {
    const bookData = books.find(b => b.id === selectedBook)?.vocab || [];
    
    // Sort logic for Book learning: New words first, or preserving book order
    // But omit Mastered/Learning that aren't due to keep the list focused?
    // Actually, Learn mode should just show words that are New or Due.
    const now = Date.now();
    const activeWords = bookData.filter(w => {
      const p = allProgress[w.id];
      if (!p) return true; // New
      if (p.nextReviewAt <= now) return true; // Due
      return false; // Learning/Mastered but not due
    });

    return (
      <VocabularyPlayer 
        words={activeWords} 
        isReviewMode={false}
        onBack={() => {
          setSelectedBook(null);
          setRefreshKey(k => k + 1);
        }} 
      />
    );
  }

  if (activeMode) {
    const currentItem = currentData[currentIndex];
    return (
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 animate-in fade-in duration-300">
        <button
          onClick={() => setActiveMode(null)}
          className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practice Modes</span>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / currentData.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {currentIndex + 1} / {currentData.length}
          </span>
        </div>

        <div className="mb-8 text-center space-y-2">
          <h2 className="text-xl font-medium text-white">{currentItem.prompt}</h2>
          {currentItem.persianPrompt && (
            <p className="text-zinc-400 font-persian" dir="rtl">{currentItem.persianPrompt}</p>
          )}
        </div>

        <div className="bg-app-card rounded-2xl border border-white/5 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
          
          <TypingEngine
            targetText={currentItem.targetText}
            onComplete={handleComplete}
          />
        </div>

        {completedStats && (
          <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-app-card border border-emerald-500/20 text-center">
                <span className="block text-3xl font-bold text-emerald-400 font-mono mb-1">
                  {completedStats.accuracy}%
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Accuracy</span>
              </div>
              <div className="p-4 rounded-xl bg-app-card border border-indigo-500/20 text-center">
                <span className="block text-3xl font-bold text-indigo-400 font-mono mb-1">
                  {completedStats.wpm}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">WPM</span>
              </div>
              <div className="p-4 rounded-xl bg-app-card border border-orange-500/20 text-center">
                <span className="block text-3xl font-bold text-orange-400 font-mono mb-1">
                  {completedStats.mistakesCount}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Mistakes</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Retry</span>
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentIndex === currentData.length - 1}
                className="flex-[2] py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-lg shadow-purple-500/20"
              >
                {currentIndex === currentData.length - 1 ? 'Section Complete' : 'Next Exercise'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Practice Lab</h1>
        <p className="text-zinc-400 font-persian max-w-2xl mx-auto" dir="rtl">
          در این بخش می‌توانید مهارت‌های مختلف زبان انگلیسی خود را با تمرینات تعاملی تایپ بهبود ببخشید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practiceModes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => {
              // Unlock audio explicitly here on the interaction!
              if (mode.id === 'vocabulary') {
                VocabularyMediaService.unlockAudio();
              }
              handleModeSelect(mode.id);
            }}
            className="p-5 rounded-2xl bg-app-card border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${mode.color}`}>
              {mode.icon}
            </div>
            
            <h3 className="font-bold text-lg text-white mb-1">{mode.title}</h3>
            <p className="text-xs text-purple-400/80 font-persian mb-2" dir="rtl">{mode.titleFa}</p>
            <p className="text-sm text-zinc-500 leading-relaxed">{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

