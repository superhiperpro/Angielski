import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle, XCircle, Volume2, ArrowRight, RotateCcw, Flame, Trophy, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/curriculumData';
import { sounds, speakEnglish } from '../utils/audio';

interface QuizBlitzProps {
  onEarnStar: (count?: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
}

export const QuizBlitzMode: React.FC<QuizBlitzProps> = ({
  onEarnStar,
  onIncrementStreak,
  onResetStreak,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pool, setPool] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [wrongAnswersList, setWrongAnswersList] = useState<QuizQuestion[]>([]);

  // Initialize pool of questions
  useEffect(() => {
    resetQuiz();
  }, [selectedCategory]);

  const resetQuiz = (onlyMistakes = false) => {
    let questions = onlyMistakes && wrongAnswersList.length > 0 ? [...wrongAnswersList] : [...QUIZ_QUESTIONS];

    if (!onlyMistakes && selectedCategory !== 'all') {
      questions = questions.filter(q => q.category === selectedCategory);
    }

    // Shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setRoundCompleted(false);
    if (!onlyMistakes) setWrongAnswersList([]);
  };

  const currentQ: QuizQuestion | undefined = pool[currentIndex];

  const handleSelectAnswer = (option: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      sounds.playCorrect();
      onEarnStar(1);
      onIncrementStreak();
      setScore(prev => prev + 1);
    } else {
      sounds.playWrong();
      onResetStreak();
      setWrongAnswersList(prev => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIndex < pool.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setRoundCompleted(true);
      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  if (!currentQ && !roundCompleted) {
    return <div className="text-center py-10 font-bold">Brak pytań w tej kategorii.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Category selector */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {[
          { id: 'all', label: 'Wszystkie tematy' },
          { id: 'to_be', label: '📝 Czasownik TO BE' },
          { id: 'possessive', label: '🎯 Zaimki (his/her/my)' },
          { id: 'countries', label: '🌍 Kraje i Narodowości' },
          { id: 'family', label: '👨‍👩‍👧‍👦 Rodzina' },
          { id: 'phrases', label: '💬 Zwroty z lekcji' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {!roundCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-100">
          {/* Header info */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Pytanie {currentIndex + 1} z {pool.length}
            </span>
            <span className="text-sm font-bold text-amber-600 flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" /> Wynik: {score} / {currentIndex + (isAnswered ? 1 : 0)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / pool.length) * 100}%` }}
            />
          </div>

          {/* Question Prompt */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                {currentQ.prompt}
              </h2>
              <button
                onClick={() => speakEnglish(currentQ.prompt)}
                className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors shrink-0"
                title="Przeczytaj po angielsku"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQ.correctAnswer;

              let btnClass = 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200 text-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-50 border-rose-500 text-rose-900 line-through ring-2 ring-rose-200';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(option)}
                  className={`p-4 rounded-2xl border-2 text-left font-semibold text-base transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-xs text-slate-600 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </span>
                  {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 border ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <span className="text-xl">
                {selectedAnswer === currentQ.correctAnswer ? '🎉' : '💡'}
              </span>
              <div>
                <p className="font-bold">
                  {selectedAnswer === currentQ.correctAnswer ? 'Świetnie! Dobra odpowiedź!' : 'Zapamiętaj na kartkówkę:'}
                </p>
                <p className="text-xs sm:text-sm mt-0.5">{currentQ.explanation}</p>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-base shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>{currentIndex < pool.length - 1 ? 'Następne pytanie' : 'Zobacz wynik rundy'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Round Completed Summary */
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-100 text-center animate-fadeIn">
          <div className="text-6xl mb-4">
            {score >= 9 ? '🏆' : score >= 7 ? '⭐' : '💪'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 font-heading">
            Runda ukończona!
          </h2>
          <p className="text-slate-600 mb-6">
            Twój wynik: <strong className="text-indigo-600 text-xl">{score}</strong> / {pool.length} punktów
          </p>

          <div className="inline-block bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-900 max-w-md">
            {score === 10 ? (
              <p>🌟 <strong>OCENA 6 (CELUJĄCY)!</strong> Jesteś w 100% gotowy na szkolną kartkówkę!</p>
            ) : score >= 8 ? (
              <p>🎉 <strong>Świetny wynik (Ocena 5)!</strong> Jeszcze mała powtórka i będzie 6 bez problemu!</p>
            ) : (
              <p>👍 <strong>Dobra robota!</strong> Przejrzyj pytania jeszcze raz, a jutro na kartkówce pójdzie gładko!</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => resetQuiz(false)}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Zagraj nową rundę
            </button>
            {wrongAnswersList.length > 0 && (
              <button
                onClick={() => resetQuiz(true)}
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" /> Popraw tylko błędy ({wrongAnswersList.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
