import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, RotateCcw, CheckCircle2 } from 'lucide-react';
import { KeyboardGuide } from './KeyboardGuide';
import { sfxEngine } from '../../utils/audioService';

export interface TypingStats {
  accuracy: number;
  wpm: number;
  mistakesCount: number;
  timeSpentSeconds: number;
}

interface TypingEngineProps {
  targetText: string;
  onComplete: (stats: TypingStats) => void;
  soundEnabled?: boolean;
  showKeyboardGuide?: boolean;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({ 
  targetText, 
  onComplete, 
  soundEnabled = true,
  showKeyboardGuide = true 
}) => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [guideVisible, setGuideVisible] = useState(showKeyboardGuide);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const pressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetTyping = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setTotalKeystrokes(0);
    setMistakesCount(0);
    setIsFinished(false);
    setLastPressedKey(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    resetTyping();
  }, [targetText]);

  useEffect(() => {
    setGuideVisible(showKeyboardGuide);
  }, [showKeyboardGuide]);

  useEffect(() => {
    sfxEngine.isMuted = !soundEnabled;
  }, [soundEnabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default scrolling for Space if needed, handled by input naturally.
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const val = e.target.value;
    const now = Date.now();

    if (!startTime && val.length > 0) {
      setStartTime(now);
    }

    if (val.length > userInput.length) {
      setTotalKeystrokes(prev => prev + 1);
      const lastCharIndex = val.length - 1;
      const expectedChar = targetText[lastCharIndex];
      const typedChar = val[lastCharIndex];

      if (typedChar !== expectedChar) {
        setMistakesCount(prev => prev + 1);
        sfxEngine.play('wrong');
      } else {
        // Trigger subtle physical press animation
        setLastPressedKey(expectedChar);
        if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
        pressTimeoutRef.current = setTimeout(() => setLastPressedKey(null), 100);

        if (expectedChar === ' ') {
          sfxEngine.play('mech-5');
        } else if (['\n', '\r'].includes(expectedChar)) {
          sfxEngine.play('mech-5');
        } else {
          const lower = expectedChar.toLowerCase();
          if ('qwertwertasdfg'.includes(lower)) {
            sfxEngine.play('mech-1');
          } else if ('yuiophjkl'.includes(lower)) {
            sfxEngine.play('mech-2');
          } else if ('zxcvbnm'.includes(lower)) {
            sfxEngine.play('mech-3');
          } else if ('1234567890'.includes(lower)) {
            sfxEngine.play('mech-4');
          } else {
            sfxEngine.play('mech-4');
          }
        }
      }
    } else if (val.length < userInput.length) {
      // Backspace used
      sfxEngine.play('mech-5');
    }

    if (val.length <= targetText.length) {
      setUserInput(val);

      if (val === targetText) {
        setIsFinished(true);
        const finalEndTime = now;
        setEndTime(finalEndTime);

        const durationSeconds = Math.max(1, Math.round((finalEndTime - (startTime || now)) / 1000));
        const words = targetText.length / 5;
        const minutes = durationSeconds / 60;
        const wpm = Math.round(words / minutes);
        const accuracy = totalKeystrokes > 0 ? Math.max(0, Math.round(((totalKeystrokes - mistakesCount) / totalKeystrokes) * 100)) : 100;

        setTimeout(() => {
          onComplete({
            accuracy,
            wpm,
            mistakesCount,
            timeSpentSeconds: durationSeconds,
          });
        }, 150);
      }
    }
  };

  const currentChars = userInput.length;
  const targetChars = targetText.length;
  const progressPercent = Math.round((currentChars / targetChars) * 100);

  const calculateLiveAccuracy = (): number => {
    if (totalKeystrokes === 0) return 100;
    const errors = mistakesCount;
    const acc = Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100);
    return Math.max(0, Math.min(100, acc));
  };

  const calculateLiveWpm = (): number => {
    if (!startTime || userInput.length === 0) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    if (elapsedMinutes <= 0) return 0;
    return Math.round((userInput.length / 5) / elapsedMinutes);
  };

  return (
    <div 
      className="w-full flex flex-col items-center select-none"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className="opacity-0 absolute pointer-events-none -top-9999px"
        disabled={isFinished}
      />

      <div className="w-full max-w-3xl flex items-center justify-between text-xs text-zinc-400 mb-6 px-3 py-2 rounded-xl bg-zinc-900/50 border border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-purple-400" />
            <span>Accuracy:</span>
            <span className="font-mono font-semibold text-zinc-200">{calculateLiveAccuracy()}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Speed:</span>
            <span className="font-mono font-semibold text-zinc-200">{calculateLiveWpm()} WPM</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
            <input 
              type="checkbox" 
              checked={guideVisible} 
              onChange={() => setGuideVisible(!guideVisible)} 
              className="rounded border-white/10 bg-black/50 text-purple-500 focus:ring-purple-500/50"
            />
            Show Keyboard
          </label>
          <span className="font-mono text-zinc-300 ml-2">
            {currentChars} / {targetChars}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetTyping();
            }}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset typing"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-150 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="w-full max-w-3xl min-h-[140px] p-6 sm:p-8 bg-app-card border border-white/10 rounded-2xl flex flex-wrap items-center content-center shadow-lg relative cursor-text text-xl sm:text-2xl font-mono leading-relaxed tracking-wide mb-8">
        {targetText.split('').map((char, index) => {
          const isTyped = index < userInput.length;
          const typedChar = isTyped ? userInput[index] : null;
          const isCurrent = index === userInput.length;
          const isCorrect = isTyped && typedChar === char;
          const isIncorrect = isTyped && typedChar !== char;

          let colorClass = 'text-zinc-600'; 

          if (isCorrect) {
            colorClass = 'text-purple-300 font-medium';
          } else if (isIncorrect) {
            colorClass = 'text-red-400 bg-red-950/60 rounded px-0.5 underline decoration-red-500'; 
          }

          return (
            <span
              key={index}
              className={`relative inline-block transition-colors duration-75 ${colorClass}`}
            >
              {isCurrent && (
                <span className="absolute -left-0.5 top-1 bottom-1 w-[2.5px] bg-purple-400 animate-caret rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              )}
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}

        {userInput.length === targetText.length && !isFinished && (
          <span className="inline-block w-[2.5px] h-6 bg-purple-400 animate-caret ml-0.5 rounded-full" />
        )}
      </div>

      {guideVisible && !isFinished && (
        <KeyboardGuide activeChar={targetText[userInput.length]} lastPressedKey={lastPressedKey} />
      )}

      <p className="text-xs text-zinc-500 mt-4 flex items-center gap-1.5">
        {isFinished ? (
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Completed! Saving progress...
          </span>
        ) : (
          <span>Type on your keyboard to practice. Mistakes are highlighted in red.</span>
        )}
      </p>
    </div>
  );
};
