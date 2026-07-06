export type ListeningExerciseStatus = 'perfect' | 'accepted' | 'incorrect' | 'skipped' | 'pending';

export interface ListeningExerciseProgress {
  exerciseId: string;
  status: ListeningExerciseStatus;
  submittedText?: string;
  isCorrectFirstTry: boolean;
  replayCount: number;
  wordAccuracy: number;
  completedAt: string;
}

export interface ListeningTopicProgress {
  topicId: string; // e.g. "a1", "a2"
  currentIndex: number;
  completedExerciseIds: string[];
  exercises: Record<string, ListeningExerciseProgress>;
}

const STORAGE_KEY = 'english_app_listening_progress_v2'; // Bumped version to avoid stale structure

export const listeningProgressService = {
  getProgress(): Record<string, ListeningTopicProgress> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },
  
  getTopicProgress(topicId: string): ListeningTopicProgress {
    const all = this.getProgress();
    if (!all[topicId]) {
      return { topicId, currentIndex: 0, completedExerciseIds: [], exercises: {} };
    }
    return all[topicId];
  },
  
  saveTopicProgress(progress: ListeningTopicProgress) {
    const all = this.getProgress();
    all[progress.topicId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
};
