import React from 'react';
import { TO_BE_RULES, VOCABULARY_LIST } from '../data/curriculumData';
import { Volume2, BookOpen, Lightbulb, Star, ShieldAlert } from 'lucide-react';
import { speakEnglish } from '../utils/audio';

export const CheatSheetMode: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Top Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-6 h-6 text-amber-300" />
          <h2 className="font-heading text-2xl font-bold">Pigułka Wiedzy na Kartkówkę (Unit 1)</h2>
        </div>
        <p className="text-sm text-blue-100 max-w-2xl">
          Wszystkie najważniejsze reguły, tabele i pułapki nauczycieli zebrane w jednym przejrzystym miejscu.
          Przeczytaj to na 15 minut przed sprawdzianem!
        </p>
      </div>

      {/* Section 1: TO BE Verb Table */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-indigo-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⚡</span>
          <h3 className="font-heading text-xl font-bold text-slate-800">
            Czasownik &ldquo;TO BE&rdquo; (Być) - Twierdzenia i Przeczenia
          </h3>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3.5 mb-4 text-xs sm:text-sm text-indigo-900 flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            <strong>Zasada 3 grup:</strong> Dla <strong>I</strong> jest <span className="underline font-bold">am</span>. Dla <strong>He, She, It</strong> jest <span className="underline font-bold">is</span>. Dla <strong>You, We, They</strong> jest <span className="underline font-bold">are</span>!
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Osoba</th>
                <th className="p-3">Twierdzenie (Długie)</th>
                <th className="p-3 text-indigo-700">Skrót (W mowie i teście)</th>
                <th className="p-3">Przeczenie (Długie)</th>
                <th className="p-3 text-rose-700">Skrót Przeczenia</th>
                <th className="p-3">Po polsku</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TO_BE_RULES.tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-800">{row.subject}</td>
                  <td className="p-3 font-mono text-slate-600">{row.affirmativeLong}</td>
                  <td className="p-3 font-mono font-bold text-indigo-600 bg-indigo-50/50">
                    <button
                      onClick={() => speakEnglish(row.affirmativeShort)}
                      className="inline-flex items-center gap-1 hover:text-indigo-800"
                      title="Posłuchaj"
                    >
                      {row.affirmativeShort}
                      <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{row.negativeLong}</td>
                  <td className="p-3 font-mono font-bold text-rose-600 bg-rose-50/50">
                    <button
                      onClick={() => speakEnglish(row.negativeShort)}
                      className="inline-flex items-center gap-1 hover:text-rose-800"
                      title="Posłuchaj"
                    >
                      {row.negativeShort}
                      <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  </td>
                  <td className="p-3 text-slate-500 italic">{row.translation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Super trap alert */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Uwaga na pułapkę nauczyciela:</strong> Przeczenie od &ldquo;I am not&rdquo; to <strong>&ldquo;I&apos;m not&rdquo;</strong>. Słowo &ldquo;am&apos;nt&rdquo; w angielskim w ogóle NIE istnieje!
          </span>
        </div>
      </div>

      {/* Section 2: Possessive Adjectives & Saxon Genitive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Possessive adjectives */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎯</span>
            <h3 className="font-heading text-lg font-bold text-slate-800">
              Zaimki dzierżawcze (Moje, Twoje, Jego, Jej)
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>I &rarr; <strong className="text-indigo-600 text-base">my</strong></span>
                <span className="text-xs text-slate-500">mój, moja, moje</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 italic">&ldquo;It&apos;s my birthday.&rdquo; (Moje urodziny)</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>you &rarr; <strong className="text-indigo-600 text-base">your</strong></span>
                <span className="text-xs text-slate-500">twój, twoja, wasz</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 italic">&ldquo;Here is your card!&rdquo; (Oto twoja kartka)</p>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200">
              <div className="font-bold text-blue-900 flex items-center justify-between">
                <span>he (chłopak) &rarr; <strong className="text-blue-600 text-base">his</strong></span>
                <span className="text-xs text-blue-700">jego</span>
              </div>
              <p className="text-xs text-blue-800 mt-1 italic">&ldquo;Jason is with his class.&rdquo; (Jason ze swoją klasą)</p>
            </div>

            <div className="p-3 bg-pink-50/70 rounded-2xl border border-pink-200">
              <div className="font-bold text-pink-900 flex items-center justify-between">
                <span>she (dziewczyna) &rarr; <strong className="text-pink-600 text-base">her</strong></span>
                <span className="text-xs text-pink-700">jej</span>
              </div>
              <p className="text-xs text-pink-800 mt-1 italic">&ldquo;We are at her house.&rdquo; (Jesteśmy w jej domu)</p>
            </div>
          </div>
        </div>

        {/* Saxon Genitive ('s) */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-emerald-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📎</span>
            <h3 className="font-heading text-lg font-bold text-slate-800">
              Dopełniacz saksoński: Apostrof i &apos;s
            </h3>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Dodajemy <strong>&apos;s</strong> do osoby, aby pokazać, że coś do niej należy lub kim dla niej ktoś jest:
          </p>

          <div className="space-y-2.5">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <span className="font-bold text-emerald-900">Mark&apos;s father</span>
              <span className="text-slate-500 ml-2">&rarr; Ojciec Marka</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <span className="font-bold text-emerald-900">Sophie&apos;s birthday</span>
              <span className="text-slate-500 ml-2">&rarr; Urodziny Sophie</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <span className="font-bold text-emerald-900">Lucy&apos;s brother</span>
              <span className="text-slate-500 ml-2">&rarr; Brat Lucy</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm">
              <span className="font-bold text-emerald-900">Paul&apos;s sister</span>
              <span className="text-slate-500 ml-2">&rarr; Siostra Paula (Julia)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Countries and Nationalities */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌍</span>
          <h3 className="font-heading text-xl font-bold text-slate-800">
            Kraje i Narodowości (Countries & Nationalities)
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-purple-900 mb-4 bg-purple-50 p-3 rounded-2xl border border-purple-200">
          ⭐ <strong>Złota zasada kartkówki:</strong> W języku angielskim narodowości (British, Polish, Spanish...) piszemy <strong>ZAWSZE WIELKĄ LITERĄ!</strong>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { flag: '🇬🇧', country: 'the UK', nat: 'British', pl: 'Wielka Brytania / Brytyjczyk' },
            { flag: '🇵🇱', country: 'Poland', nat: 'Polish', pl: 'Polska / Polak' },
            { flag: '🇪🇸', country: 'Spain', nat: 'Spanish', pl: 'Hiszpania / Hiszpan' },
            { flag: '🇮🇹', country: 'Italy', nat: 'Italian', pl: 'Włochy / Włoch' },
            { flag: '🇫🇷', country: 'France', nat: 'French', pl: 'Francja / Francuz' },
            { flag: '🇺🇸', country: 'the USA', nat: 'American', pl: 'USA / Amerykanin' },
            { flag: '🇨🇳', country: 'China', nat: 'Chinese', pl: 'Chiny / Chińczyk' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center text-center">
              <span className="text-3xl mb-1">{item.flag}</span>
              <span className="font-bold text-slate-800 text-sm">{item.country}</span>
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mt-1">
                {item.nat}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">{item.pl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Out of class phrases */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-teal-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💬</span>
          <h3 className="font-heading text-xl font-bold text-slate-800">
            Zwroty z lekcji (Out of Class)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
            <span className="text-xs font-bold text-teal-800 uppercase">Gdy prosisz o pomoc</span>
            <div className="text-base font-black text-teal-950 mt-1">&ldquo;Hold this, please!&rdquo;</div>
            <div className="text-xs text-slate-600 mt-1">Potrzymaj to, proszę!</div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-amber-800 uppercase">Gdy ostrzegasz kogoś</span>
            <div className="text-base font-black text-amber-950 mt-1">&ldquo;Be careful!&rdquo;</div>
            <div className="text-xs text-slate-600 mt-1">Uważaj! Bądź ostrożny!</div>
          </div>

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
            <span className="text-xs font-bold text-indigo-800 uppercase">Gdy opanujesz sytuację</span>
            <div className="text-base font-black text-indigo-950 mt-1">&ldquo;I&apos;ve got it!&rdquo;</div>
            <div className="text-xs text-slate-600 mt-1">Mam to! / Trzymam to! / Daję radę!</div>
          </div>
        </div>
      </div>
    </div>
  );
};
