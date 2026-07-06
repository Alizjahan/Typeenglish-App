import React, { useState, useEffect } from 'react';
import { Volume2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { EEWWord } from '../../data/vocabulary/eew_books';
import { TypingEngine } from '../typing/TypingEngine';
import { vocabProgressService, Rating } from '../../services/vocabProgressService';
import { VocabularyMediaService } from '../../services/vocabularyMediaService';

const extractWordMeaning = (meaningFa: string) => {
  if (!meaningFa) return '';
  let s = meaningFa.replace(/^یک\s+/, '').replace(/^(?:«|")([^»"]+)(?:»|")/, '$1');
  
  const cues = [
    'یعنی', 'به معنای', 'به معنی', 'نوعی', 'یکی از',
    'کسی است', 'چیزی است', 'وسیله‌ای است', 'شهری است',
    'ماه', 'وعده', 'احساسی', 'یک چیز', 'چیزی', 'نصف', 'به کسی', 'به چیزی', 'به مکانی'
  ];
  
  for (const cue of cues) {
    const idx = s.indexOf(' ' + cue);
    if (idx !== -1 && idx < 35) {
      return s.substring(0, idx).trim();
    }
  }
  
  const estIdx = s.indexOf(' است');
  if (estIdx !== -1 && estIdx < 25) {
    return s.substring(0, estIdx).trim();
  }
  
  return s.split(' ').slice(0, 2).join(' ');
};

interface Props {
  words: EEWWord[];
  onBack: () => void;
  isReviewMode?: boolean;
}

type Step = 'typing' | 'reveal' | 'rating';

export const VocabularyPlayer: React.FC<Props> = ({ words, onBack, isReviewMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<Step>('typing');
  const [typingStats, setTypingStats] = useState<{ accuracy: number; wpm: number } | null>(null);
  const [imageError, setImageError] = useState(false);
  
  const word = words[currentIndex];

  useEffect(() => {
    // Reset state for new word
    setStep('typing');
    setTypingStats(null);
    setImageError(false);

    if (!word) return;

    // Auto-play word pronunciation
    if (VocabularyMediaService.isAudioEnabled()) {
      VocabularyMediaService.playWord(word.audio, word.word);
    } else {
      // First time, might be blocked, we still attempt
      VocabularyMediaService.playWord(word.audio, word.word);
    }
    
    return () => {
      VocabularyMediaService.stop();
    };
  }, [currentIndex, word]);

  const handleTypingComplete = (stats: { accuracy: number; wpm: number; mistakesCount: number; timeSpentSeconds: number }) => {
    setTypingStats({ accuracy: stats.accuracy, wpm: stats.wpm });
    setStep('reveal');
  };

  const handleRate = (rating: Rating) => {
    if (word && typingStats) {
      vocabProgressService.rateWord(word.id, rating, typingStats.accuracy);
    }
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onBack();
    }
  };

  if (!word) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">مرور امروزت کامل شده 🎉</h2>
        <button onClick={onBack} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">بازگشت به لیست کتاب‌ها</button>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 animate-in fade-in duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { VocabularyMediaService.stop(); onBack(); }}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isReviewMode ? 'Back to Dashboard' : 'Back to Book'}</span>
        </button>

        <div className="flex items-center gap-2 font-persian" dir="rtl">
          <button 
            onClick={() => {
              if (currentIndex < words.length - 1) {
                VocabularyMediaService.stop();
                setCurrentIndex(currentIndex + 1);
              }
            }}
            disabled={currentIndex === words.length - 1}
            className="px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            کلمه بعدی
          </button>
          <button 
            onClick={() => {
              if (currentIndex > 0) {
                VocabularyMediaService.stop();
                setCurrentIndex(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            کلمه قبلی
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / words.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex flex-col">
          <div className="aspect-square bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative shadow-lg">
            {word.image && !imageError ? (
              <img 
                key={word.image}
                src={VocabularyMediaService.resolveImage(word.image)} 
                alt={word.word}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("IMAGE LOAD ERROR:", {
                    word: word.word,
                    imagePath: word.image,
                    resolvedImageUrl: VocabularyMediaService.resolveImage(word.image)
                  });
                  setImageError(true);
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <ImageIcon className="w-12 h-12 text-zinc-700" />
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="bg-app-card rounded-2xl border border-cyan-500/10 p-6 shadow-xl relative overflow-hidden h-full flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{word.word}</h2>
                <p className="text-cyan-400 font-mono text-lg">{word.ipa}</p>
              </div>
              <button 
                onClick={() => {
                  VocabularyMediaService.unlockAudio();
                  VocabularyMediaService.playWord(word.audio, word.word);
                }}
                className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
                title="Play Pronunciation"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {word.hint && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3 items-start relative z-10">
                  <div className="text-yellow-500 mt-1">💡</div>
                  <div>
                    <div className="text-xs text-yellow-500/70 uppercase font-bold tracking-wider mb-1">Hint / راهنما</div>
                    <p className="text-yellow-200/90 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: word.hint }} />
                  </div>
                </div>
              )}

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-zinc-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: word.definitionEn }} />
              </div>
              
              <div className="bg-cyan-950/20 border border-cyan-500/10 rounded-xl p-4 relative group">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-cyan-200 text-lg italic leading-relaxed" dangerouslySetInnerHTML={{ __html: word.exampleEn }} />
                  <button 
                    onClick={() => {
                      VocabularyMediaService.unlockAudio();
                      VocabularyMediaService.playExample(word.exampleAudio, word.exampleEn);
                    }}
                    className="p-2 shrink-0 rounded-lg bg-cyan-900/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
                    title="Play Example"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Typing Area */}
            <div className="mt-auto">
              <TypingEngine
                key={word.id}
                targetText={word.word}
                onComplete={handleTypingComplete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meaning & Rating Section */}
      <div className="w-full flex flex-col items-center">
        {step === 'reveal' && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-4">
            <p className="text-zinc-400 mb-4 font-persian" dir="rtl">معنیش یادت میاد؟</p>
            <button
              onClick={() => setStep('rating')}
              className="w-full max-w-md py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg transition-all shadow-lg shadow-cyan-500/20 font-persian"
              dir="rtl"
            >
              نمایش معنی
            </button>
          </div>
        )}

        {step === 'rating' && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Revealed Meaning */}
            <div className="w-full bg-app-card border border-white/10 rounded-2xl p-6 mb-8 text-right font-persian shadow-2xl space-y-6" dir="rtl">
              <div>
                <div className="text-sm text-cyan-500/70 mb-2 font-bold tracking-wide">ترجمه کلمه</div>
                <h3 className="text-3xl font-bold text-white leading-relaxed">{extractWordMeaning(word.meaningFa)}</h3>
              </div>
              
              <div className="w-full h-px bg-white/5" />

              <div>
                <div className="text-sm text-cyan-500/70 mb-2 font-bold tracking-wide">ترجمه تعریف (معنی)</div>
                <h3 className="text-xl font-bold text-cyan-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: word.meaningFa }} />
              </div>
              
              <div className="w-full h-px bg-white/5" />
              
              <div>
                <div className="text-sm text-zinc-500 mb-2 font-bold tracking-wide">ترجمه مثال</div>
                <p className="text-lg text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: word.exampleFa }} />
              </div>
            </div>

            {/* 4-Level Leitner Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto font-persian" dir="rtl">
              <button
                onClick={() => handleRate('unknown')}
                className="py-4 px-2 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-200 transition-colors font-medium text-lg"
              >
                اصلاً بلد نبودم
              </button>
              <button
                onClick={() => handleRate('hard')}
                className="py-4 px-2 rounded-xl bg-orange-950/40 hover:bg-orange-900 border border-orange-500/30 text-orange-200 transition-colors font-medium text-lg"
              >
                سخت بود
              </button>
              <button
                onClick={() => handleRate('medium')}
                className="py-4 px-2 rounded-xl bg-blue-950/40 hover:bg-blue-900 border border-blue-500/30 text-blue-200 transition-colors font-medium text-lg"
              >
                متوسط بود
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="py-4 px-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-200 transition-colors font-medium text-lg"
              >
                خیلی راحت بود
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
