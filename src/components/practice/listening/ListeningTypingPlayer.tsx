import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, Volume2, Turtle, AlertCircle, FastForward } from 'lucide-react';
import { ListeningTopic, ListeningExercise } from '../../../types/listening';
import { listeningProgressService, ListeningExerciseStatus, ListeningExerciseProgress } from '../../../services/listeningProgressService';
import { evaluateAnswer } from '../../../services/listeningScoring';

interface Props {
  topic: ListeningTopic;
  onClose: () => void;
}

let sessionAudioUnlocked = false;

export function ListeningTypingPlayer({ topic, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState<'typing' | 'incorrect' | 'retyping' | 'correct' | 'accepted' | 'skipped' | 'complete'>('typing');
  const [replayCount, setReplayCount] = useState(0);
  const [needsUnlock, setNeedsUnlock] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const totalExercises = topic.exercises.length;

  useEffect(() => {
    const p = listeningProgressService.getTopicProgress(topic.topicId);
    let startIdx = p.currentIndex;
    if (startIdx >= totalExercises) startIdx = totalExercises - 1;
    if (startIdx < 0) startIdx = 0;
    
    setCurrentIndex(startIdx);
    restoreStateForIndex(startIdx);
  }, [topic.topicId, totalExercises]);

  const restoreStateForIndex = (index: number) => {
    const p = listeningProgressService.getTopicProgress(topic.topicId);
    const ex = topic.exercises[index];
    if (!ex) return;
    
    const record = p.exercises[ex.id];
    if (record && record.status !== 'pending') {
      setInputText(record.submittedText || '');
      setStep(record.status as any);
      setReplayCount(record.replayCount || 0);
    } else {
      setInputText('');
      setStep('typing');
      setReplayCount(0);
    }
  };

  const currentExercise = topic.exercises[currentIndex];

  const stopAllAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    return stopAllAudio;
  }, [stopAllAudio]);

  const playAudio = useCallback((slow: boolean = false, isAuto: boolean = false) => {
    if (!currentExercise) return;
    
    if (!isAuto && (step === 'typing' || step === 'retyping')) {
      setReplayCount(r => r + 1);
    }
    
    stopAllAudio();

    const url = currentExercise.audioUrl;
    const audio = new Audio(url);
    
    let rate = 1.0;
    if (slow) {
      if (currentExercise.level === 'A1') rate = 0.75;
      else if (currentExercise.level === 'A2') rate = 0.8;
      else rate = 0.85;
    }
    audio.playbackRate = rate; 
    
    audioRef.current = audio;
    
    audio.play().then(() => {
      sessionAudioUnlocked = true;
      setNeedsUnlock(false);
    }).catch(e => {
      if (e.name === 'NotAllowedError') {
        setNeedsUnlock(true);
      } else if (e.name === 'AbortError') {
        // Aborted by React StrictMode double mount or quick navigation.
      } else {
        console.warn("Static audio failed:", e);
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(currentExercise.text);
        u.rate = slow ? 0.6 : 0.9;
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('David') || v.name.includes('Male') || v.name.includes('Guy')));
        if (maleVoice) u.voice = maleVoice;
        else {
          const anyEn = voices.find(v => v.lang.startsWith('en'));
          if (anyEn) u.voice = anyEn;
        }
        window.speechSynthesis.speak(u);
      }
    });
  }, [currentExercise, stopAllAudio, step]);

  useEffect(() => {
    if (currentExercise) {
      playAudio(false, true);
    }
  }, [currentIndex]);

  const handleUnlock = () => {
    sessionAudioUnlocked = true;
    setNeedsUnlock(false);
    playAudio(false, false);
    if (inputRef.current) inputRef.current.focus();
  };

  const saveProgress = (status: ListeningExerciseStatus, accuracy: number, submitted: string) => {
    if (!currentExercise) return;
    const p = listeningProgressService.getTopicProgress(topic.topicId);
    
    if (status === 'perfect' || status === 'accepted' || status === 'skipped') {
      if (!p.completedExerciseIds.includes(currentExercise.id)) {
        p.completedExerciseIds.push(currentExercise.id);
      }
    }

    const existing = p.exercises[currentExercise.id];
    const isCorrectFirstTry = existing ? existing.isCorrectFirstTry : (status === 'perfect' || status === 'accepted');

    p.exercises[currentExercise.id] = {
      exerciseId: currentExercise.id,
      status,
      submittedText: submitted,
      isCorrectFirstTry,
      replayCount,
      wordAccuracy: accuracy,
      completedAt: new Date().toISOString()
    };
    
    if (status === 'perfect' || status === 'accepted' || status === 'skipped') {
       if (currentIndex === p.currentIndex) {
           p.currentIndex = currentIndex + 1;
       }
    }
    
    listeningProgressService.saveTopicProgress(p);
  };

  const handleCheck = () => {
    if (!inputText.trim()) return;
    const res = evaluateAnswer(currentExercise.text, inputText);
    
    if (res.status === 'perfect') {
      if (step === 'typing' || step === 'retyping') saveProgress('perfect', res.accuracy, inputText);
      setStep('correct');
    } else if (res.status === 'accepted') {
      if (step === 'typing' || step === 'retyping') saveProgress('accepted', res.accuracy, inputText);
      setStep('accepted');
    } else {
      if (step === 'typing' || step === 'retyping') saveProgress('incorrect', res.accuracy, inputText);
      setStep('incorrect');
    }
  };

  const handleSkip = () => {
    saveProgress('skipped', 0, inputText);
    setStep('skipped');
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalExercises) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      restoreStateForIndex(nextIdx);
    } else {
      setStep('complete');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      restoreStateForIndex(prevIdx);
    }
  };

  const handleExit = () => {
    stopAllAudio();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (step !== 'typing' && step !== 'retyping') {
           handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, step]);

  if (step === 'complete') {
    return (
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 animate-in fade-in duration-300 text-center flex flex-col items-center justify-center h-full">
        <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Section Complete!</h2>
        <p className="text-zinc-400 mb-8">{topic.titleEn}</p>
        <button onClick={handleExit} className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl text-lg shadow-lg">
          Return to Lab
        </button>
      </div>
    );
  }

  if (!currentExercise) return null;

  const p = listeningProgressService.getTopicProgress(topic.topicId);
  const completed = p.completedExerciseIds.length;
  const progressPercent = Math.round((completed / totalExercises) * 100) || 0;
  
  const isReadOnly = step === 'correct' || step === 'accepted' || step === 'skipped' || step === 'incorrect';
  const textareaClass = 'w-full bg-zinc-900/50 border rounded-xl p-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors ' + (step === 'incorrect' ? 'border-red-500/50 text-red-100' : 'border-zinc-700');

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 animate-in fade-in duration-300 flex flex-col h-full">
      
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={handleExit} className="text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/50 hover:bg-zinc-800 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          
          {needsUnlock && (
            <button onClick={handleUnlock} className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium animate-pulse">
              Enable Audio
            </button>
          )}

          <div className="text-right">
            <h2 className="text-lg font-bold text-white">{topic.titleEn}</h2>
          </div>
        </div>

        <div className="bg-app-card rounded-2xl p-4 border border-white/5 flex items-center gap-4 shadow-sm">
          <div className="text-sm font-medium text-zinc-300 whitespace-nowrap">
            Exercise {currentIndex + 1} of {totalExercises}
          </div>
          <div className="flex-1 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: progressPercent + '%' }} />
          </div>
          <div className="text-sm font-bold text-indigo-400 whitespace-nowrap w-12 text-right">
            {progressPercent}%
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 space-y-6 flex flex-col">
        
        <div className="bg-app-card rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center space-y-6 shadow-lg shrink-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => playAudio(false)} 
              className="w-20 h-20 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20"
            >
              <Volume2 className="w-10 h-10" />
            </button>
            <button 
              onClick={() => playAudio(true)} 
              className="w-14 h-14 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors hover:text-white"
              title="Slow Replay"
            >
              <Turtle className="w-7 h-7" />
            </button>
          </div>
        </div>

        <div className="bg-app-card rounded-2xl border border-white/5 p-6 shadow-lg flex-1 flex flex-col min-h-[300px]">
          <div className="space-y-4 flex flex-col flex-1">
            <label className="text-sm font-medium flex items-center justify-between">
              <span className={step === 'retyping' ? "text-orange-400" : "text-zinc-300"}>
                {step === 'retyping' ? 'Type the correct sentence once more:' : 'Type what you hear:'}
              </span>
              {(step === 'typing' || step === 'retyping') && (
                <button onClick={handleSkip} className="text-zinc-500 hover:text-zinc-300 text-xs px-2 py-1">Skip</button>
              )}
            </label>
            
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Start typing..."
              disabled={isReadOnly}
              className={textareaClass}
              rows={3}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
                  e.preventDefault();
                  if (step === 'typing' || step === 'retyping') handleCheck();
                }
              }}
            />
            
            {(step === 'typing' || step === 'retyping') && (
              <button 
                onClick={handleCheck}
                disabled={!inputText.trim()}
                className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 mt-auto shrink-0"
              >
                Check Answer
              </button>
            )}

            {step === 'incorrect' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300 mt-auto shrink-0">
                <div className="flex items-start gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium mb-1">Needs correction</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium mb-1">Correct answer:</div>
                    <div className="text-lg font-medium">{currentExercise.text}</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setInputText('');
                    setStep('retyping');
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                  className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors border border-zinc-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {step === 'accepted' && (
               <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300 mt-auto shrink-0">
                 <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex flex-col gap-2 shadow-sm">
                   <div className="flex items-center gap-3 text-yellow-500 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Almost perfect — accepted. / تقریباً درست بود — قبول شد.</span>
                   </div>
                   <div className="text-sm text-zinc-300 mt-2">
                      <div className="opacity-70 text-xs">Target:</div>
                      <div className="text-base font-medium">{currentExercise.text}</div>
                   </div>
                 </div>
               </div>
            )}

            {step === 'correct' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300 mt-auto shrink-0">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 text-emerald-400 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold text-lg">Perfect!</span>
                </div>
              </div>
            )}
            
            {step === 'skipped' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300 mt-auto shrink-0">
                <div className="bg-zinc-500/10 border border-zinc-500/20 p-4 rounded-xl flex items-center gap-3 text-zinc-400 shadow-sm">
                  <span className="font-bold text-lg">Skipped</span>
                </div>
                <div className="flex items-start gap-3 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium mb-1">Correct answer:</div>
                    <div className="text-lg font-medium">{currentExercise.text}</div>
                  </div>
                </div>
              </div>
            )}
            
            {(step === 'correct' || step === 'accepted' || step === 'incorrect' || step === 'skipped') && (
               <div className="mt-4 bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50 animate-in fade-in shrink-0">
                 <div className="text-zinc-400 text-sm mb-2 font-medium">Persian Translation</div>
                 <div className="text-white text-right font-medium text-lg" dir="rtl">{currentExercise.translationFa}</div>
               </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10 mt-auto">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        
        <button 
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          disabled={step === 'typing' || step === 'retyping'}
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
