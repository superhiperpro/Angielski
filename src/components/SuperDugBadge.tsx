import React, { useState } from 'react';
import { Sparkles, MessageCircle, Volume2, X } from 'lucide-react';
import { speakEnglish, sounds } from '../utils/audio';

export const SuperDugBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    { en: "I'm Superdug! Be careful with 'daughter' - d-a-u-g-h-t-e-r!", pl: "Uważaj na pisownię 'daughter'!" },
    { en: "Dad's British and Mum is Polish!", pl: "Pamiętaj: narodowości zawsze z wielkiej litery!" },
    { en: "Dug is not French. Dug isn't French!", pl: "is not = isn't, are not = aren't!" },
    { en: "Hold this, please! I've got it!", pl: "Przydatne zwroty z historyjki o urodzinach Babci Sophie!" },
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    sounds.playClick();
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const current = tips[currentTipIndex];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white border-2 border-amber-400 rounded-3xl p-4 shadow-2xl max-w-xs sm:max-w-sm mb-2 animate-fadeIn relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🦸‍♂️🐶</span>
            <div>
              <span className="font-heading font-black text-sm text-slate-800">Super-Dug mówi:</span>
              <span className="block text-[10px] text-amber-600 font-bold uppercase tracking-wider">Maskotka z komiksu Unit 1</span>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 mb-3">
            <p className="font-bold mb-1">&ldquo;{current.en}&rdquo;</p>
            <p className="text-[11px] text-amber-700">{current.pl}</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => speakEnglish(current.en)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" /> Posłuchaj Duga
            </button>
            <button
              onClick={handleNextTip}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600"
            >
              Inna rada &rarr;
            </button>
          </div>
        </div>
      ) : null}

      {/* Floating trigger button */}
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-white"
      >
        <span className="text-xl">🐶</span>
        <span className="text-sm font-heading font-black hidden sm:inline">Rada od Super-Duga</span>
        <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
      </button>
    </div>
  );
};
