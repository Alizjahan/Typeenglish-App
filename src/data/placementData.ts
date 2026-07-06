import { PlacementQuestion } from '../types';

export const placementQuestions: PlacementQuestion[] = [
  {
    id: 'pq-1',
    type: 'grammar',
    question: 'She ___ to university every morning.',
    options: ['go', 'goes', 'going', 'is go'],
    correctIndex: 1,
    levelWeight: 'A1'
  },
  {
    id: 'pq-2',
    type: 'vocabulary',
    question: 'Which word means "معمولاً" in English?',
    options: ['Rarely', 'Usually', 'Never', 'Seldom'],
    correctIndex: 1,
    levelWeight: 'A1'
  },
  {
    id: 'pq-3',
    type: 'grammar',
    question: 'Yesterday, we ___ a great film at the cinema.',
    options: ['watch', 'watched', 'have watched', 'was watching'],
    correctIndex: 1,
    levelWeight: 'A2'
  },
  {
    id: 'pq-4',
    type: 'reading',
    readingPassage: 'Alex loves traveling. Last summer, he visited Italy and tried authentic gelato in Rome. He plans to visit Japan next spring to see the cherry blossoms.',
    question: 'Where does Alex intend to travel next spring?',
    options: ['Italy', 'Rome', 'Japan', 'France'],
    correctIndex: 2,
    levelWeight: 'A2'
  },
  {
    id: 'pq-5',
    type: 'grammar',
    question: 'If I ___ more free time, I would learn how to play the piano.',
    options: ['have', 'had', 'have had', 'will have'],
    correctIndex: 1,
    levelWeight: 'B1'
  },
  {
    id: 'pq-6',
    type: 'vocabulary',
    question: 'Choose the synonym for "reluctant":',
    options: ['Eager', 'Hesitant', 'Delighted', 'Confident'],
    correctIndex: 1,
    levelWeight: 'B2'
  }
];
