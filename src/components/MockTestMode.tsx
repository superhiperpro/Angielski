import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, Clock, RotateCcw, Flame, Sparkles, BookOpen } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/curriculumData';
import { sounds, speakEnglish } from '../utils/audio';

interface MockTestModeProps {
  onEarnStar: (count?: number) => void;
}

export const MockTestMode: React.FC<MockTestModeProps> = ({ onEarnStar }) => {
  const [testQuestions, setTestQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Initialize 12-question balanced mock test
  const startNewTest = () => {
    // Pick questions across categories
    const categories = ['to_be', 'possessive', 'countries', 'family', 'phrases', 'tree'] as const;
    let selected: QuizQuestion[] = [];

    categories.forEach(cat => {
      const match = QUIZ_QUESTIONS.filter(q => q.category === cat).sort(() => Math.random() - 0.5);
      selected = selected.concat(match.slice(0, 2));
    });

    // If less than 12, fill up from others
    if (selected.length < 12) {
      const rest = QUIZ_QUESTIONS.filter(q => !selected.some(s => s.id === q.id)).sort(() => Math.random() - 0.5);
      selected = selected.concat(rest.slice(0, 12 - selected.length));
    }

    setTestQuestions(selected.sort(() => Math.random() - 0.5));
    setAnswers({});
    setIsSubmitted(false);
    setTimeSpent(0);
    setIsActive(true);
  };

  useEffect(() => {
    startNewTest();
  }, []);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isActive && !isSubmitted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isSubmitted]);

  const handleSelectAnswer = (qIndex: number, option: string) => {
    if (isSubmitted) return;
    sounds.playClick();
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    sounds.playFanfare();
    setIsSubmitted(true);
    setIsActive(false);

    // Calculate score
    let correctCount = 0;
    testQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / testQuestions.length) * 100);
    if (percent >= 85) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onEarnStar(5);
    } else {
      onEarnStar(2);
    }
  };

  // Grade calculator in Polish system (1 - 6)
  const calculateGrade = () => {
    let correct = 0;
    testQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });
    const percentage = (correct / testQuestions.length) * 100;

    if (percentage === 100) return { grade: '6 (Celujący!)', title: 'Mistrz Angielskiego!', color: 'text-amber-500', badge: 'bg-amber-100 text-amber-800' };
    if (percentage >= 85) return { grade: '5 (Bardzo Dobry!)', title: 'Rewelacyjnie!', color: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-800' };
    if (percentage >= 70) return { grade: '4 (Dobry)', title: 'Dobra robota!', color: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' };
    if (percentage >= 50) return { grade: '3 (Dostateczny)', title: 'Zdasz, ale powtórz jeszcze!', color: 'text-orange-600', badge: 'bg-orange-100 text-orange-800' };
    return { grade: '2 (Poćwicz jeszcze!)', title: 'Zrób jeszcze jedną powtórkę!', color: 'text-rose-600', badge: 'bg-rose-100 text-rose-800' };
  };

  const correctAnswersCount = testQuestions.filter((q, idx) => answers[idx] === q.correctAnswer).length;
  const gradeInfo = isSubmitted ? calculateGrade() : null;

  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl p-5 mb-6 shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-200" />
            <h2 className="font-heading text-xl font-bold">Symulator Szkolnej Kartkówki</h2>
          </div>
          <p className="text-sm text-amber-100">
            Prawdziwy test z 12 pytaniami ze wszystkich tematów z podręcznika. Sprawdź swoją ocenę!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-2xl text-xs font-mono font-bold">
          <Clock className="w-4 h-4" />
          <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      </div>

      {/* Progress & Answers counter */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4 px-2">
        <span>Odpowiedziano: {answeredCount} z {testQuestions.length}</span>
        <span>{isSubmitted ? 'Test zakończony' : 'Test w toku...'}</span>
      </div>

      {/* Results Card after submit */}
      {isSubmitted && gradeInfo && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 mb-8 text-center animate-fadeIn">
          <div className="text-5xl mb-2">🎓</div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2 ${gradeInfo.badge}`}>
            Twoja ocena szkolna
          </span>
          <h3 className={`text-4xl sm:text-5xl font-black mb-2 font-heading ${gradeInfo.color}`}>
            {gradeInfo.grade}
          </h3>
          <p className="text-lg font-bold text-slate-700 mb-1">{gradeInfo.title}</p>
          <p className="text-slate-500 text-sm mb-6">
            Zdobyte punkty: <strong className="text-slate-900">{correctAnswersCount}</strong> na {testQuestions.length} ({Math.round((correctAnswersCount / testQuestions.length) * 100)}%) w czasie {minutes}m {seconds}s.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startNewTest}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Rozwiąż nową wersję kartkówki
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6 mb-8">
        {testQuestions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = isSubmitted && userAnswer === q.correctAnswer;
          const isWrong = isSubmitted && userAnswer && userAnswer !== q.correctAnswer;

          return (
            <div
              key={q.id || idx}
              className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-sm ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isWrong
                    ? 'border-rose-300 bg-rose-50/20'
                    : 'border-amber-200'
                  : userAnswer
                  ? 'border-indigo-300 ring-2 ring-indigo-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Zadanie {idx + 1}
                </span>
                {isSubmitted && (
                  <span className="flex items-center gap-1 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Poprawnie (+1 pkt)
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Błąd
                      </span>
                    )}
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-4">
                {q.prompt}
              </h4>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === opt;
                  const isThisCorrect = isSubmitted && opt === q.correctAnswer;

                  let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (isSelected && !isSubmitted) {
                    style = 'bg-indigo-600 text-white border-indigo-700 font-bold';
                  }

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      style = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-300';
                    } else if (isSelected && !isThisCorrect) {
                      style = 'bg-rose-100 border-rose-500 text-rose-900 line-through';
                    } else {
                      style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectAnswer(idx, opt)}
                      className={`p-3 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isThisCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Review explanation */}
              {isSubmitted && !isCorrect && (
                <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  💡 <strong>Wyjaśnienie:</strong> Poprawna odpowiedź to <strong>&ldquo;{q.correctAnswer}&rdquo;</strong>. {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-3xl border-2 border-indigo-200 shadow-xl flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-600">
            {answeredCount === testQuestions.length ? (
              <span className="text-emerald-600 font-bold">Wszystkie pytania zaznaczone! Gotowy na wynik?</span>
            ) : (
              <span>Zaznaczono {answeredCount} z {testQuestions.length} pytań</span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-md transition-transform active:scale-95"
          >
            Sprawdź i wystaw ocenę! 📝
          </button>
        </div>
      )}
    </div>
  );
};
