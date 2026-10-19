import React, { useState } from 'react';
import { Lightbulb, Sparkles, ArrowRight, CheckCircle2, RefreshCw, Volume2, HelpCircle, Puzzle, Eye } from 'lucide-react';
import { speakEnglish, sounds } from '../utils/audio';

interface UnderstandingModeProps {
  onEarnStar: () => void;
}

export const UnderstandingMode: React.FC<UnderstandingModeProps> = ({ onEarnStar }) => {
  const [activeSubTab, setActiveSubTab] = useState<'substitution' | 'apostrophe' | 'builder' | 'hisHer'>('substitution');

  // Interactive Substitution Tool: "Kto to jest pod spodem?"
  const substitutionExamples = [
    {
      subject: "Jen and Alex",
      context: "Jen and Alex ___ at their Granny's house.",
      pronoun: "THEY (oni)",
      pronounExplanation: "To dwie osoby! Razem to 'oni' (they).",
      verb: "are",
      verbShort: "They're",
      fullSentence: "Jen and Alex are at their Granny's house.",
      trap: "Częsty błąd dziecka: widzi samo Alex i myśli, że to jedna osoba ('is') albo nie wie co wybrać. Skoro są dwie osoby = THEY = ARE!"
    },
    {
      subject: "Basia and I",
      context: "Basia and I ___ classmates.",
      pronoun: "WE (my)",
      pronounExplanation: "Basia i ja to razem 'MY' (we)!",
      verb: "are",
      verbShort: "We're",
      fullSentence: "Basia and I are classmates.",
      trap: "NAJWIĘKSZA PUŁAPKA W SZKOLE! Dzieci widzą 'I' na końcu i z automatu wpisują 'am'. Ale Basia + ja = MY (we), więc musi być ARE!"
    },
    {
      subject: "My brother",
      context: "My brother ___ eleven years old.",
      pronoun: "HE (on)",
      pronounExplanation: "Brat to jeden chłopak = ON (he).",
      verb: "is",
      verbShort: "He's",
      fullSentence: "My brother is eleven years old.",
      trap: "Jeden chłopak lub jedna dziewczyna to zawsze IS!"
    },
    {
      subject: "Dug's parents",
      context: "Dug's parents ___ superheroes.",
      pronoun: "THEY (oni)",
      pronounExplanation: "Parents = mama i tata (rodzice, liczba mnoga) = ONI (they).",
      verb: "aren't (are not)",
      verbShort: "aren't",
      fullSentence: "Dug's parents aren't superheroes.",
      trap: "Słowo 'parents' kończy się na 's' - to liczba mnoga, więc nie może być 'isn't', tylko 'aren't'!"
    },
    {
      subject: "Aunt Julia",
      context: "Aunt Julia ___ Paul's sister.",
      pronoun: "SHE (ona)",
      pronounExplanation: "Ciocia to jedna kobieta = ONA (she).",
      verb: "is",
      verbShort: "She's",
      fullSentence: "Aunt Julia is Paul's sister.",
      trap: "Jedna kobieta = she = is."
    }
  ];

  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Interactive Sentence Builder (Lego klocki)
  const [builderSubject, setBuilderSubject] = useState<string | null>(null);
  const [builderVerb, setBuilderVerb] = useState<string | null>(null);
  const [builderRest, setBuilderRest] = useState<string | null>(null);
  const [builderFeedback, setBuilderFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const subjects = [
    { label: "I (ja)", correctVerbs: ["am", "'m", "'m not"], pronounType: 'I' },
    { label: "My dad (tata)", correctVerbs: ["is", "'s", "isn't"], pronounType: 'HE' },
    { label: "My mum (mama)", correctVerbs: ["is", "'s", "isn't"], pronounType: 'SHE' },
    { label: "Tom and Anna (kuzyni)", correctVerbs: ["are", "'re", "aren't"], pronounType: 'THEY' },
    { label: "We (my)", correctVerbs: ["are", "'re", "aren't"], pronounType: 'WE' },
  ];

  const verbs = [
    { label: "am ('m)", forType: ['I'] },
    { label: "is ('s)", forType: ['HE', 'SHE'] },
    { label: "are ('re)", forType: ['THEY', 'WE'] },
    { label: "isn't (nie jest)", forType: ['HE', 'SHE'] },
    { label: "aren't (nie są / nie jesteśmy)", forType: ['THEY', 'WE'] },
    { label: "'m not (nie jestem)", forType: ['I'] },
  ];

  const rests = [
    { label: "from Poland 🇵🇱", pl: "z Polski" },
    { label: "British 🇬🇧", pl: "Brytyjczykiem / Brytyjczykami" },
    { label: "ten years old 🎂", pl: "ma 10 lat" },
    { label: "at Granny's house 🏡", pl: "w domu babci" },
    { label: "ready for school! 🎒", pl: "gotowy do szkoły!" },
  ];

  const checkSentence = () => {
    if (!builderSubject || !builderVerb || !builderRest) return;

    const subjObj = subjects.find(s => s.label === builderSubject);
    const verbObj = verbs.find(v => v.label === builderVerb);

    if (subjObj && verbObj && verbObj.forType.includes(subjObj.pronounType)) {
      sounds.playCorrect();
      onEarnStar();
      const sentenceText = `${builderSubject.split(' ')[0]} ${builderVerb.split(' ')[0]} ${builderRest.split(' ')[0]} ${builderRest.split(' ')[1] || ''}`;
      setBuilderFeedback({
        isCorrect: true,
        text: `Brawo! To zdanie ma idealny sens gramatyczny!`
      });
      speakEnglish(sentenceText);
    } else {
      sounds.playWrong();
      setBuilderFeedback({
        isCorrect: false,
        text: `Ups! Do podmiotu "${builderSubject}" nie pasuje forma "${builderVerb}". Zastanów się: kim jest ta osoba?`
      });
    }
  };

  const currentSub = substitutionExamples[currentSubIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Hero explanation */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-6 h-6 text-yellow-200 animate-pulse" />
          <h2 className="font-heading text-2xl font-bold">Laboratorium Zrozumienia (AHA! Moment)</h2>
        </div>
        <p className="text-sm text-amber-100 max-w-2xl leading-relaxed">
          Nie ucz się na pamięć jak robot! Język angielski jest jak klocki LEGO – gdy poznasz 3 proste zasady, 
          żadne podchwytliwe pytanie pani od angielskiego Cię nie zaskoczy!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'substitution', label: '1. Trik Podmiany (Najważniejszy!)' },
          { id: 'apostrophe', label: '2. Po co jest apostrof (\')?' },
          { id: 'hisHer', label: '3. Magia HIS i HER' },
          { id: 'builder', label: '4. Klocki Zdań LEGO' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveSubTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md scale-102'
                : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode 1: Substitution Trick */}
      {activeSubTab === 'substitution' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-100 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Super-zasada nr 1 na kartkówkę
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">
              „Zmień trudne imiona w jedną prostą osobę!”
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dzieci często gubią się, gdy widzą: *„Jen and Alex”*, *„Basia and I”* albo *„Dug's parents”*.
              Kliknij poniższy klocek, aby zobaczyć, co kryje się pod spodem!
            </p>
          </div>

          {/* Big Interactive Card */}
          <div className="bg-gradient-to-br from-indigo-50/70 to-purple-50/70 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">Zdanie z podręcznika:</div>
            
            <div className="text-xl sm:text-3xl font-black text-slate-800 mb-6 font-mono">
              &ldquo;{currentSub.context}&rdquo;
            </div>

            {/* Clickable Card Transformation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
              <div className="bg-white border-2 border-indigo-300 p-4 rounded-2xl shadow-sm w-60">
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">Kogo widzisz w zdaniu?</div>
                <div className="text-xl font-black text-indigo-700">{currentSub.subject}</div>
              </div>

              <div className="text-2xl text-indigo-400">&rarr;</div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsRevealed(!isRevealed);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer w-60 ${
                  isRevealed
                    ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-md ring-4 ring-amber-100 scale-105'
                    : 'bg-white border-dashed border-amber-400 hover:bg-amber-50 text-amber-700'
                }`}
              >
                <div className="text-xs font-bold uppercase mb-1">
                  {isRevealed ? 'Kim oni są razem?' : 'Kliknij, aby odkryć!'}
                </div>
                <div className="text-xl font-black">
                  {isRevealed ? currentSub.pronoun : '❓ Kto to jest?'}
                </div>
              </button>
            </div>

            {/* Revealed Explanation */}
            {isRevealed && (
              <div className="bg-white rounded-2xl p-5 border-2 border-amber-300 text-left max-w-lg mx-auto shadow-sm animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Dlatego pasuje tylko forma: <strong className="text-xl font-mono text-indigo-700">{currentSub.verb}</strong>!</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  {currentSub.pronounExplanation}
                </p>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                  ⚠️ <strong>Częsty błąd:</strong> {currentSub.trap}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Całe zdanie:</span>
                  <button
                    onClick={() => speakEnglish(currentSub.fullSentence)}
                    className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Posłuchaj zdania
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation between examples */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-slate-400">
              Przykład {currentSubIndex + 1} z {substitutionExamples.length}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                setIsRevealed(false);
                setCurrentSubIndex((prev) => (prev + 1) % substitutionExamples.length);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2"
            >
              <span>Następny podchwytliwy przykład</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: The Secret of Apostrophe */}
      {activeSubTab === 'apostrophe' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-100 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Sekret Angielskich Skrótów
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">
              Dlaczego używamy apostrofu (&apos;)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Apostrof to nie jest ozdoba! To jest **„worek na wyrzuconą literkę”**. Anglicy mówią szybko, więc wyrzucają samogłoskę i stawiają apostrof!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual 1: isn't */}
            <div className="p-5 bg-purple-50 rounded-2xl border-2 border-purple-200">
              <span className="text-xs font-bold text-purple-700 uppercase">Przykład 1: Przeczenie</span>
              <div className="flex items-center justify-center gap-3 my-4">
                <span className="font-mono text-xl font-bold bg-white px-3 py-1.5 rounded-xl border border-purple-200">
                  is n<span className="text-rose-500 font-black line-through">o</span>t
                </span>
                <span className="text-2xl text-purple-500">&rarr;</span>
                <span className="font-mono text-xl font-black bg-purple-600 text-white px-4 py-1.5 rounded-xl shadow-md">
                  isn&apos;t
                </span>
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                👉 Wyrzuciliśmy literkę <strong>&bdquo;o&rdquo;</strong>, a na jej miejsce wskoczył apostrof <strong>&apos;</strong>! Dokładnie to samo dzieje się w <strong>aren&apos;t</strong> (are n<span className="line-through">o</span>t).
              </p>
            </div>

            {/* Visual 2: 'm not */}
            <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-200">
              <span className="text-xs font-bold text-amber-700 uppercase">Przykład 2: Dlaczego NIE MA &bdquo;am&apos;nt&rdquo;?</span>
              <div className="flex items-center justify-center gap-3 my-4">
                <span className="font-mono text-xl font-bold bg-white px-3 py-1.5 rounded-xl border border-amber-200">
                  <span className="text-rose-500 font-black line-through">a</span>m not
                </span>
                <span className="text-2xl text-amber-500">&rarr;</span>
                <span className="font-mono text-xl font-black bg-amber-500 text-white px-4 py-1.5 rounded-xl shadow-md">
                  I&apos;m not
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                👉 Przy <strong>I</strong> skracamy pierwsze słowo: wyrzucamy &bdquo;a&rdquo; z &bdquo;am&rdquo; i mówimy <strong>I&apos;m not</strong>. Nigdy nie mów &bdquo;am&apos;nt&rdquo; – to od razu minus 1 punkt na teście!
              </p>
            </div>

            {/* Visual 3: 's for possession */}
            <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-200 md:col-span-2">
              <span className="text-xs font-bold text-emerald-700 uppercase">Przykład 3: Apostrof jako haczyk własności (Saxon Genitive)</span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
                <div className="text-center">
                  <span className="text-2xl block mb-1">👴 Mark</span>
                  <span className="text-xs text-slate-500">Osoba</span>
                </div>
                <span className="text-3xl text-emerald-600 font-bold">+ &apos;s +</span>
                <div className="text-center">
                  <span className="text-2xl block mb-1">👨 Paul (father)</span>
                  <span className="text-xs text-slate-500">Tata</span>
                </div>
                <span className="text-2xl text-emerald-500">&rarr;</span>
                <div className="bg-emerald-600 text-white font-mono font-black text-lg px-4 py-2 rounded-2xl shadow-md">
                  Mark&apos;s father
                </div>
              </div>
              <p className="text-xs text-emerald-900 text-center">
                Apostrof z literką <strong>&apos;s</strong> to jak haczyk z wędki: <strong>Mark&apos;s father</strong> oznacza &bdquo;Ojciec [należący do kogo?] Marka&rdquo;. Dokładnie tak samo jak <strong>Granny&apos;s birthday</strong> (Urodziny Babci)!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: HIS vs HER */}
      {activeSubTab === 'hisHer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-100 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
              Chłopak czy Dziewczyna?
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">
              Jak nigdy nie pomylić HIS i HER?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              To najczęstsza pomyłka u 10-latków na kartkówkach z Unit 1.2!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* HIS */}
            <div className="bg-blue-50 border-4 border-blue-200 rounded-3xl p-6 text-center">
              <div className="text-5xl mb-2">👦</div>
              <div className="font-heading font-black text-3xl text-blue-700 mb-1">HIS</div>
              <div className="text-xs uppercase font-bold text-blue-500 mb-3">JEGO (dla chłopca / mężczyzny)</div>
              
              <div className="bg-white p-3.5 rounded-2xl border border-blue-200 text-xs sm:text-sm text-blue-900 mb-3 text-left">
                💡 <strong>Mnemotechnika:</strong> <span className="font-bold">hiS</span> ma na końcu <strong>S</strong> jak <strong>Syn</strong>!
              </div>

              <div className="p-3 bg-white/80 rounded-xl text-xs font-mono text-slate-700 italic">
                &ldquo;Jason is in Spain with <strong>his</strong> class.&rdquo;
              </div>
            </div>

            {/* HER */}
            <div className="bg-pink-50 border-4 border-pink-200 rounded-3xl p-6 text-center">
              <div className="text-5xl mb-2">👧</div>
              <div className="font-heading font-black text-3xl text-pink-700 mb-1">HER</div>
              <div className="text-xs uppercase font-bold text-pink-500 mb-3">JEJ (dla dziewczynki / kobiety)</div>
              
              <div className="bg-white p-3.5 rounded-2xl border border-pink-200 text-xs sm:text-sm text-pink-900 mb-3 text-left">
                💡 <strong>Mnemotechnika:</strong> <span className="font-bold">HER</span> to po angielsku <strong>Ona</strong> w dopełniaczu (dla Sophie, dla Mamy, dla Babci)!
              </div>

              <div className="p-3 bg-white/80 rounded-xl text-xs font-mono text-slate-700 italic">
                &ldquo;It&apos;s Sophie&apos;s birthday. We are at <strong>her</strong> house.&rdquo;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: Sentence Builder LEGO */}
      {activeSubTab === 'builder' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-100 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Kreator Zdań
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">
              Układaj zdania z klocków LEGO!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Wybierz osobę, odpowiednią formę &bdquo;to be&rdquo; i resztę zdania. Sprawdź, czy pasują do siebie jak puzzle!
            </p>
          </div>

          {/* Builder Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            {/* Slot 1: Person */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">1. Wybierz Osobę</div>
              <div className="space-y-1.5">
                {subjects.map(s => (
                  <button
                    key={s.label}
                    onClick={() => { sounds.playClick(); setBuilderSubject(s.label); setBuilderFeedback(null); }}
                    className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                      builderSubject === s.label
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-blue-50 text-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 2: Verb */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">2. Wybierz Czasownik</div>
              <div className="space-y-1.5">
                {verbs.map(v => (
                  <button
                    key={v.label}
                    onClick={() => { sounds.playClick(); setBuilderVerb(v.label); setBuilderFeedback(null); }}
                    className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                      builderVerb === v.label
                        ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-purple-50 text-slate-700'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 3: Rest */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">3. Dokończ Zdanie</div>
              <div className="space-y-1.5">
                {rests.map(r => (
                  <button
                    key={r.label}
                    onClick={() => { sounds.playClick(); setBuilderRest(r.label); setBuilderFeedback(null); }}
                    className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                      builderRest === r.label
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 text-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Constructed Sentence Preview */}
          <div className="p-4 bg-slate-100 rounded-2xl text-center border border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Twoje zbudowane zdanie:</span>
            <div className="text-lg sm:text-2xl font-black text-slate-800 font-mono">
              {builderSubject ? builderSubject.split(' ')[0] : '___'}{' '}
              <span className="text-purple-600">{builderVerb ? builderVerb.split(' ')[0] : '___'}</span>{' '}
              <span className="text-emerald-700">{builderRest ? builderRest : '___'}</span>
            </div>
          </div>

          {/* Feedback */}
          {builderFeedback && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-2 ${
              builderFeedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="text-xl">{builderFeedback.isCorrect ? '🎉' : '❌'}</span>
              <span>{builderFeedback.text}</span>
            </div>
          )}

          {/* Check Button */}
          <div className="flex justify-center">
            <button
              disabled={!builderSubject || !builderVerb || !builderRest}
              onClick={checkSentence}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm shadow-md transition-all ${
                builderSubject && builderVerb && builderRest
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Sprawdź to zdanie! 🧩
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
