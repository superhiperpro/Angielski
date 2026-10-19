import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check, HelpCircle, Volume2, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { SPELLING_WORDS, SpellingWord } from '../data/curriculumData';
import { sounds, speakEnglish } from '../utils/audio';

interface SpellingModeProps {
  onEarnStar: () => void;
}

export const SpellingMode: React.FC<SpellingModeProps> = ({ onEarnStar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [revealedLetters, setRevealedLetters] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFullHint, setShowFullHint] = useState(false);
  const [completedWords, setCompletedWords] = useState<number>(0);

  const currentItem: SpellingWord = SPELLING_WORDS[currentIndex] || SPELLING_WORDS[0];
  const targetWord = currentItem.word;

  const handleInputChange = (val: string) => {
    setUserInput(val);

    // Case-insensitive check (or strict for uppercase nationalities)
    if (val.trim().toLowerCase() === targetWord.toLowerCase()) {
      setIsSuccess(true);
      sounds.playCorrect();
      onEarnStar();
      setCompletedWords(prev => prev + 1);

      // Speak pronunciation
      speakEnglish(targetWord);

      if (completedWords > 0 && (completedWords + 1) % 5 === 0) {
        confetti({ particleCount: 50, spread: 60 });
      }
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setIsSuccess(false);
    setUserInput('');
    setRevealedLetters(0);
    setShowFullHint(false);

    if (currentIndex < SPELLING_WORDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleGiveHintLetter = () => {
    sounds.playClick();
    if (revealedLetters < targetWord.length) {
      const nextCount = revealedLetters + 1;
      setRevealedLetters(nextCount);
      setUserInput(targetWord.slice(0, nextCount));
      if (nextCount === targetWord.length) {
        handleInputChange(targetWord);
      }
    }
  };

  // Virtual keyboard buttons (quick letters)
  const lettersAvailable = Array.from(new Set(targetWord.toUpperCase().split(''))).sort();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-3xl p-5 mb-6 shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 className="font-heading text-xl font-bold">Mistrz Pisowni na 6!</h2>
          </div>
          <p className="text-sm text-teal-100">
            Wpisz poprawnie angielskie słowo bez literówki. To gwarancja 100% na kartkówce!
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-amber-300">{currentIndex + 1} / {SPELLING_WORDS.length}</div>
          <div className="text-xs text-teal-200">słówek</div>
        </div>
      </div>

      {/* Main interactive spelling card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-100 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
          Przetłumacz na angielski
        </span>

        {/* Polish word prompt */}
        <h3 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
          {currentItem.promptPl}
        </h3>

        {/* Word length boxes visual */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-2 my-6 flex-wrap">
          {targetWord.split('').map((char, index) => {
            const userChar = userInput[index] || '';
            const isFilled = index < userInput.length;
            const isMatching = isFilled && userChar.toLowerCase() === char.toLowerCase();

            return (
              <div
                key={index}
                className={`w-9 h-12 sm:w-11 sm:h-14 rounded-xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                  isSuccess
                    ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                    : isFilled
                    ? isMatching
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-slate-50 border-slate-300 text-slate-400'
                }`}
              >
                {char === "'" ? "'" : isFilled ? userChar : index < revealedLetters ? targetWord[index] : ''}
              </div>
            );
          })}
        </div>

        {/* Input field */}
        <div className="max-w-md mx-auto mb-5">
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={isSuccess}
            placeholder="Wpisz słówko tutaj..."
            autoFocus
            className={`w-full px-5 py-3 text-center text-xl font-bold rounded-2xl border-2 focus:outline-none transition-all ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-slate-50 border-slate-300 focus:border-indigo-500 focus:bg-white text-slate-800'
            }`}
          />
        </div>

        {/* Quick Letter helper chips */}
        <div className="flex items-center justify-center gap-1.5 mb-6 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold mr-1">Litery:</span>
          {lettersAvailable.map((char, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isSuccess && userInput.length < targetWord.length) {
                  const nextChar = targetWord[userInput.length] === targetWord[userInput.length].toUpperCase() ? char.toUpperCase() : char.toLowerCase();
                  handleInputChange(userInput + nextChar);
                }
              }}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 border border-slate-200 text-slate-700 font-bold text-sm transition-all active:scale-90"
            >
              {char}
            </button>
          ))}
          {targetWord.includes("'") && (
            <button
              onClick={() => {
                if (!isSuccess && userInput.length < targetWord.length) {
                  handleInputChange(userInput + "'");
                }
              }}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 border border-slate-200 font-bold text-sm"
            >
              '
            </button>
          )}
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl p-4 mb-6 animate-bounce">
            <div className="flex items-center justify-center gap-2 text-lg font-black mb-1">
              <Check className="w-6 h-6 text-emerald-600" />
              <span>Brawo! Bezbłędna pisownia!</span>
            </div>
            <p className="text-sm">Poprawnie: <strong>{targetWord}</strong></p>
          </div>
        )}

        {/* Hint Box */}
        {showFullHint && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3 text-xs sm:text-sm mb-5">
            💡 Podpowiedź: {currentItem.hint}
          </div>
        )}

        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => speakEnglish(targetWord)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center gap-2 border border-indigo-200"
            title="Posłuchaj wymowy"
          >
            <Volume2 className="w-4 h-4" /> Posłuchaj
          </button>

          {!isSuccess && (
            <>
              <button
                onClick={handleGiveHintLetter}
                className="px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-sm flex items-center gap-1.5 border border-amber-200"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" /> Odkryj 1 literę
              </button>
              <button
                onClick={() => setShowFullHint(!showFullHint)}
                className="px-3 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                {showFullHint ? 'Ukryj podpowiedź' : 'Wskazówka'}
              </button>
            </>
          )}

          {isSuccess && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Następne słówko</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
