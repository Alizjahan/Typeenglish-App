export interface VocabProgress {
  wordId: string;
  box: number; // 0=Unknown, 1=Hard, 2=Medium, 3=Easy, 4+ = Mastered
  lastSeenAt: number;
  nextReviewAt: number;
  timesSeen: number;
  timesCorrect: number;
}

export type Rating = 'unknown' | 'hard' | 'medium' | 'easy';

const STORAGE_KEY = 'te_vocab_progress';

export const vocabProgressService = {
  getAllProgress(): Record<string, VocabProgress> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },

  saveProgress(data: Record<string, VocabProgress>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getProgress(wordId: string): VocabProgress | null {
    const all = this.getAllProgress();
    return all[wordId] || null;
  },

  rateWord(wordId: string, rating: Rating, accuracy: number) {
    const all = this.getAllProgress();
    let current = all[wordId];
    
    if (!current) {
      current = {
        wordId,
        box: 0,
        lastSeenAt: 0,
        nextReviewAt: 0,
        timesSeen: 0,
        timesCorrect: 0
      };
    }

    current.timesSeen += 1;
    if (accuracy >= 80) {
      current.timesCorrect += 1;
    }
    current.lastSeenAt = Date.now();

    // Leitner intervals in milliseconds
    const intervals = {
      'unknown': 0, // Same session
      'hard': 1 * 24 * 60 * 60 * 1000, // 1 day
      'medium': 3 * 24 * 60 * 60 * 1000, // 3 days
      'easy_base': 7 * 24 * 60 * 60 * 1000 // 7 days (scales with box)
    };

    if (rating === 'unknown') {
      current.box = 0;
      current.nextReviewAt = Date.now();
    } else if (rating === 'hard') {
      current.box = 1;
      current.nextReviewAt = Date.now() + intervals.hard;
    } else if (rating === 'medium') {
      current.box = 2;
      current.nextReviewAt = Date.now() + intervals.medium;
    } else if (rating === 'easy') {
      current.box = Math.max(3, current.box + 1);
      // Box 3: 7 days, 4: 14, 5: 30, 6: 60, 7+: 120
      let days = 7;
      if (current.box === 4) days = 14;
      else if (current.box === 5) days = 30;
      else if (current.box === 6) days = 60;
      else if (current.box >= 7) days = 120;
      current.nextReviewAt = Date.now() + (days * 24 * 60 * 60 * 1000);
    }

    all[wordId] = current;
    this.saveProgress(all);
  }
};
