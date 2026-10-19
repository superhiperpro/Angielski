import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { UnderstandingMode } from './components/UnderstandingMode';
import { FlashcardsMode } from './components/FlashcardsMode';
import { QuizBlitzMode } from './components/QuizBlitzMode';
import { SpellingMode } from './components/SpellingMode';
import { FamilyTreeMode } from './components/FamilyTreeMode';
import { MockTestMode } from './components/MockTestMode';
import { CheatSheetMode } from './components/CheatSheetMode';
import { SuperDugBadge } from './components/SuperDugBadge';
import { Sparkles, Trophy, BookOpen, BrainCircuit, PenTool, Users, Award, FileText, CheckCircle2, Lightbulb } from 'lucide-react';
import { sounds } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('understanding');
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('angielski_stars');
    return saved ? parseInt(saved, 10) : 10; // Start with 10 bonus stars
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('angielski_streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Save progress
  useEffect(() => {
    localStorage.setItem('angielski_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('angielski_streak', streak.toString());
  }, [streak]);

  const handleEarnStar = (count = 1) => {
    setStars(prev => prev + count);
  };

  const handleIncrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const handleResetStreak = () => {
    setStreak(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stars={stars}
        streak={streak}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Quick Hub Ribbon */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center md:text-left">
              <span className="text-3xl">🚀</span>
              <div>
                <h1 className="font-heading font-black text-base sm:text-lg">
                  Ekspresowe przygotowanie do kartkówki (Podręcznik Unit 1)
                </h1>
                <p className="text-xs text-indigo-100">
                  Wykorzystaj metody szybkiej nauki: 1. Fiszki z wymową &rarr; 2. Quiz &rarr; 3. Pisownia &rarr; 4. Symulator na ocenę 6!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { sounds.playClick(); setActiveTab('mocktest'); }}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Award className="w-4 h-4" /> Sprawdź się na ocenę!
              </button>
            </div>
          </div>
        </div>

        {/* Tab Views */}
        <div className="mt-2">
          {activeTab === 'understanding' && (
            <UnderstandingMode onEarnStar={handleEarnStar} />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsMode onEarnStar={handleEarnStar} />
          )}

          {activeTab === 'quiz' && (
            <QuizBlitzMode
              onEarnStar={handleEarnStar}
              onIncrementStreak={handleIncrementStreak}
              onResetStreak={handleResetStreak}
            />
          )}

          {activeTab === 'spelling' && (
            <SpellingMode onEarnStar={handleEarnStar} />
          )}

          {activeTab === 'tree' && (
            <FamilyTreeMode onEarnStar={handleEarnStar} />
          )}

          {activeTab === 'mocktest' && (
            <MockTestMode onEarnStar={handleEarnStar} />
          )}

          {activeTab === 'cheatsheet' && (
            <CheatSheetMode />
          )}
        </div>
      </main>

      {/* Floating Superhero Dug Mascot */}
      <SuperDugBadge />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Angielski na 6! • Materiał na podstawie podręcznika: Unit 1 (Family and friends)</span>
          <span className="text-slate-400">Powodzenia na kartkówce! 🌟</span>
        </div>
      </footer>
    </div>
  );
}
