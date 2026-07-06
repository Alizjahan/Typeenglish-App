export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type NavigationTab = 'practice' | 'review' | 'profile';

export type WordStatus = 'new' | 'learning' | 'difficult' | 'mastered';

export type MistakeType = 'grammar' | 'vocabulary' | 'spelling' | 'listening' | 'typing';

export type ExerciseType = 
  | 'fill_blank'
  | 'reorder'
  | 'tense_choice'
  | 'error_fix'
  | 'persian_to_english'
  | 'english_to_persian';

export type PracticeMode =
  | 'sentence_typing'
  | 'listening_typing'
  | 'translation_typing'
  | 'grammar_typing'
  | 'speed_typing'
  | 'listening'
  | 'grammar'
  | 'vocabulary'
  | 'speaking';

export interface SentenceToken {
  text: string;
  role: string;
  roleFa: string;
  explanationFa?: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;
  meaningFa: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrasal_verb' | 'preposition' | 'pronoun' | 'phrase';
  definitionEn: string;
  exampleEn: string;
  exampleFa: string;
  synonyms?: string[];
  collocations?: string[];
}

export interface GrammarPoint {
  id: string;
  titleEn: string;
  titleFa: string;
  pattern: string;
  persianSummary: string;
  detailedExplanationFa: string;
  rules: string[];
  examples: {
    en: string;
    fa: string;
  }[];
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  persianPrompt?: string;
  options?: string[];
  correctAnswer: string;
  hintFa?: string;
  explanationFa?: string;
  wordsToReorder?: string[];
}


export interface StudyNote {
  concept: { en: string; fa: string; };
  mainExplanationFa?: string;
  pattern?: string | { formula: string; explanationFa?: string; };
  importantForms?: { titleFa: string; forms: { left: string; right: string; }[]; };
  examples: { en: string; fa?: string; correct?: boolean; }[];
  negativeQuestion?: { titleFa: string; examples: { en: string; fa: string; }[]; explanationFa?: string; };
  commonMistakes?: { incorrect: string; correct: string; explanationFa: string; }[];
  tips?: { en?: string; fa?: string; }[];
  [key: string]: any;
}

export interface TargetSentence {
  audioSrc?: string;
  text: string;
  persian: string;
  audioRate?: number;
  tokens: SentenceToken[];
}

export interface Lesson {
  id: string;
  unitId: string;
  number: number;
  title: string;
  persianTitle: string;
  targetSentence: TargetSentence;
  vocabulary: VocabularyWord[];
  studyNote: StudyNote;
  grammarPoint: GrammarPoint;
  practiceExercises: Exercise[];
  sourceMetadata?: {
    sourceBook: string;
    sourceUnit: string;
  };
}

export interface Unit {
  id: string;
  levelId: CEFRLevel;
  number: number;
  title: string;
  persianTitle: string;
  description: string;
  descriptionFa: string;
  lessons: Lesson[];
}

export interface Level {
  id: CEFRLevel;
  title: string;
  persianTitle: string;
  tagline: string;
  taglineFa: string;
  units: Unit[];
  isLocked: boolean;
}

export interface UserSettings {
  soundEnabled: boolean;
  ttsRate: number; // 0.75 | 1.0 | 1.25
  showPersianDefault: boolean;
  persianAlwaysAvailable: boolean;
  typingSound: boolean;
  appTheme: 'default' | 'ocean' | 'nature' | 'sunset' | 'light';
}

export interface User {
  id: string;
  name: string;
  level: CEFRLevel;
  xp: number;
  streak: number;
  lastActiveDate: string;
  dailyGoalMinutes: number;
  dailyMinutesSpent: number;
  placementTaken: boolean;
  settings: UserSettings;
}

export interface LessonScore {
  accuracy: number;
  wpm: number;
  completedAt: string;
  mistakesCount: number;
}

export interface UserProgress {
  completedLessonIds: string[];
  completedUnitIds: string[];
  lessonScores: Record<string, LessonScore>;
  unlockedLevels: CEFRLevel[];
  currentLearnSession?: { lessonId: string; step: string; };
}

export interface Mistake {
  id: string;
  lessonId?: string;
  type: MistakeType;
  prompt: string;
  expected: string;
  userGot: string;
  explanationFa?: string;
  timestamp: string;
  resolved: boolean;
}

export interface SavedWord {
  id: string;
  word: string;
  ipa: string;
  meaningFa: string;
  partOfSpeech: string;
  definitionEn: string;
  exampleEn: string;
  exampleFa: string;
  status: WordStatus;
  lastReviewed: string;
  nextReview: string;
  intervalDays: number;
  easeFactor: number;
}

export interface PlacementQuestion {
  id: string;
  type: 'grammar' | 'vocabulary' | 'reading' | 'listening';
  question: string;
  audioText?: string;
  readingPassage?: string;
  options: string[];
  correctIndex: number;
  levelWeight: CEFRLevel;
}

export interface WeaknessCategory {
  topic: string;
  topicFa: string;
  accuracy: number;
  mistakesCount: number;
}
