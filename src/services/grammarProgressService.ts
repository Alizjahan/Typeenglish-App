export interface GrammarTopicProgress {
  completedExerciseIds: string[];
  currentExerciseIndex: number;
  wrongOptionsSelected: Record<string, number>; // exerciseId -> count of mistakes
  status: 'not_started' | 'in_progress' | 'completed';
  lastStudied: string;
}

export interface GrammarProgressMap {
  [topicId: string]: GrammarTopicProgress;
}

class GrammarProgressService {
  private STORAGE_KEY = 'te_grammar_progress';

  getAllProgress(): GrammarProgressMap {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load grammar progress', e);
    }
    return {};
  }

  getTopicProgress(topicId: string): GrammarTopicProgress {
    const all = this.getAllProgress();
    return all[topicId] || {
      completedExerciseIds: [],
      currentExerciseIndex: 0,
      wrongOptionsSelected: {},
      status: 'not_started',
      lastStudied: new Date().toISOString()
    };
  }

  saveProgress(topicId: string, progress: Partial<GrammarTopicProgress>) {
    const all = this.getAllProgress();
    const current = this.getTopicProgress(topicId);
    
    all[topicId] = {
      ...current,
      ...progress,
      lastStudied: new Date().toISOString()
    };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
  }
}

export const grammarProgressService = new GrammarProgressService();
