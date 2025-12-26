
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Moon, Sun, LayoutGrid, ListOrdered, Eye, ChevronLeft } from 'lucide-react';
import NumberDisplay from './components/NumberDisplay';
import Controls from './components/Controls';
import RecentNumbers from './components/RecentNumbers';
import HistoryGrid from './components/HistoryGrid';
import DrawingOrder from './components/DrawingOrder';

const App: React.FC = () => {
  const [totalNumbers, setTotalNumbers] = useState(75);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(
    Array.from({ length: 75 }, (_, i) => i + 1)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(3);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'main' | 'history'>('main');
  const [historyView, setHistoryView] = useState<'grid' | 'order'>('grid');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Atualiza os números disponíveis quando o total muda (apenas se o jogo não tiver começado)
  useEffect(() => {
    if (drawnNumbers.length === 0) {
      setAvailableNumbers(Array.from({ length: totalNumbers }, (_, i) => i + 1));
    }
  }, [totalNumbers, drawnNumbers.length]);

  const drawNewNumber = useCallback(() => {
    if (availableNumbers.length === 0) {
      setIsPlaying(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selectedNumber = availableNumbers[randomIndex];

    setCurrentNumber(selectedNumber);
    setDrawnNumbers((prev) => [...prev, selectedNumber]);
    setAvailableNumbers((prev) => prev.filter((n) => n !== selectedNumber));
  }, [availableNumbers]);

  useEffect(() => {
    if (isPlaying && availableNumbers.length > 0) {
      timerRef.current = setInterval(() => {
        drawNewNumber();
      }, intervalSeconds * 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, intervalSeconds, drawNewNumber, availableNumbers.length]);

  const togglePlay = () => {
    if (availableNumbers.length === 0 && !isPlaying) {
      resetGame();
      return;
    }
    if (!isPlaying && drawnNumbers.length === 0) {
      drawNewNumber();
    }
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setDrawnNumbers([]);
    setAvailableNumbers(Array.from({ length: totalNumbers }, (_, i) => i + 1));
    setCurrentNumber(null);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // O seletor de quantidade deve ficar inativo se o jogo já começou ou tem números sorteados
  const isGameStarted = drawnNumbers.length > 0 || isPlaying;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 safe-top overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex items-center justify-between z-50">
        {viewMode === 'history' ? (
          <button 
            onClick={() => setViewMode('main')}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full active:scale-90 transition-all shadow-sm"
          >
            <ChevronLeft size={16} />
            Sorteio
          </button>
        ) : (
          <div className="w-16"></div>
        )}
        
        <h1 className="text-[11px] font-black tracking-[0.4em] text-slate-400 dark:text-slate-500 uppercase">
          {viewMode === 'main' ? 'BINGO' : 'PAINEL'}
        </h1>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 active:scale-90 transition-all"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {/* VIEW 1: MAIN FUNCTIONAL SCREEN */}
        <div className={`absolute inset-0 flex flex-col items-center px-4 gap-6 transition-all duration-500 ${viewMode === 'main' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="mt-2">
            <NumberDisplay number={currentNumber} />
          </div>
          
          <div className="w-full max-w-sm flex flex-col gap-6 px-2 overflow-y-auto no-scrollbar pb-6">
             <Controls 
              isPlaying={isPlaying} 
              onToggle={togglePlay} 
              onReset={resetGame} 
              interval={intervalSeconds} 
              onIntervalChange={setIntervalSeconds}
              totalNumbers={totalNumbers}
              onTotalNumbersChange={setTotalNumbers}
              isGameStarted={isGameStarted}
              disabled={availableNumbers.length === 0 && isPlaying}
            />

            <RecentNumbers history={drawnNumbers} />

            <button 
              onClick={() => setViewMode('history')}
              className="mt-2 mx-auto flex items-center gap-3 bg-white dark:bg-slate-900 px-8 py-5 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
            >
              <Eye size={18} className="text-indigo-500" />
              Painel Geral
            </button>
          </div>
        </div>

        {/* VIEW 2: FULL HISTORY SCREEN */}
        <div className={`absolute inset-0 flex flex-col px-4 transition-all duration-500 bg-slate-50 dark:bg-slate-950 ${viewMode === 'history' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="flex-1 flex flex-col gap-5 max-w-lg mx-auto w-full pt-4">
            {/* View Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 gap-1.5">
                <button 
                  onClick={() => setHistoryView('grid')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all ${historyView === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
                >
                  <LayoutGrid size={18} />
                  TABELA
                </button>
                <button 
                  onClick={() => setHistoryView('order')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all ${historyView === 'order' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
                >
                  <ListOrdered size={18} />
                  ORDEM
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-y-auto no-scrollbar mb-10">
              {historyView === 'grid' ? (
                <HistoryGrid drawnNumbers={drawnNumbers} total={totalNumbers} />
              ) : (
                <DrawingOrder drawnNumbers={drawnNumbers} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
