export type ExerciseType = 'letters' | 'words' | 'sentences' | 'paragraphs';
export type ExpectedDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface SpeedTypingExercise {
  id: string;
  text: string;
  type: ExerciseType;
  difficulty: ExpectedDifficulty;
}

export interface SpeedTypingLesson {
  id: string;
  title: string;
  description?: string;
  targetWPM: number;
  exercises: SpeedTypingExercise[];
}

export interface SpeedTypingLevel {
  id: string;
  title: string;
  description: string;
  lessons: SpeedTypingLesson[];
}
