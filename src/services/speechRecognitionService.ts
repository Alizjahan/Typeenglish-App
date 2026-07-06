export interface SpeechFeedback {
  recognizedText: string;
  pronunciationScore: number;
  wordAccuracy: number;
  fluencyScore: number;
  passed: boolean;
  wordDetails: {
    word: string;
    matched: boolean;
  }[];
}

class SpeechRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    targetSentence: string,
    onResult: (feedback: SpeechFeedback) => void,
    onError: (error: string) => void
  ): () => void {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser.');
      return () => {};
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      const feedback = this.evaluateSpeech(targetSentence, transcript);
      onResult(feedback);
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError(event.error || 'Speech recognition error');
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      this.isListening = false;
      onError(e.message || 'Could not start microphone');
    }

    return () => {
      if (this.isListening) {
        try {
          this.recognition.stop();
        } catch {
          // ignore
        }
        this.isListening = false;
      }
    };
  }

  public evaluateSpeech(targetText: string, recognizedText: string): SpeechFeedback {
    const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const targetWords = clean(targetText).split(/\s+/).filter(Boolean);
    const spokenWords = clean(recognizedText).split(/\s+/).filter(Boolean);

    let matchedCount = 0;
    const wordDetails = targetWords.map(tWord => {
      const matched = spokenWords.includes(tWord);
      if (matched) matchedCount++;
      return { word: tWord, matched };
    });

    const wordAccuracy = targetWords.length > 0 
      ? Math.round((matchedCount / targetWords.length) * 100)
      : 100;

    // Levenshtein similarity for pronunciation score
    const similarity = this.calculateStringSimilarity(clean(targetText), clean(recognizedText));
    const pronunciationScore = Math.max(wordAccuracy, Math.round(similarity * 100));
    const fluencyScore = Math.min(100, Math.round(pronunciationScore * 0.95 + 5));

    return {
      recognizedText,
      pronunciationScore,
      wordAccuracy,
      fluencyScore,
      passed: pronunciationScore >= 60,
      wordDetails
    };
  }

  private calculateStringSimilarity(s1: string, s2: string): number {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longerLength - editDistance) / longerLength;
  }

  private levenshteinDistance(s1: string, s2: string): number {
    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
