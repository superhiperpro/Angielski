// Audio and Speech Synthesis helper for rapid language learning with fallback audio

class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Lazy init
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public playCorrect() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  public playWrong() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(180, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  public playFanfare() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + index * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
      });
    } catch (e) {
      console.warn('Audio fanfare error:', e);
    }
  }

  public playClick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  }
}

export const sounds = new SoundEffects();

// Voice caching for Web Speech API
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
    } catch (e) {
      console.warn('Failed to load voices:', e);
    }
  };
  loadVoices();
  if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

// Current active utterance to prevent Chromium garbage collection bug
let activeUtterance: SpeechSynthesisUtterance | null = null;
let activeAudioFallback: HTMLAudioElement | null = null;

// Audio fallback using high quality online native voice
function playAudioFallback(cleanText: string, slow = false) {
  try {
    if (activeAudioFallback) {
      activeAudioFallback.pause();
      activeAudioFallback = null;
    }

    const encoded = encodeURIComponent(cleanText);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encoded}`;
    const audio = new Audio(audioUrl);
    activeAudioFallback = audio;

    if (slow) {
      audio.playbackRate = 0.75;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Audio fallback play failed:', err);
      });
    }
  } catch (err) {
    console.warn('Audio fallback error:', err);
  }
}

// Multi-engine speech function
export function speakEnglish(text: string, slow: boolean = false) {
  if (typeof window === 'undefined') return;

  const cleanText = text.replace(/[/()]/g, ' ').trim();
  if (!cleanText) return;

  // Check if SpeechSynthesis is available and working
  if ('speechSynthesis' in window) {
    try {
      // Chrome/Safari resume bug fix
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-GB'; // British English matching textbook style
      utterance.rate = slow ? 0.72 : 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      // Select natural voice
      const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US') || v.lang.startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
      }

      let hasStarted = false;

      utterance.onstart = () => {
        hasStarted = true;
      };

      utterance.onend = () => {
        activeUtterance = null;
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error, falling back to MP3 audio:', e);
        activeUtterance = null;
        playAudioFallback(cleanText, slow);
      };

      // Guard against silent failure on mobile (fallback if speech doesn't start in 350ms)
      setTimeout(() => {
        if (!hasStarted && !window.speechSynthesis.speaking) {
          playAudioFallback(cleanText, slow);
        }
      }, 350);

      activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return;
    } catch (e) {
      console.warn('SpeechSynthesis exception, using fallback:', e);
    }
  }

  // Fallback for browsers with no speech synthesis
  playAudioFallback(cleanText, slow);
}
