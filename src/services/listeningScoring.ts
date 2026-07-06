export function getWords(text: string): string[] {
  return text.toLowerCase()
    .replace(/[.,!?]/g, '')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);
}

export function levenshtein(a: string, b: string): number {
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + indicator
      );
    }
  }
  return matrix[a.length][b.length];
}

export function evaluateAnswer(target: string, input: string) {
  const targetWords = getWords(target);
  const inputWords = getWords(input);

  const normTarget = targetWords.join(' ');
  const normInput = inputWords.join(' ');

  if (normTarget === normInput) {
    return { status: 'perfect', accuracy: 100, isMajorError: false };
  }

  let majorError = false;

  if (targetWords.length !== inputWords.length) {
    majorError = true;
  }

  let matchCount = 0;
  
  if (!majorError) {
    for (let i = 0; i < targetWords.length; i++) {
      const t = targetWords[i];
      const inp = inputWords[i];
      if (t === inp) {
        matchCount++;
      } else {
        const dist = levenshtein(t, inp);
        const maxDist = t.length > 5 ? 2 : 1;
        
        // Contractions and key verbs/pronouns must be exact
        const isCritical = /^(not|n't|is|are|was|were|am|do|does|did|have|has|had|will|would|can|could|should|shall|must|he|she|it|they|we|i|you)$/.test(t);
        // Also don't accept if they omit 's or change contraction meaning
        if (isCritical || dist > maxDist || t.includes("'") || inp.includes("'")) {
          majorError = true;
        } else {
          matchCount += 0.9;
        }
      }
    }
  }

  const accuracy = targetWords.length > 0 ? Math.round((matchCount / targetWords.length) * 100) : 0;
  
  if (majorError || accuracy < 95) {
    return { status: 'incorrect', accuracy: Math.max(0, accuracy), isMajorError: true };
  }
  
  return { status: 'accepted', accuracy, isMajorError: false };
}
