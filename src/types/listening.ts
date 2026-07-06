export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface ListeningExercise {
  id: string;
  level: CEFRLevel;
  text: string;
  translationFa: string;
  audioUrl: string;
  speaker: string;
  accent: string;
  audioSource: string;
  defaultRate: number;
  difficulty: number;
  tags: string[];
}

export interface ListeningTopic {
  topicId: string;
  titleEn: string;
  titleFa: string;
  exercises: ListeningExercise[];
}
