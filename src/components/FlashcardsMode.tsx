import React, { useState } from 'react';
import { Volume2, RotateCw, CheckCircle2, RefreshCw, Sparkles, Snail, Flag, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { VOCABULARY_LIST, WordItem } from '../data/curriculumData';
import { speakEnglish, sounds } from '../utils/audio';

interface FlashcardsModeProps {
  onEarnStar: () => void;
}

export const FlashcardsMode: React.FC<FlashcardsModeProps> = ({ onEarnStar }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'family' | 'countries' | 'phrases'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [needPracticeIds, setNeedPracticeIds] = useState<Set<string>>(new Set());

  // Filter items
  const filteredWords = VOCABULARY_LIST.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const currentWord: WordItem | undefined = filteredWords[currentIndex] || filteredWords[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredWords.length - 1);
    }
  };

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleMarkLearned = () => {
    if (!currentWord) return;
    sounds.playCorrect();
    onEarnStar();
    setLearnedIds(prev => new Set(prev).add(currentWord.id));
    setNeedPracticeIds(prev => {
      const next = new Set(prev);
      next.delete(currentWord.id);
      return next;
    });
    handleNext();
  };

  const handleMarkNeedPractice = () => {
    if (!currentWord) return;
    sounds.playWrong();
    setNeedPracticeIds(prev => new Set(prev).add(currentWord.id));
    setLearnedIds(prev => {
      const next = new Set(prev);
      next.delete(currentWord.id);
      return next;
    });
    handleNext();
  };

  const handlePlayAudio = (e: React.MouseEvent, slow = false) => {
    e.stopPropagation();
    if (!currentWord) return;
    speakEnglish(currentWord.en, slow);
  };

  if (!currentWord) {
    return <div>Ładowanie słówek...</div>;
  }

  const isLearned = learnedIds.has(currentWord.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-3xl p-5 mb-6 shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 className="font-heading text-xl font-bold">Fiszki z Wymową Audio</h2>
          </div>
          <p className="text-sm text-indigo-100 max-w-xl">
            Najszybsza metoda zapamiętywania: spójrz na słówko, posłuchaj lektora, powtórz na głos i obróć kartę!
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-2xl font-black text-amber-300">{learnedIds.size} / {filteredWords.length}</div>
          <div className="text-xs text-indigo-200">opanowanych</div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {[
          { id: 'all', label: 'Wszystkie słówka' },
          { id: 'family', label: '👨‍👩‍👧‍👦 Rodzina (Family)' },
          { id: 'countries', label: '🌍 Kraje i Narodowości' },
          { id: 'phrases', label: '💬 Zwroty z lekcji' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id as any);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
        />
      </div>

      {/* Main Flashcard Container */}
      <div className="perspective-1000 mb-6">
        <div
          onClick={handleFlip}
          className={`relative min-h-[340px] w-full rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-500 transform shadow-xl border-4 ${
            isFlipped
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300'
              : 'bg-gradient-to-br from-white to-indigo-50/50 border-indigo-200 hover:border-indigo-400'
          }`}
        >
          {/* Card Top Badges */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {currentWord.tag || 'Słówko'}
              </span>
              {currentWord.flag && (
                <span className="text-xl" title="Flaga kraju">{currentWord.flag}</span>
              )}
              {isLearned && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Opanowane!
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-slate-400">
              Karta {currentIndex + 1} z {filteredWords.length}
            </span>
          </div>

          {/* Front vs Back Content */}
          {!isFlipped ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                Po angielsku
              </div>

              <div className="text-4xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                {currentWord.en}
              </div>

              {/* Audio Listen Buttons */}
              <div className="flex items-center gap-3 my-3">
                <button
                  onClick={(e) => handlePlayAudio(e, false)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-95"
                >
                  <Volume2 className="w-5 h-5" />
                  Posłuchaj wymowy
                </button>
                <button
                  onClick={(e) => handlePlayAudio(e, true)}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-2xl font-bold text-xs transition-colors"
                  title="Posłuchaj wolniej"
                >
                  <Snail className="w-4 h-4" />
                  Wolniej
                </button>
              </div>

              {currentWord.exampleEn && (
                <div className="mt-4 p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl max-w-md text-xs sm:text-sm text-indigo-900 italic">
                  &ldquo;{currentWord.exampleEn}&rdquo;
                </div>
              )}

              <div className="mt-6 flex items-center gap-1 text-slate-400 text-xs font-medium">
                <RotateCw className="w-3.5 h-3.5" />
                Dotknij lub kliknij, aby sprawdzić znaczenie
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
              <div className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">
                Po polsku
              </div>

              <div className="text-3xl sm:text-4xl font-black text-amber-900 mb-3">
                {currentWord.pl}
              </div>

              {currentWord.informalPair && (
                <div className="bg-amber-100/70 border border-amber-300 text-amber-900 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold my-2">
                  ⭐ Oficjalnie: <strong>{currentWord.informalPair.formal}</strong> ↔ Na co dzień: <strong>{currentWord.informalPair.informal}</strong>
                </div>
              )}

              {currentWord.tip && (
                <div className="bg-white/90 border border-amber-200 text-slate-700 px-4 py-2.5 rounded-2xl text-xs sm:text-sm max-w-md my-2 shadow-xs">
                  💡 <span className="font-bold text-amber-700">Wskazówka na kartkówkę:</span> {currentWord.tip}
                </div>
              )}

              {currentWord.examplePl && (
                <div className="p-3 bg-white/70 border border-amber-200 rounded-2xl max-w-md text-xs sm:text-sm text-slate-600 italic mt-2">
                  Przykładowe zdanie: &ldquo;{currentWord.examplePl}&rdquo;
                </div>
              )}

              <div className="mt-4 flex items-center gap-1 text-slate-400 text-xs font-medium">
                <RotateCw className="w-3.5 h-3.5" />
                Kliknij, aby odwrócić z powrotem
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decision and Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold shadow-xs transition-colors flex items-center gap-1"
            title="Poprzednie"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Wstecz</span>
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold shadow-xs transition-colors flex items-center gap-1"
            title="Następne"
          >
            <span className="hidden sm:inline text-sm">Dalej</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Learning status triggers */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleMarkNeedPractice}
            className="flex-1 sm:flex-none px-4 py-3 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-2xl font-bold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Muszę powtórzyć
          </button>
          <button
            onClick={handleMarkLearned}
            className="flex-1 sm:flex-none px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Już umiem! (+1 ⭐)
          </button>
        </div>
      </div>
    </div>
  );
};
