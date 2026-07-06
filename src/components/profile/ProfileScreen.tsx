import React, { useState, useRef, useMemo } from 'react';
import { User, UserProgress } from '../../types';
import { storageService } from '../../services/storageService';
import { vocabProgressService } from '../../services/vocabProgressService';
import { grammarProgressService } from '../../services/grammarProgressService';
import { listeningProgressService } from '../../services/listeningProgressService';
import { speedTypingProgressService } from '../../services/speedTypingProgressService';
import { UserCircle2, Download, Upload, RotateCcw, Clock, Flame, Target, Book, AlignLeft, Headphones, Keyboard, Plus, Minus } from 'lucide-react';

interface ProfileScreenProps {
  user: User;
  progress: UserProgress;
  onUpdateUser: (partial: Partial<User>) => void;
  onOpenPlacementTest: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string>('');

  const vocabData = useMemo(() => {
    const all = vocabProgressService.getAllProgress();
    let studied = 0, mastered = 0, due = 0;
    const now = Date.now();
    for (const p of Object.values(all)) {
      if (p.box > 0) studied++;
      if (p.box >= 6) mastered++;
      if (p.box > 0 && p.nextReviewAt <= now) due++;
    }
    return { studied, mastered, due };
  }, []);

  const grammarData = useMemo(() => {
    const all = grammarProgressService.getAllProgress();
    let completed = 0;
    for (const p of Object.values(all)) {
      if (p.completedExerciseIds.length > 0) completed++;
    }
    return { completed };
  }, []);

  const listeningData = useMemo(() => {
    const all = listeningProgressService.getProgress();
    let completed = 0, sumAcc = 0, totalAcc = 0;
    for (const t of Object.values(all)) {
      completed += t.completedExerciseIds.length;
      for (const e of Object.values(t.exercises)) {
        sumAcc += e.wordAccuracy;
        totalAcc++;
      }
    }
    return { completed, avgAcc: totalAcc ? Math.round(sumAcc / totalAcc) : 0 };
  }, []);

  const speedTypingData = useMemo(() => {
    const all = speedTypingProgressService.getAllProgress();
    let completed = 0, bestWpm = 0, stars = 0;
    for (const r of Object.values(all)) {
      if (r.completed) completed++;
      if (r.bestWPM > bestWpm) bestWpm = r.bestWPM;
      stars += r.bestStars;
    }
    return { completed, bestWpm, stars };
  }, []);

  const handleExportData = () => {
    const jsonStr = storageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english_app_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = storageService.importAllData(content);
        if (success) {
          setImportMessage('پشتیبان با موفقیت بازیابی شد! در حال بارگذاری مجدد...');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setImportMessage('خطا: فرمت فایل پشتیبان نامعتبر است.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('آیا مطمئن هستید؟ تمام پیشرفت شما پاک خواهد شد.')) {
      storageService.resetProgress();
      window.location.reload();
    }
  };

  const updateGoal = (delta: number) => {
    const newGoal = Math.max(10, Math.min(60, user.dailyGoalMinutes + delta));
    onUpdateUser({ dailyGoalMinutes: newGoal });
  };

  const goalPercent = Math.min(100, Math.round((user.dailyMinutesSpent / user.dailyGoalMinutes) * 100));

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 flex flex-col animate-in fade-in duration-300 pb-24">
      <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-zinc-400 font-persian" dir="rtl">داشبورد کاربری</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-3xl bg-linear-to-br from-app-card to-indigo-950/20 border border-white/10 flex items-center gap-4 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="w-16 h-16 rounded-full bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg relative z-10">
            <UserCircle2 className="w-8 h-8" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {user.level}
              </span>
              <span className="text-xs text-zinc-400 font-persian" dir="rtl">سطح فعلی کاربر</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-app-card border border-white/5 flex flex-col gap-4 justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Today's Study Goal</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateGoal(-5)} className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-mono font-bold w-12 text-center text-lg">{user.dailyGoalMinutes}m</span>
              <button onClick={() => updateGoal(5)} className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-white font-mono">
                {user.dailyMinutesSpent} <span className="text-sm font-normal text-zinc-500">mins studied</span>
              </span>
              <span className="text-sm font-bold text-indigo-400">{goalPercent}%</span>
            </div>
            <div className="w-full h-3 bg-zinc-800/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-app-card border border-white/5 flex flex-col">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Current Streak</span>
          </div>
          <div><span className="text-3xl font-bold text-white font-mono">{user.streak}</span><span className="text-sm text-zinc-500 ml-1.5">days</span></div>
        </div>
        <div className="p-5 rounded-2xl bg-app-card border border-white/5 flex flex-col">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Total XP</span>
          </div>
          <div><span className="text-3xl font-bold text-white font-mono">{user.xp}</span><span className="text-sm text-zinc-500 ml-1.5">XP</span></div>
        </div>
        <div className="p-5 rounded-2xl bg-app-card border border-white/5 flex flex-col">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Study Time</span>
          </div>
          <div><span className="text-3xl font-bold text-white font-mono">{user.dailyMinutesSpent}</span><span className="text-sm text-zinc-500 ml-1.5">mins</span></div>
        </div>
        <div className="p-5 rounded-2xl bg-app-card border border-white/5 flex flex-col">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span>Avg Accuracy</span>
          </div>
          <div><span className="text-3xl font-bold text-white font-mono">{listeningData.avgAcc > 0 ? listeningData.avgAcc : 0}</span><span className="text-sm text-zinc-500 ml-1.5">%</span></div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-6">Your Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-5 rounded-2xl bg-app-card border-t-[3px] border-cyan-500 border-l border-r border-b border-white/5 shadow-[0_0_20px_rgba(6,182,212,0.05)]">
          <div className="flex items-center gap-2 text-cyan-400 mb-4">
            <Book className="w-5 h-5" />
            <span className="font-bold">Vocabulary</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="block text-2xl font-bold font-mono text-white">{vocabData.studied}</span><span className="text-xs text-zinc-500 uppercase font-semibold">Studied</span></div>
            <div><span className="block text-2xl font-bold font-mono text-cyan-400">{vocabData.mastered}</span><span className="text-xs text-zinc-500 uppercase font-semibold">Mastered</span></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-app-card border-t-[3px] border-purple-500 border-l border-r border-b border-white/5 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
          <div className="flex items-center gap-2 text-purple-400 mb-4">
            <AlignLeft className="w-5 h-5" />
            <span className="font-bold">Grammar</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="block text-2xl font-bold font-mono text-white">{grammarData.completed}</span><span className="text-xs text-zinc-500 uppercase font-semibold">Topics</span></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-app-card border-t-[3px] border-pink-500 border-l border-r border-b border-white/5 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
          <div className="flex items-center gap-2 text-pink-400 mb-4">
            <Headphones className="w-5 h-5" />
            <span className="font-bold">Listening</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="block text-2xl font-bold font-mono text-white">{listeningData.completed}</span><span className="text-xs text-zinc-500 uppercase font-semibold">Completed</span></div>
            <div><span className="block text-2xl font-bold font-mono text-pink-400">{listeningData.avgAcc}%</span><span className="text-xs text-zinc-500 uppercase font-semibold">Avg Acc</span></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-app-card border-t-[3px] border-orange-500 border-l border-r border-b border-white/5 shadow-[0_0_20px_rgba(249,115,22,0.05)]">
          <div className="flex items-center gap-2 text-orange-400 mb-4">
            <Keyboard className="w-5 h-5" />
            <span className="font-bold">Speed Typing</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="block text-2xl font-bold font-mono text-white">{speedTypingData.completed}</span><span className="text-xs text-zinc-500 uppercase font-semibold">Lessons</span></div>
            <div><span className="block text-2xl font-bold font-mono text-orange-400">{speedTypingData.bestWpm}</span><span className="text-xs text-zinc-500 uppercase font-semibold">Best WPM</span></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-app-card border border-white/10">
          <h2 className="text-lg font-bold text-white mb-2">App Theme</h2>
          <p className="text-sm text-zinc-400 mb-5 font-persian" dir="rtl">شخصی‌سازی ظاهر برنامه را از اینجا انجام دهید</p>
          <div className="flex flex-wrap gap-3">
            {(['default', 'ocean', 'nature', 'sunset', 'light'] as const).map((themeName) => {
              const isSelected = (user.settings.appTheme || 'default') === themeName;
              return (
                <button
                  key={themeName}
                  onClick={() => onUpdateUser({ settings: { ...user.settings, appTheme: themeName } })}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors flex items-center capitalize cursor-pointer ${
                    isSelected ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {themeName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-app-card border border-white/10">
          <h2 className="text-lg font-bold text-white mb-2">Local Data & Backup (Offline)</h2>
          <p className="text-sm text-zinc-400 mb-5 font-persian leading-relaxed" dir="rtl">
            تمام داده‌های شما در این مرورگر ذخیره می‌شوند و به هیچ سروری منتقل نمی‌شوند. می‌توانید پشتیبان بگیرید و در دستگاهی دیگر بازیابی کنید.
          </p>

          {importMessage && <p className="text-sm font-semibold text-indigo-300 mb-4 font-persian" dir="rtl">{importMessage}</p>}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleExportData} className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer">
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Export (JSON)</span>
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Restore</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            <button onClick={handleResetData} className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-red-950/40 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ml-auto">
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
