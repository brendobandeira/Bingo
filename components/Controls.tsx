
import React from 'react';
import { Play, Pause, RotateCcw, Lock } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onReset: () => void;
  interval: number;
  onIntervalChange: (val: number) => void;
  totalNumbers: number;
  onTotalNumbersChange: (val: number) => void;
  isGameStarted: boolean;
  disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  isPlaying, 
  onToggle, 
  onReset, 
  interval, 
  onIntervalChange,
  totalNumbers,
  onTotalNumbersChange,
  isGameStarted,
  disabled 
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-md border border-slate-100 dark:border-slate-800 flex flex-col gap-6 transition-colors duration-300">
      
      {/* Total Numbers Selector */}
      <div className={`
        flex flex-col gap-2.5 p-3 rounded-2xl transition-all duration-300 border
        ${isGameStarted 
          ? 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800/50 opacity-60 cursor-not-allowed' 
          : 'bg-transparent border-transparent opacity-100'}
      `}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Total de Números
            </span>
            {isGameStarted && <Lock size={10} className="text-slate-400 mb-0.5" />}
          </div>
          <span className={`
            text-xs font-black px-2.5 py-1 rounded-full transition-colors
            ${isGameStarted 
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500' 
              : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}
          `}>
            {totalNumbers}
          </span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="99" 
          disabled={isGameStarted}
          value={totalNumbers} 
          onChange={(e) => onTotalNumbersChange(parseInt(e.target.value))}
          className={`
            w-full h-2 rounded-lg appearance-none cursor-pointer transition-all
            ${isGameStarted 
              ? 'bg-slate-300 dark:bg-slate-800 accent-slate-400 pointer-events-none' 
              : 'bg-slate-200 dark:bg-slate-800 accent-indigo-600 dark:accent-indigo-400'}
          `}
        />
      </div>

      {/* Interval Selector */}
      <div className="flex flex-col gap-2.5 px-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Intervalo do Sorteio</span>
          <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">{interval}s</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={interval} 
          onChange={(e) => onIntervalChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={onReset}
          className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all rounded-2xl flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 font-black text-xs uppercase tracking-wider touch-manipulation"
        >
          <RotateCcw size={18} />
          Reset
        </button>
        
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`
            flex-[2] py-5 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all touch-manipulation
            ${isPlaying 
              ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' 
              : 'bg-indigo-600 dark:bg-indigo-500 text-white'}
            ${disabled ? 'opacity-50 grayscale' : ''}
          `}
        >
          {isPlaying ? (
            <>
              <Pause size={20} fill="currentColor" />
              Pausar
            </>
          ) : (
            <>
              <Play size={20} fill="currentColor" />
              Iniciar
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
