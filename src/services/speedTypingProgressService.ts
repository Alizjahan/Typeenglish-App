export interface SpeedTypingRecord {
  completed: boolean;
  bestWPM: number;
  bestAccuracy: number;
  bestStars: number;
  attemptCount: number;
  lastAttemptAt: string;
}

export interface SpeedTypingProgress {
  [exerciseId: string]: SpeedTypingRecord;
}

const STORAGE_KEY = 'speed_typing_progress';

export const speedTypingProgressService = {
  getAllProgress(): SpeedTypingProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveProgress(exerciseId: string, wpm: number, accuracy: number, stars: number) {
    const all = this.getAllProgress();
    const existing = all[exerciseId] || {
      completed: false,
      bestWPM: 0,
      bestAccuracy: 0,
      bestStars: 0,
      attemptCount: 0,
      lastAttemptAt: new Date().toISOString()
    };

    all[exerciseId] = {
      completed: true,
      bestWPM: Math.max(existing.bestWPM, wpm),
      bestAccuracy: Math.max(existing.bestAccuracy, accuracy),
      bestStars: Math.max(existing.bestStars || 0, stars),
      attemptCount: existing.attemptCount + 1,
      lastAttemptAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },
  
  getExerciseProgress(exerciseId: string): SpeedTypingRecord | null {
    return this.getAllProgress()[exerciseId] || null;
  }
};
