import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { CEFRLevel } from '../../types';
import { placementQuestions } from '../../data/placementData';

interface PlacementModalProps {
  currentLevel: CEFRLevel;
  isOpen: boolean;
  onClose: () => void;
  onSetLevel: (level: CEFRLevel) => void;
}

export const PlacementModal: React.FC<PlacementModalProps> = ({
  currentLevel,
  isOpen,
  onClose,
  onSetLevel,
}) => {
  const [step, setStep] = useState<'select' | 'test' | 'result'>('select');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [evaluatedLevel, setEvaluatedLevel] = useState<CEFRLevel>('A1');

  if (!isOpen) return null;

  const handleSelectDirectLevel = (lvl: CEFRLevel) => {
    onSetLevel(lvl);
    onClose();
  };

  const handleStartTest = () => {
    setStep('test');
    setCurrentQIndex(0);
    setSelectedAnswers([]);
  };

  const handleSelectOption = (optIndex: number) => {
    const updated = [...selectedAnswers, optIndex];
    setSelectedAnswers(updated);

    if (currentQIndex < placementQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Evaluate test
      let correctCount = 0;
      placementQuestions.forEach((q, idx) => {
        if (updated[idx] === q.correctIndex) {
          correctCount++;
        }
      });

      let calculatedLevel: CEFRLevel = 'A1';
      if (correctCount >= 5) calculatedLevel = 'B2';
      else if (correctCount >= 4) calculatedLevel = 'B1';
      else if (correctCount >= 2) calculatedLevel = 'A2';
      else calculatedLevel = 'A1';

      setEvaluatedLevel(calculatedLevel);
      setStep('result');
    }
  };

  const currentQ = placementQuestions[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-app-card border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* State 1: Select Level or Take Test */}
        {step === 'select' && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-purple-400 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
                Level Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-3">What is your English level?</h2>
              <p className="text-sm text-zinc-400 mt-1 font-persian" dir="rtl">
                سطح تقریبی زبان انگلیسی خود را انتخاب کنید یا در آزمون تعیین سطح کوتاه شرکت نمایید.
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {[
                { id: 'A1' as CEFRLevel, title: 'Beginner (A1)', fa: 'مبتدی - جملات و کلمات پایه' },
                { id: 'A2' as CEFRLevel, title: 'Elementary (A2)', fa: 'مقدماتی - گذشته و مکالمات ساده' },
                { id: 'B1' as CEFRLevel, title: 'Intermediate (B1)', fa: 'متوسط - ارتباط روان در اکثر موضوعات' },
                { id: 'B2' as CEFRLevel, title: 'Upper Intermediate (B2)', fa: 'بالاتر از متوسط - درک متون پیچیده' },
                { id: 'C1' as CEFRLevel, title: 'Advanced (C1)', fa: 'پیشرفته - تسلط آکادمیک و حرفه‌ای' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => handleSelectDirectLevel(lvl.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    currentLevel === lvl.id
                      ? 'bg-purple-950/40 border-purple-500 text-purple-200'
                      : 'bg-zinc-900/60 border-white/5 text-zinc-300 hover:border-purple-500/30 hover:bg-zinc-850'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{lvl.title}</span>
                    <span className="text-xs text-zinc-500 font-persian" dir="rtl">{lvl.fa}</span>
                  </div>
                  {currentLevel === lvl.id && (
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartTest}
              className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>I don't know (Take Quick Placement Test)</span>
            </button>
          </div>
        )}

        {/* State 2: Taking Placement Test */}
        {step === 'test' && currentQ && (
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
              <span className="uppercase font-semibold tracking-wider text-purple-400">
                Question {currentQIndex + 1} of {placementQuestions.length}
              </span>
              <span className="capitalize">{currentQ.type}</span>
            </div>

            {currentQ.readingPassage && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 leading-relaxed mb-4">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Passage</span>
                {currentQ.readingPassage}
              </div>
            )}

            <h3 className="text-lg font-bold text-white mb-6 font-mono leading-relaxed">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-purple-500/40 hover:bg-zinc-800 text-zinc-200 text-sm font-mono text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>{opt}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* State 3: Placement Test Results */}
        {step === 'result' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-3xl mx-auto mb-4">
              🎯
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">Placement Test Complete!</h2>
            <p className="text-sm text-zinc-400 mb-6 font-persian" dir="rtl">
              بر اساس نتایج آزمون، سطح پیشنهادی شما تعیین شد.
            </p>

            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 mb-8">
              <span className="text-xs uppercase font-bold text-purple-400 tracking-wider block mb-1">
                Your Estimated English Level
              </span>
              <span className="text-4xl font-extrabold text-white font-mono block mb-1">
                {evaluatedLevel}
              </span>
              <span className="text-sm font-semibold text-purple-300 font-persian" dir="rtl">
                {evaluatedLevel === 'A1' ? 'مبتدی (Beginner)' : evaluatedLevel === 'A2' ? 'مقدماتی (Elementary)' : evaluatedLevel === 'B1' ? 'متوسط (Intermediate)' : 'پیشرفته (Advanced)'}
              </span>
            </div>

            <button
              onClick={() => handleSelectDirectLevel(evaluatedLevel)}
              className="w-full py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition-all shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Learning at {evaluatedLevel}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
