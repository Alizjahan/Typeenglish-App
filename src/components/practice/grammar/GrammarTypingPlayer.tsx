import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, Play, CheckCircle2, ChevronRight, RefreshCcw, XCircle } from 'lucide-react';
import { GrammarTopicSession, GrammarExercise } from '../../../types/grammar';
import { TypingEngine } from '../../typing/TypingEngine';
import { grammarProgressService } from '../../../services/grammarProgressService';

interface GrammarTypingPlayerProps {
  topic: GrammarTopicSession;
  onBack: () => void;
}

type Step = 'choice' | 'typing' | 'analysis' | 'complete';

export const GrammarTypingPlayer: React.FC<GrammarTypingPlayerProps> = ({ topic, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<Step>('choice');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load progress on mount
  useEffect(() => {
    const p = grammarProgressService.getTopicProgress(topic.topicId);
    if (p.currentExerciseIndex < topic.exercises.length) {
      setCurrentIndex(p.currentExerciseIndex);
    } else if (p.status === 'completed') {
      setStep('complete');
    }
  }, [topic.topicId]);

  const currentExercise = topic.exercises[currentIndex];

  const playAudio = () => {
    if (!currentExercise) return;
    
    if (currentExercise.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(currentExercise.audioUrl);
      } else {
        audioRef.current.src = currentExercise.audioUrl;
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Audio file failed, falling back to TTS:', e);
          fallbackTTS();
        });
      }
    } else {
      fallbackTTS();
    }
  };

  const fallbackTTS = () => {
    const utterance = new SpeechSynthesisUtterance(currentExercise.fullSentence);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleOptionSelect = (option: string) => {
    if (step !== 'choice') return;
    setSelectedOption(option);
    
    if (option === currentExercise.correctOption) {
      setIsWrong(false);
      setStep('typing');
    } else {
      setIsWrong(true);
      // Record mistake
      const p = grammarProgressService.getTopicProgress(topic.topicId);
      const errCount = p.wrongOptionsSelected[currentExercise.id] || 0;
      grammarProgressService.saveProgress(topic.topicId, {
        wrongOptionsSelected: { ...p.wrongOptionsSelected, [currentExercise.id]: errCount + 1 }
      });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const handleTypingComplete = () => {
    setStep('analysis');
    playAudio();
    
    // Save progress
    const p = grammarProgressService.getTopicProgress(topic.topicId);
    const completed = new Set(p.completedExerciseIds);
    completed.add(currentExercise.id);
    
    const isTopicComplete = currentIndex === topic.exercises.length - 1;
    
    grammarProgressService.saveProgress(topic.topicId, {
      completedExerciseIds: Array.from(completed),
      currentExerciseIndex: isTopicComplete ? currentIndex : currentIndex + 1,
      status: isTopicComplete ? 'completed' : 'in_progress'
    });
  };

  const navigateToExercise = (newIndex: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    window.speechSynthesis.cancel();
    setCurrentIndex(newIndex);
    const p = grammarProgressService.getTopicProgress(topic.topicId);
    const nextEx = topic.exercises[newIndex];
    if (p.completedExerciseIds.includes(nextEx.id)) {
      setStep('analysis');
      setSelectedOption(nextEx.correctOption); // Preserve choice
    } else {
      setStep('choice');
      setSelectedOption(null);
    }
    setIsWrong(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < topic.exercises.length - 1) {
      navigateToExercise(currentIndex + 1);
    } else {
      setStep('complete');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateToExercise(currentIndex - 1);
    }
  };

  if (step === 'complete') {
    const p = grammarProgressService.getTopicProgress(topic.topicId);
    const mistakes = Object.values(p.wrongOptionsSelected).reduce((a, b) => a + b, 0);
    
    return (
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 animate-in fade-in duration-300 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Topic Complete!</h2>
        <p className="text-zinc-400 mb-8">{topic.titleEn}</p>
        
        <div className="bg-app-card rounded-2xl border border-white/5 p-6 mb-8 flex justify-around">
          <div>
            <div className="text-2xl font-mono text-white">{topic.exercises.length}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">Exercises</div>
          </div>
          <div>
            <div className="text-2xl font-mono text-orange-400">{mistakes}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">Mistakes</div>
          </div>
        </div>
        
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
        >
          Back to Grammar Roadmap
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 animate-in fade-in duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="text-xs font-mono text-purple-400 bg-purple-950/30 px-3 py-1 rounded-full border border-purple-500/20">
          Exercise {currentIndex + 1} of {topic.exercises.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / topic.exercises.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center w-full max-w-3xl mx-auto">
        
        {step === 'choice' && (
          <div className="w-full animate-in slide-in-from-bottom-4 duration-300 space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-2">Choose the correct grammar</h3>
            </div>
            
            <div className="bg-app-card rounded-2xl border border-white/5 p-8 text-center shadow-lg">
              <p className="text-3xl font-medium text-white leading-relaxed">
                {currentExercise.blankSentence.split('___').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="inline-block w-24 border-b-2 border-purple-500/50 mx-2" />
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentExercise.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                let btnClass = "p-4 rounded-xl border text-lg font-medium transition-all duration-200 ";
                
                if (isSelected && isWrong) {
                  btnClass += "bg-red-950/40 border-red-500/50 text-red-400 animate-shake";
                } else if (isSelected && !isWrong) {
                  btnClass += "bg-emerald-950/40 border-emerald-500/50 text-emerald-400";
                } else {
                  btnClass += "bg-zinc-900/60 border-white/5 text-zinc-300 hover:bg-purple-950/20 hover:border-purple-500/30 hover:text-white";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={selectedOption !== null}
                    className={btnClass}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-start pt-4 w-full">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            </div>
          </div>
        )}

        {step === 'typing' && (
          <div className="w-full animate-in zoom-in-95 duration-300">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-4 bg-emerald-950/30 px-4 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-semibold">Correct choice! Now type it.</span>
              </div>
            </div>
            <div className="bg-app-card rounded-2xl border border-white/5 p-8 shadow-2xl relative overflow-hidden">
              <TypingEngine
                targetText={currentExercise.fullSentence}
                onComplete={handleTypingComplete}
              />
            </div>
          </div>
        )}

        {step === 'analysis' && (
          <div className="w-full animate-in slide-in-from-bottom-4 duration-500 space-y-6 pb-20">
            
            {/* Translation Box */}
            <div className="bg-app-card border border-white/5 rounded-2xl p-6 text-center relative">
              <div className="absolute top-4 right-4">
                <button onClick={playAudio} className="p-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
              <p className="text-2xl font-medium text-white mb-4 pr-12 pl-12">{currentExercise.fullSentence}</p>
              <div className="w-16 h-px bg-white/10 mx-auto mb-4" />
              <p className="text-xl text-purple-300 font-persian" dir="rtl">{currentExercise.translationFa}</p>
            </div>

            {/* Grammar Structure Analysis */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider text-center mb-4">Sentence Structure</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {currentExercise.chunks.map((chunk, i) => {
                  // highlight if this chunk contains the tested element
                  const isTested = chunk.text.includes(currentExercise.testedElement);
                  return (
                    <div key={i} className={`flex flex-col items-center bg-zinc-900/50 border rounded-xl overflow-hidden shadow-lg min-w-[120px] transition-colors ${isTested ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-white/10'}`}>
                      <div className={`w-full p-2 text-center border-b ${isTested ? 'bg-purple-900/40 border-purple-500/30' : 'bg-zinc-800/80 border-white/5'}`}>
                        <span className={`text-xs font-semibold ${isTested ? 'text-purple-300' : 'text-zinc-400'}`}>{chunk.function}</span>
                      </div>
                      <div className="p-3 text-center w-full">
                        <span className={`block text-lg font-bold mb-1 ${isTested ? 'text-white' : 'text-zinc-300'}`}>{chunk.text}</span>
                        <div className="flex justify-center gap-2 flex-wrap mt-2">
                          {chunk.words.map((w, wi) => (
                            <div key={wi} className="text-[10px] flex flex-col items-center">
                              <span className="text-zinc-500 font-mono mb-0.5">{w.ipa}</span>
                              <span className="text-emerald-400/70 uppercase tracking-widest">{w.pos}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grammar Note */}
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-5 mt-6">
              <h5 className="text-blue-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="bg-blue-500/20 px-2 py-0.5 rounded text-xs font-mono">Note</span>
                {currentExercise.grammarNoteEn}
              </h5>
              <p className="text-sm text-blue-300/90 font-persian leading-relaxed" dir="rtl">
                {currentExercise.grammarNoteFa}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 w-full">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              <button
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-colors animate-bounce"
              >
                {currentIndex === topic.exercises.length - 1 ? 'Finish Topic' : 'Next Exercise'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
