export interface GrammarWordData {
  text: string;
  pos: string;
  ipa: string;
}

export interface GrammarChunk {
  text: string;
  function: string;
  words: GrammarWordData[];
}

export type GrammarExerciseType = 'multiple_choice_typing' | 'review_mistakes';

export interface GrammarExercise {
  id: string;
  type: GrammarExerciseType;
  
  // The sentence with a blank, e.g., "She ___ to work every day."
  blankSentence: string;
  
  // Exactly 4 options
  options: string[];
  
  // The correct option string, must match one of the options exactly
  correctOption: string;
  
  // The full complete English sentence
  fullSentence: string;
  
  // Persian translation
  translationFa: string;
  
  // Explanation of why this is correct
  grammarNoteEn: string;
  grammarNoteFa: string;
  
  // Which chunk or word is being tested (to highlight in analysis)
  testedElement: string;
  
  // Grammatical breakdown
  chunks: GrammarChunk[];
  
  // Path to local audio asset
  audioUrl?: string;
}

export interface GrammarTopicSession {
  topicId: string;
  titleEn: string;
  titleFa: string;
  formula: string;
  explanationFa: string;
  exercises: GrammarExercise[];
}
