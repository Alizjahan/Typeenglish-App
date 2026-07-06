class AudioPool {
  private pools: Record<string, HTMLAudioElement[]> = {};
  private poolSize: number;
  private currentIndexes: Record<string, number> = {};
  public isMuted: boolean = false;
  
  private volumeMap: Record<string, number> = {
    'mech-1': 0.4,
    'mech-2': 0.4,
    'mech-3': 0.4,
    'mech-4': 0.4,
    'mech-5': 0.4,
    'wrong': 0.25, 
    'star': 0.35
  };

  constructor(poolSize = 4) {
    this.poolSize = poolSize;
  }

  preload(key: string, src: string) {
    if (!this.pools[key]) {
      this.pools[key] = [];
      this.currentIndexes[key] = 0;
      for (let i = 0; i < this.poolSize; i++) {
        const audio = new Audio(src);
        audio.volume = this.volumeMap[key] || 0.4;
        audio.preload = 'auto';
        this.pools[key].push(audio);
      }
    }
  }

  play(key: string) {
    if (this.isMuted) return;
    
    const pool = this.pools[key];
    if (!pool) return;

    const index = this.currentIndexes[key];
    const audio = pool[index];
    
    audio.currentTime = 0;
    audio.play().catch(() => {});

    this.currentIndexes[key] = (index + 1) % this.poolSize;
  }
}

export const sfxEngine = new AudioPool(6); 

if (typeof window !== 'undefined') {
  for (let i = 1; i <= 5; i++) {
    sfxEngine.preload(`mech-${i}`, `/audio/sfx/mech-${i}.wav`);
  }
  sfxEngine.preload('wrong', '/audio/sfx/key-wrong.wav');
  sfxEngine.preload('star', '/audio/sfx/star-earned.wav');
}
