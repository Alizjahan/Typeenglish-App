import { vocabProgressService } from './vocabProgressService';
import { grammarProgressService } from './grammarProgressService';
import { listeningProgressService } from './listeningProgressService';
import { speedTypingProgressService } from './speedTypingProgressService';
import { book1Vocab, book2Vocab, book3Vocab, book4Vocab, book5Vocab, book6Vocab, EEWWord } from '../data/vocabulary/eew_books';
import { grammar_seed } from '../data/grammar_typing/grammar_seed';
import { listening_seed } from '../data/listening_typing/listening_seed';
import { speedTypingCurriculum } from '../data/speed_typing/seed';

export type ReviewCategory = 'vocabulary' | 'grammar' | 'listening' | 'speedTyping';

export interface ReviewItem {
  skill: ReviewCategory;
  sourceId: string;
  reason: string;
  priority: number;
}

export const reviewService = {
  getVocabularyReviewItems(): ReviewItem[] {
    const allProgress = vocabProgressService.getAllProgress();
    const now = Date.now();
    const items: ReviewItem[] = [];

    for (const [id, p] of Object.entries(allProgress)) {
      if (p.box > 0 && p.nextReviewAt <= now) {
        items.push({
          skill: 'vocabulary',
          sourceId: id,
          reason: `Due for review`,
          priority: now - p.nextReviewAt
        });
      } else if (p.box === 1) {
        items.push({
          skill: 'vocabulary',
          sourceId: id,
          reason: `Hard word`,
          priority: 0
        });
      }
    }
    const unique = Array.from(new Map(items.map(i => [i.sourceId, i])).values());
    return unique.sort((a, b) => b.priority - a.priority);
  },

  getGrammarReviewItems(): ReviewItem[] {
    const allProgress = grammarProgressService.getAllProgress();
    const items: ReviewItem[] = [];
    
    for (const [topicId, p] of Object.entries(allProgress)) {
      if (p.wrongOptionsSelected && Object.keys(p.wrongOptionsSelected).length > 0) {
        const totalMistakes = Object.values(p.wrongOptionsSelected).reduce((a, b) => a + b, 0);
        if (totalMistakes > 0) {
          items.push({
            skill: 'grammar',
            sourceId: topicId,
            reason: `${totalMistakes} mistakes`,
            priority: totalMistakes
          });
        }
      }
    }
    return items.sort((a, b) => b.priority - a.priority);
  },

  getListeningReviewItems(): ReviewItem[] {
    const allProgress = listeningProgressService.getProgress();
    const items: ReviewItem[] = [];
    
    for (const [topicId, topic] of Object.entries(allProgress)) {
      for (const [exerciseId, ex] of Object.entries(topic.exercises)) {
        if (!ex.isCorrectFirstTry || ex.replayCount > 3 || ex.wordAccuracy < 90) {
          let reason = '';
          let priority = 0;
          if (ex.wordAccuracy < 90) {
            reason = 'Low accuracy';
            priority += (100 - ex.wordAccuracy);
          } else if (ex.replayCount > 3) {
            reason = 'Many replays needed';
            priority += ex.replayCount;
          } else if (!ex.isCorrectFirstTry) {
            reason = 'Failed first attempt';
            priority += 5;
          }
          
          items.push({
            skill: 'listening',
            sourceId: `${topicId}::${exerciseId}`, // Composite ID
            reason,
            priority
          });
        }
      }
    }
    return items.sort((a, b) => b.priority - a.priority);
  },

  getSpeedTypingReviewItems(): ReviewItem[] {
    const allProgress = speedTypingProgressService.getAllProgress();
    const items: ReviewItem[] = [];
    
    for (const [exId, record] of Object.entries(allProgress)) {
      if (record.completed && (record.bestStars < 3 || record.bestAccuracy < 95)) {
        let reason = '';
        let priority = 0;
        if (record.bestStars < 3) {
          reason = `${record.bestStars} Stars`;
          priority += (3 - record.bestStars) * 10;
        } else if (record.bestAccuracy < 95) {
          reason = `Low accuracy`;
          priority += (100 - record.bestAccuracy);
        }
        
        items.push({
          skill: 'speedTyping',
          sourceId: exId,
          reason,
          priority
        });
      }
    }
    return items.sort((a, b) => b.priority - a.priority);
  },

  resolveVocabulary(ids: string[]): EEWWord[] {
    const allWords = [
      ...book1Vocab, ...book2Vocab, ...book3Vocab, 
      ...book4Vocab, ...book5Vocab, ...book6Vocab
    ];
    return allWords.filter(w => ids.includes(w.id));
  },
  
  resolveGrammarTopic(topicId: string) {
    return grammar_seed[topicId] || null;
  },

  resolveListeningExercise(compositeId: string) {
    const [topicId, exerciseId] = compositeId.split('::');
    const topic = listening_seed[topicId];
    if (!topic) return null;
    const exercise = topic.exercises.find(e => e.id === exerciseId);
    if (!exercise) return null;
    return { topic, exercise }; // For Review we might need to construct a mini topic containing just this exercise
  },

  resolveSpeedTypingLesson(exerciseId: string) {
    const allCategories = speedTypingCurriculum;
    for (const cat of allCategories) {
      for (const les of cat.lessons) {
        if (les.exercises.find(e => e.id === exerciseId)) return les;
      }
    }
    return null;
  }
};
