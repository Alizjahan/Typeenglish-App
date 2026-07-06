import { vocabProgressService } from './vocabProgressService';
import { grammarProgressService } from './grammarProgressService';
import { listeningProgressService } from './listeningProgressService';
import { speedTypingProgressService } from './speedTypingProgressService';
import { 
  User, 
  UserProgress, 
  SavedWord, 
  Mistake, 
  LessonScore, 
  VocabularyWord, 
  WordStatus, 
  CEFRLevel,
  WeaknessCategory 
} from '../types';

const USER_KEY = 'type_english_user';
const PROGRESS_KEY = 'type_english_progress';
const WORDS_KEY = 'type_english_words';
const MISTAKES_KEY = 'type_english_mistakes';

const defaultUser: User = {
  id: 'local_user_1',
  name: 'Learner',
  level: 'A1',
  xp: 120,
  streak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 20,
  dailyMinutesSpent: 12,
  placementTaken: false,
  settings: {
    soundEnabled: true,
    ttsRate: 1.0,
    showPersianDefault: true,
    persianAlwaysAvailable: true,
    typingSound: true,
    appTheme: 'default',
  }
};

const defaultProgress: UserProgress = {
  completedLessonIds: ['a1-u1-l1', 'a1-u1-l2'],
  completedUnitIds: [],
  lessonScores: {
    'a1-u1-l1': { accuracy: 96, wpm: 34, completedAt: new Date(Date.now() - 86400000 * 2).toISOString(), mistakesCount: 1 },
    'a1-u1-l2': { accuracy: 92, wpm: 38, completedAt: new Date(Date.now() - 86400000).toISOString(), mistakesCount: 2 }
  },
  unlockedLevels: ['A1']
};

const initialSavedWords: SavedWord[] = [
  {
    id: 'v-wake-up',
    word: 'wake up',
    ipa: '/weɪk ʌp/',
    meaningFa: 'بیدار شدن',
    partOfSpeech: 'phrasal_verb',
    definitionEn: 'To stop sleeping and become alert.',
    exampleEn: 'I wake up at seven every morning.',
    exampleFa: 'من هر روز صبح ساعت هفت بیدار می‌شوم.',
    status: 'learning',
    lastReviewed: new Date().toISOString(),
    nextReview: new Date(Date.now() + 86400000).toISOString(),
    intervalDays: 1,
    easeFactor: 2.5
  },
  {
    id: 'v-usually',
    word: 'usually',
    ipa: '/ˈjuːʒuəli/',
    meaningFa: 'معمولاً',
    partOfSpeech: 'adverb',
    definitionEn: 'Under normal conditions; generally.',
    exampleEn: 'She usually drinks tea for breakfast.',
    exampleFa: 'او معمولاً برای صبحانه چای می‌نوشد.',
    status: 'new',
    lastReviewed: new Date().toISOString(),
    nextReview: new Date(Date.now() + 86400000).toISOString(),
    intervalDays: 1,
    easeFactor: 2.5
  },
  {
    id: 'v-parents',
    word: 'parents',
    ipa: '/ˈperənts/',
    meaningFa: 'والدین',
    partOfSpeech: 'noun',
    definitionEn: 'A person\'s father and mother.',
    exampleEn: 'My parents live in Tehran.',
    exampleFa: 'والدین من در تهران زندگی می‌کنند.',
    status: 'mastered',
    lastReviewed: new Date().toISOString(),
    nextReview: new Date(Date.now() + 86400000 * 7).toISOString(),
    intervalDays: 7,
    easeFactor: 2.8
  }
];

const initialMistakes: Mistake[] = [
  {
    id: 'm-1',
    lessonId: 'a1-u3-l1',
    type: 'grammar',
    prompt: 'She ___ up at 7 every day.',
    expected: 'wakes',
    userGot: 'wake',
    explanationFa: 'برای فاعل سوم شخص مفرد (She)، به انتهای فعل -s اضافه می‌شود.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'm-2',
    lessonId: 'a1-u1-l2',
    type: 'grammar',
    prompt: 'I ___ a student.',
    expected: 'am',
    userGot: 'is',
    explanationFa: 'با ضمیر فاعلی I همواره فعل am می‌آید.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'm-3',
    lessonId: 'a1-u3-l1',
    type: 'spelling',
    prompt: 'Spell "usually"',
    expected: 'usually',
    userGot: 'usualy',
    explanationFa: 'کلمه usually با دو حرف l نوشته می‌شود.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'm-4',
    lessonId: 'a1-u1-l1',
    type: 'listening',
    prompt: 'Nice to meet you.',
    expected: 'meet',
    userGot: 'meat',
    explanationFa: 'کلمه meet (دیدار) با meat (گوشت) هم‌آواست اما با ee نوشته می‌شود.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'm-5',
    lessonId: 'a1-u3-l1',
    type: 'typing',
    prompt: 'at seven',
    expected: 'at seven',
    userGot: 'at sevn',
    explanationFa: 'املای هفت: seven',
    timestamp: new Date().toISOString(),
    resolved: false
  }
];

export const storageService = {
  getUser(): User {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (!data) {
        this.saveUser(defaultUser);
        return defaultUser;
      }
      return JSON.parse(data);
    } catch {
      return defaultUser;
    }
  },

  saveUser(user: User): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage saveUser error:', e);
    }
  },

  updateUser(partial: Partial<User>): User {
    const current = this.getUser();
    const updated = { ...current, ...partial };
    this.saveUser(updated);
    return updated;
  },

  getProgress(): UserProgress {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (!data) {
        this.saveProgress(defaultProgress);
        return defaultProgress;
      }
      return JSON.parse(data);
    } catch {
      return defaultProgress;
    }
  },

  saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage saveProgress error:', e);
    }
  },

  
  saveLessonCompletion(lessonId: string, unitId: string, score: LessonScore, xpGained: number): { user: User; progress: UserProgress } {
    const user = this.getUser();
    const progress = this.getProgress();

    const isNewCompletion = !progress.completedLessonIds.includes(lessonId);
    if (isNewCompletion) {
      progress.completedLessonIds.push(lessonId);
    }
    progress.lessonScores[lessonId] = score;

    // Check if streak should increment
    const today = new Date().toISOString().split('T')[0];
    let newStreak = user.streak;
    if (user.lastActiveDate !== today) {
      newStreak += 1;
    }

    user.streak = newStreak;
    user.xp += xpGained;
    user.lastActiveDate = today;
    user.dailyMinutesSpent = Math.min(user.dailyGoalMinutes, user.dailyMinutesSpent + 5);

    this.saveUser(user);
    this.saveProgress(progress);

    return { user, progress };
  },

  unlockLevel(level: CEFRLevel): void {
    const progress = this.getProgress();
    if (!progress.unlockedLevels.includes(level)) {
      progress.unlockedLevels.push(level);
      this.saveProgress(progress);
    }
    this.updateUser({ level });
  },

  exportAllData(): string {
    const data = {
      user: this.getUser(),
      progress: this.getProgress(),
            vocabProgress: vocabProgressService.getAllProgress(),
      grammarProgress: grammarProgressService.getAllProgress(),
      listeningProgress: listeningProgressService.getProgress(),
      speedTypingProgress: speedTypingProgressService.getAllProgress(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  importAllData(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.user) this.saveUser(parsed.user);
      if (parsed.progress) this.saveProgress(parsed.progress);
            
      if (parsed.vocabProgress) localStorage.setItem('te_vocab_progress', JSON.stringify(parsed.vocabProgress));
      if (parsed.grammarProgress) localStorage.setItem('te_grammar_progress', JSON.stringify(parsed.grammarProgress));
      if (parsed.listeningProgress) localStorage.setItem('english_app_listening_progress_v2', JSON.stringify(parsed.listeningProgress));
      if (parsed.speedTypingProgress) localStorage.setItem('speed_typing_progress', JSON.stringify(parsed.speedTypingProgress));

      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },

  resetProgress(): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(WORDS_KEY);
    localStorage.removeItem(MISTAKES_KEY);
  }
};
