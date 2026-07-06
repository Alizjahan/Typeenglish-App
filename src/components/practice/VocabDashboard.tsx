import React, { useMemo } from 'react';
import { BookOpen, CalendarCheck, Play, ArrowLeft } from 'lucide-react';
import { book1Vocab, book2Vocab, book3Vocab, book4Vocab, book5Vocab, book6Vocab, EEWWord } from '../../data/vocabulary/eew_books';
import { vocabProgressService } from '../../services/vocabProgressService';
import { VocabularyMediaService } from '../../services/vocabularyMediaService';

interface Props {
  onBack: () => void;
  onSelectBook: (bookId: number) => void;
  onStartReview: (reviewWords: EEWWord[]) => void;
}

const books = [
  { id: 1, title: 'Book 1', vocab: book1Vocab },
  { id: 2, title: 'Book 2', vocab: book2Vocab },
  { id: 3, title: 'Book 3', vocab: book3Vocab },
  { id: 4, title: 'Book 4', vocab: book4Vocab },
  { id: 5, title: 'Book 5', vocab: book5Vocab },
  { id: 6, title: 'Book 6', vocab: book6Vocab }
];

export const VocabDashboard: React.FC<Props> = ({ onBack, onSelectBook, onStartReview }) => {
  const allProgress = useMemo(() => vocabProgressService.getAllProgress(), []);

  const now = Date.now();
  let totalDue = 0;
  
  const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, mastered: 0 };
  const reviewWords: EEWWord[] = [];
  const learningWords: EEWWord[] = [];

  books.forEach(book => {
    book.vocab.forEach(w => {
      const p = allProgress[w.id];
      if (p && p.box > 0) {
        if (p.nextReviewAt <= now) {
          totalDue++;
          reviewWords.push(w);
        } else {
          learningWords.push(w);
        }

        if (p.box === 1) boxCounts[1]++;
        else if (p.box === 2) boxCounts[2]++;
        else if (p.box === 3) boxCounts[3]++;
        else if (p.box === 4) boxCounts[4]++;
        else if (p.box === 5) boxCounts[5]++;
        else if (p.box >= 6) boxCounts.mastered++;
      }
    });
  });

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 animate-in fade-in duration-300 flex flex-col">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-persian">بازگشت به منوی تمرین</span>
      </button>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">4000 Essential English Words</h2>
      </div>

      <div className="mb-12">
        <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="w-full flex justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div className="text-right flex-1">
              <h3 className="text-3xl font-bold text-white mb-2 font-persian" dir="rtl">مرور واژگان (لایتنر)</h3>
              <p className="text-cyan-200/80 font-persian text-lg" dir="rtl">کلماتی که اکنون نیاز به مرور دارند را تمرین کنید تا کلمات جدید به حافظه بلندمدت منتقل شوند.</p>
            </div>
          </div>
          
          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-4 font-persian mb-10" dir="rtl">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-zinc-400 text-sm mb-1">جعبه ۱ (روزانه)</div>
              <div className="text-white text-3xl font-bold">{boxCounts[1]}</div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
              <div className="text-cyan-500/70 text-sm mb-1">جعبه ۲ (۳ روز)</div>
              <div className="text-cyan-400 text-3xl font-bold">{boxCounts[2]}</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-blue-500/70 text-sm mb-1">جعبه ۳ (۷ روز)</div>
              <div className="text-blue-400 text-3xl font-bold">{boxCounts[3]}</div>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
              <div className="text-indigo-500/70 text-sm mb-1">جعبه ۴ (۱۴ روز)</div>
              <div className="text-indigo-400 text-3xl font-bold">{boxCounts[4]}</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
              <div className="text-purple-500/70 text-sm mb-1">جعبه ۵ (۳۰ روز)</div>
              <div className="text-purple-400 text-3xl font-bold">{boxCounts[5]}</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-emerald-500/70 text-sm mb-1">یادگرفته شده</div>
              <div className="text-emerald-400 text-3xl font-bold">{boxCounts.mastered}</div>
            </div>
          </div>
          
          <div className="w-full flex justify-center z-10 relative">
            <button 
              onClick={() => {
                VocabularyMediaService.unlockAudio();
                if (totalDue > 0) {
                  onStartReview(reviewWords);
                } else if (learningWords.length > 0) {
                  const extra = [...learningWords].sort(() => Math.random() - 0.5).slice(0, 20);
                  onStartReview(extra);
                } else {
                  alert('شما هنوز هیچ کلمه‌ای برای مرور ندارید! لطفاً از بخش کتاب‌ها یادگیری را شروع کنید.');
                }
              }}
              className={`w-full max-w-sm px-8 py-5 text-white font-bold rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-lg hover:scale-105 active:scale-95 ${totalDue > 0 ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'}`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-7 h-7" />
                <span className="text-2xl font-persian">{totalDue > 0 ? 'شروع مرور لایتنر' : 'تمرین آزاد (مرور اضافه)'}</span>
              </div>
              <span className="text-sm text-white/80 font-persian mt-2">
                {totalDue > 0 ? `${totalDue} کلمه آماده‌ی مرور هستند` : (learningWords.length > 0 ? 'هیچ کلمه‌ای موعدش نرسیده، می‌توانید خارج از نوبت تمرین کنید' : 'کلمه‌ای در جعبه نیست')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 font-persian" dir="rtl">یادگیری کلمات جدید (بر اساس کتاب)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => {
          const total = book.vocab.length;
          let learned = 0;
          let due = 0;
          let mastered = 0;
          let newWords = 0;

          book.vocab.forEach(w => {
            const p = allProgress[w.id];
            if (!p) {
              newWords++;
            } else {
              if (p.nextReviewAt <= now) due++;
              if (p.box >= 6) mastered++;
              else if (p.box > 0) learned++;
            }
          });

          return (
            <div
              key={book.id}
              onClick={() => {
                VocabularyMediaService.unlockAudio();
                onSelectBook(book.id);
              }}
              className="p-6 rounded-2xl bg-app-card border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 cursor-pointer transition-all duration-200 group flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-0.5">{book.title}</h3>
                  <p className="text-sm text-zinc-500 font-mono">{total} Words</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto font-mono text-sm">
                <div className="bg-white/5 rounded-lg p-2.5 flex flex-col">
                  <span className="text-zinc-500 mb-1">New</span>
                  <span className="text-white font-bold">{newWords}</span>
                </div>
                <div className="bg-cyan-500/10 rounded-lg p-2.5 flex flex-col">
                  <span className="text-cyan-500/70 mb-1">Due</span>
                  <span className="text-cyan-400 font-bold">{due}</span>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-2.5 flex flex-col">
                  <span className="text-blue-500/70 mb-1">Learning</span>
                  <span className="text-blue-400 font-bold">{learned}</span>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-2.5 flex flex-col">
                  <span className="text-emerald-500/70 mb-1">Mastered</span>
                  <span className="text-emerald-400 font-bold">{mastered}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
