export class VocabularyMediaService {
  private static currentAudio: HTMLAudioElement | null = null;
  private static audioEnabled: boolean = false;

  // Resolvers
  static resolveImage(filename: string): string {
    return `/media/vocab/${encodeURIComponent(filename)}`;
  }

  static resolveAudio(filename: string): string {
    return `/media/vocab/${encodeURIComponent(filename)}`;
  }

  // Interaction unlocker
  static unlockAudio() {
    this.audioEnabled = true;
  }
  
  static isAudioEnabled(): boolean {
    return this.audioEnabled;
  }

  // Playback control
  static stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  private static playTTS(text: string, isExample: boolean = false) {
    if (!window.speechSynthesis) return;
    this.stop();
    const utterance = new SpeechSynthesisUtterance(text);
    // Prefer en-US or en-GB
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) || voices.find(v => v.lang.startsWith('en'));
    if (engVoice) utterance.voice = engVoice;
    
    // Slight adjustments for examples vs single words
    utterance.rate = isExample ? 0.85 : 0.9;
    
    window.speechSynthesis.speak(utterance);
  }

  private static async playFile(filename: string | undefined, fallbackText: string, isExample: boolean) {
    this.stop();

    if (!filename) {
      this.playTTS(fallbackText, isExample);
      return;
    }

    try {
      const audio = new Audio(this.resolveAudio(filename));
      this.currentAudio = audio;
      await audio.play();
      this.audioEnabled = true; // Auto-unlock if play succeeds
    } catch (err) {
      console.warn("Audio playback failed, falling back to TTS:", err);
      // Fallback if blocked by browser or file missing
      this.playTTS(fallbackText, isExample);
    }
  }

  // Specific player methods
  static playWord(filename: string | undefined, wordText: string) {
    this.playFile(filename, wordText, false);
  }

  static playExample(filename: string | undefined, exampleText: string) {
    // strip html tags for tts
    const cleanText = exampleText.replace(/<[^>]*>?/gm, '');
    this.playFile(filename, cleanText, true);
  }
}
