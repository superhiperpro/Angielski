import React, { useState } from 'react';
import { MARKS_FAMILY_TREE, FamilyTreeNode } from '../data/curriculumData';
import { speakEnglish, sounds } from '../utils/audio';
import { Users, Volume2, CheckCircle2, Sparkles, HelpCircle, Trophy } from 'lucide-react';

interface FamilyTreeModeProps {
  onEarnStar: () => void;
}

export const FamilyTreeMode: React.FC<FamilyTreeModeProps> = ({ onEarnStar }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'relationsQuiz' | 'heSheSort'>('tree');
  const [selectedPerson, setSelectedPerson] = useState<FamilyTreeNode | null>(
    MARKS_FAMILY_TREE.find(p => p.id === 'mark') || null
  );

  // Challenge 1: Relations Quiz (Page 5, Ex 5 & 6)
  const relationsExercises = [
    { id: 1, question: "Kim dla Marka jest John?", options: ["Mark's grandfather", "Mark's uncle", "Mark's father"], correct: "Mark's grandfather", expl: "John to dziadek Marka (ojciec jego taty Paula)." },
    { id: 2, question: "Kim dla Marka jest Julia?", options: ["Mark's aunt", "Mark's mother", "Mark's sister"], correct: "Mark's aunt", expl: "Julia to siostra taty, czyli ciocia Marka (aunt)." },
    { id: 3, question: "Kim dla Marka jest Peter?", options: ["Mark's uncle", "Mark's brother", "Mark's cousin"], correct: "Mark's uncle", expl: "Peter to mąż cioci Julii, czyli wujek Marka (uncle)." },
    { id: 4, question: "Kim dla Marka są Tom i Anna?", options: ["Mark's cousins", "Mark's brothers", "Mark's parents"], correct: "Mark's cousins", expl: "Tom i Anna to dzieci cioci Julii i wujka Petera, czyli kuzyni Marka (cousins)." },
    { id: 5, question: "Kim dla Marka jest Lucy?", options: ["Mark's sister", "Mark's aunt", "Mark's granny"], correct: "Mark's sister", expl: "Lucy to córka Paula i Rose, czyli rodzona siostra Marka (sister)." },
    { id: 6, question: "Kim dla Marka jest David?", options: ["Mark's brother", "Mark's father", "Mark's uncle"], correct: "Mark's brother", expl: "David to rodzony brat Marka (brother)." },
    { id: 7, question: "Kim dla Paula jest Rose?", options: ["Paul's wife", "Paul's sister", "Paul's mother"], correct: "Paul's wife", expl: "Rose to żona Paula i mama Marka, Davida i Lucy." },
    { id: 8, question: "Uzupełnij: Anna is Julia's ___", options: ["daughter", "son", "sister"], correct: "daughter", expl: "Anna to dziewczynka, więc jest córką Julii (daughter)." },
  ];

  const [relIndex, setRelIndex] = useState(0);
  const [relScore, setRelScore] = useState(0);
  const [relAnswer, setRelAnswer] = useState<string | null>(null);
  const [relFinished, setRelFinished] = useState(false);

  // Challenge 2: He vs She drag & click
  const heSheItems = [
    { name: 'father', gender: 'He' },
    { name: 'mother', gender: 'She' },
    { name: 'son', gender: 'He' },
    { name: 'daughter', gender: 'She' },
    { name: 'uncle', gender: 'He' },
    { name: 'aunt', gender: 'She' },
    { name: 'grandad', gender: 'He' },
    { name: 'granny', gender: 'She' },
    { name: 'brother', gender: 'He' },
    { name: 'sister', gender: 'She' },
  ];
  const [sortedHe, setSortedHe] = useState<string[]>([]);
  const [sortedShe, setSortedShe] = useState<string[]>([]);
  const [heShePool, setHeShePool] = useState(heSheItems);

  const handleSelectRelAnswer = (opt: string) => {
    if (relAnswer) return;
    setRelAnswer(opt);
    const curr = relationsExercises[relIndex];
    if (opt === curr.correct) {
      sounds.playCorrect();
      onEarnStar();
      setRelScore(prev => prev + 1);
    } else {
      sounds.playWrong();
    }
  };

  const handleNextRel = () => {
    sounds.playClick();
    if (relIndex < relationsExercises.length - 1) {
      setRelIndex(prev => prev + 1);
      setRelAnswer(null);
    } else {
      setRelFinished(true);
      sounds.playFanfare();
    }
  };

  const handleSortItem = (item: { name: string; gender: string }, target: 'He' | 'She') => {
    if (item.gender === target) {
      sounds.playCorrect();
      onEarnStar();
      if (target === 'He') setSortedHe(prev => [...prev, item.name]);
      else setSortedShe(prev => [...prev, item.name]);
      setHeShePool(prev => prev.filter(i => i.name !== item.name));
    } else {
      sounds.playWrong();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white rounded-3xl p-5 mb-6 shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-amber-300" />
            <h2 className="font-heading text-xl font-bold">Drzewo Genealogiczne Marka</h2>
          </div>
          <p className="text-sm text-purple-100">
            Dokładnie to drzewo znajduje się w podręczniku na stronach 10 i 11 (Unit 1.1)!
          </p>
        </div>
        <div className="hidden sm:block text-3xl">
          🌳
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => { sounds.playClick(); setActiveTab('tree'); }}
          className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'tree' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          🌳 Eksplorator Drzewa
        </button>
        <button
          onClick={() => { sounds.playClick(); setActiveTab('relationsQuiz'); }}
          className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'relationsQuiz' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          🎯 Quiz: Kto jest kim? (Zadanie z lekcji)
        </button>
        <button
          onClick={() => { sounds.playClick(); setActiveTab('heSheSort'); }}
          className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'heSheSort' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          ⚖️ Podział: He (on) vs She (ona)
        </button>
      </div>

      {/* Mode 1: Interactive Family Tree Map */}
      {activeTab === 'tree' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100 overflow-x-auto">
            <div className="min-w-[620px] text-center">
              {/* Generation 1: Grandparents */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Dziadkowie (Grandparents)
                </span>
                <div className="flex justify-center items-center gap-6 mt-3">
                  {MARKS_FAMILY_TREE.filter(p => p.generation === 1).map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedPerson(p);
                        speakEnglish(`${p.name} is ${p.role}`);
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center w-36 ${
                        selectedPerson?.id === p.id
                          ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-100 scale-105'
                          : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                      }`}
                    >
                      <span className="text-3xl mb-1">{p.avatarEmoji}</span>
                      <span className="font-bold text-slate-800 text-base">{p.name}</span>
                      <span className="text-xs text-purple-700 font-semibold">{p.relationToMark}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Connecting lines */}
              <div className="w-1/2 mx-auto border-t-2 border-dashed border-purple-300 my-2" />

              {/* Generation 2: Parents & Uncle/Aunt */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Rodzice i Wujostwo (Parents, Aunt, Uncle)
                </span>
                <div className="grid grid-cols-2 gap-8 mt-3">
                  {/* Peter & Julia */}
                  <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100">
                    <div className="text-xs font-bold text-purple-800 mb-2">Ciocia i Wujek (Aunt & Uncle)</div>
                    <div className="flex justify-center gap-3">
                      {['peter', 'julia'].map(id => {
                        const p = MARKS_FAMILY_TREE.find(item => item.id === id)!;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              sounds.playClick();
                              setSelectedPerson(p);
                              speakEnglish(`${p.name} is ${p.role}`);
                            }}
                            className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center w-28 ${
                              selectedPerson?.id === p.id
                                ? 'border-purple-600 bg-purple-100 scale-105 ring-2 ring-purple-300'
                                : 'border-slate-200 bg-white hover:border-purple-300'
                            }`}
                          >
                            <span className="text-2xl">{p.avatarEmoji}</span>
                            <span className="font-bold text-slate-800 text-sm">{p.name}</span>
                            <span className="text-[11px] text-purple-700">{p.relationToMark}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Paul & Rose */}
                  <div className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-800 mb-2">Rodzice Marka (Mark's Parents)</div>
                    <div className="flex justify-center gap-3">
                      {['paul', 'rose'].map(id => {
                        const p = MARKS_FAMILY_TREE.find(item => item.id === id)!;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              sounds.playClick();
                              setSelectedPerson(p);
                              speakEnglish(`${p.name} is ${p.role}`);
                            }}
                            className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center w-28 ${
                              selectedPerson?.id === p.id
                                ? 'border-indigo-600 bg-indigo-100 scale-105 ring-2 ring-indigo-300'
                                : 'border-slate-200 bg-white hover:border-indigo-300'
                            }`}
                          >
                            <span className="text-2xl">{p.avatarEmoji}</span>
                            <span className="font-bold text-slate-800 text-sm">{p.name}</span>
                            <span className="text-[11px] text-indigo-700">{p.relationToMark}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line */}
              <div className="w-3/4 mx-auto border-t-2 border-dashed border-purple-300 my-2" />

              {/* Generation 3: Children */}
              <div>
                <span className="text-xs font-bold uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Dzieci: Kuzyni i Rodzeństwo
                </span>
                <div className="grid grid-cols-2 gap-8 mt-3">
                  {/* Cousins: Tom & Anna */}
                  <div className="flex justify-center gap-3">
                    {['tom', 'anna'].map(id => {
                      const p = MARKS_FAMILY_TREE.find(item => item.id === id)!;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            sounds.playClick();
                            setSelectedPerson(p);
                            speakEnglish(`${p.name} is ${p.role}`);
                          }}
                          className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center w-28 ${
                            selectedPerson?.id === p.id
                              ? 'border-purple-600 bg-purple-100 scale-105 ring-2 ring-purple-300'
                              : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                          }`}
                        >
                          <span className="text-2xl">{p.avatarEmoji}</span>
                          <span className="font-bold text-slate-800 text-sm">{p.name}</span>
                          <span className="text-[11px] text-purple-700">cousin (kuzyn)</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mark, David & Lucy */}
                  <div className="flex justify-center gap-2">
                    {['mark', 'david', 'lucy'].map(id => {
                      const p = MARKS_FAMILY_TREE.find(item => item.id === id)!;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            sounds.playClick();
                            setSelectedPerson(p);
                            speakEnglish(`${p.name} is ${p.role}`);
                          }}
                          className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center w-24 ${
                            p.id === 'mark'
                              ? 'border-amber-500 bg-amber-50 shadow-sm'
                              : selectedPerson?.id === p.id
                              ? 'border-indigo-600 bg-indigo-100 scale-105'
                              : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <span className="text-2xl">{p.avatarEmoji}</span>
                          <span className="font-bold text-slate-800 text-sm">{p.name}</span>
                          <span className="text-[10px] text-slate-500">
                            {p.id === 'mark' ? 'Ja (Mark)' : p.relationToMark}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Card about selected person */}
          {selectedPerson && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedPerson.avatarEmoji}</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">{selectedPerson.name}</h4>
                  <p className="text-purple-800 font-bold">{selectedPerson.role}</p>
                  <p className="text-xs text-slate-600">{selectedPerson.rolePl}</p>
                </div>
              </div>

              <button
                onClick={() => speakEnglish(`${selectedPerson.name} is ${selectedPerson.role}`)}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-md flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" /> Posłuchaj zdania
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Relations Quiz */}
      {activeTab === 'relationsQuiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-100">
          {!relFinished ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Pytanie {relIndex + 1} z {relationsExercises.length}
                </span>
                <span className="text-sm font-bold text-amber-600 flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-500" /> Punkty: {relScore}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-6">
                {relationsExercises[relIndex].question}
              </h3>

              <div className="space-y-3 mb-6">
                {relationsExercises[relIndex].options.map((opt, i) => {
                  const isCorrect = opt === relationsExercises[relIndex].correct;
                  const isChosen = relAnswer === opt;

                  let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-purple-50';
                  if (relAnswer) {
                    if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    else if (isChosen) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                    else btnStyle = 'border-slate-200 opacity-50';
                  }

                  return (
                    <button
                      key={i}
                      disabled={!!relAnswer}
                      onClick={() => handleSelectRelAnswer(opt)}
                      className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {relAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {relAnswer && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 text-sm text-purple-900">
                  💡 <strong>Wyjaśnienie:</strong> {relationsExercises[relIndex].expl}
                </div>
              )}

              {relAnswer && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextRel}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95"
                  >
                    Dalej
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">Quiz z drzewa ukończony!</h3>
              <p className="text-slate-600 mb-6">
                Twój wynik: <strong className="text-purple-600 text-xl">{relScore}</strong> / {relationsExercises.length}
              </p>
              <button
                onClick={() => {
                  setRelIndex(0);
                  setRelScore(0);
                  setRelAnswer(null);
                  setRelFinished(false);
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md"
              >
                Rozwiąż jeszcze raz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: He vs She Sort */}
      {activeTab === 'heSheSort' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-100">
          <div className="text-center max-w-md mx-auto mb-6">
            <h3 className="text-xl font-bold text-slate-800">Dopasuj do He (on) lub She (ona)</h3>
            <p className="text-xs text-slate-500 mt-1">
              To zadanie 3 ze strony 5 podręcznika! Kliknij słówko, a potem wybierz, czy to mężczyzna (He) czy kobieta (She).
            </p>
          </div>

          {/* Remaining Pool */}
          {heShePool.length > 0 ? (
            <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold uppercase text-slate-400 mb-2 text-center">
                Słówka do posortowania:
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {heShePool.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 bg-white border-2 border-purple-200 px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                    <button
                      onClick={() => handleSortItem(item, 'He')}
                      className="px-2 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold rounded-lg"
                    >
                      He 👦
                    </button>
                    <button
                      onClick={() => handleSortItem(item, 'She')}
                      className="px-2 py-0.5 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold rounded-lg"
                    >
                      She 👧
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center text-emerald-900 font-bold mb-6">
              🎉 Wszystkie słówka zostały poprawnie posortowane! Świetna robota!
            </div>
          )}

          {/* Sorted Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* He Column */}
            <div className="bg-blue-50/70 border-2 border-blue-200 rounded-2xl p-4">
              <div className="flex items-center justify-between font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2">
                <span>👦 HE (rodzaj męski)</span>
                <span className="text-xs bg-blue-200 px-2 py-0.5 rounded-full">{sortedHe.length}</span>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[80px]">
                {sortedHe.map((w, idx) => (
                  <span key={idx} className="bg-white border border-blue-300 text-blue-900 px-3 py-1 rounded-xl text-sm font-bold shadow-xs">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* She Column */}
            <div className="bg-pink-50/70 border-2 border-pink-200 rounded-2xl p-4">
              <div className="flex items-center justify-between font-bold text-pink-800 mb-3 border-b border-pink-200 pb-2">
                <span>👧 SHE (rodzaj żeński)</span>
                <span className="text-xs bg-pink-200 px-2 py-0.5 rounded-full">{sortedShe.length}</span>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[80px]">
                {sortedShe.map((w, idx) => (
                  <span key={idx} className="bg-white border border-pink-300 text-pink-900 px-3 py-1 rounded-xl text-sm font-bold shadow-xs">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
