class TTSService {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      // Find good English voice
      const englishVoice = 
        voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Zira') || v.name.includes('Samantha'))) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];
      
      this.selectedVoice = englishVoice || null;
      this.isLoaded = true;
    }
  }

  public speak(
    text: string, 
    rate: number = 1.0, 
    onStart?: () => void, 
    onEnd?: () => void
  ): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported');
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous utterance
    this.synth.cancel();

    if (!this.selectedVoice) {
      this.loadVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = Math.max(0.5, Math.min(rate, 1.5));
    utterance.pitch = 1.0;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    if (onStart) {
      utterance.onstart = onStart;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS utterance error:', e);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isAvailable(): boolean {
    return this.synth !== null;
  }
}

export const ttsService = new TTSService();
