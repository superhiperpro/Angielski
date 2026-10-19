import React from 'react';
import { Volume2, VolumeX, Flame, Star, Sparkles, BookOpen, BrainCircuit, PenTool, Users, Award, FileText, Lightbulb } from 'lucide-react';
import { sounds } from '../utils/audio';

export type ActiveTab = 'understanding' | 'flashcards' | 'quiz' | 'spelling' | 'tree' | 'mocktest' | 'cheatsheet';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  streak: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stars,
  streak,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setSoundEnabled(next);
    if (next) sounds.playClick();
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'understanding', label: 'Zrozum to! (AHA!)', icon: <Lightbulb className="w-4 h-4 text-amber-400" />, badge: 'Baza' },
    { id: 'flashcards', label: 'Fiszki z Wymową', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quiz', label: 'Trening Blitz', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'spelling', label: 'Pisownia na 6', icon: <PenTool className="w-4 h-4" /> },
    { id: 'tree', label: 'Drzewo Rodziny', icon: <Users className="w-4 h-4" />, badge: 'Zad. 1&5' },
    { id: 'mocktest', label: 'Symulator Kartkówki', icon: <Award className="w-4 h-4" />, badge: 'Egzamin' },
    { id: 'cheatsheet', label: 'Ściągawka', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white border-b border-indigo-100 shadow-sm sticky top-0 z-40">
      {/* Top bar with stats & branding */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:rotate-6 transition-transform">
            🐶
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg md:text-xl text-slate-800 tracking-tight">
                Angielski na <span className="text-amber-500">6!</span>
              </span>
              <span className="hidden sm:inline-block text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                Unit 1: Family & Friends
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Super-trener szybkiej nauki do szkolnej kartkówki dla 10-latka
            </p>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-bold text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{stars} <span className="text-xs font-normal text-amber-600 hidden sm:inline">gwiazdek</span></span>
          </div>

          <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full font-bold text-sm shadow-xs">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-600" />
            <span>{streak} <span className="text-xs font-normal text-orange-600 hidden sm:inline">combo</span></span>
          </div>

          <button
            onClick={toggleSound}
            aria-label="Włącz / wyłącz dźwięk"
            className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors border border-slate-200"
            title={soundEnabled ? 'Dźwięk włączony' : 'Dźwięk wyciszony'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Mode navigation bar */}
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 sm:space-x-2 py-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(item.id);
                }}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-heading text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-200 scale-102'
                    : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isActive ? 'bg-amber-400 text-slate-900' : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
