
import React from 'react';

interface HistoryGridProps {
  drawnNumbers: number[];
  total: number;
}

const HistoryGrid: React.FC<HistoryGridProps> = ({ drawnNumbers, total }) => {
  const numbers = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-10 gap-1.5">
      {numbers.map((num) => {
        const isDrawn = drawnNumbers.includes(num);
        const isLatest = drawnNumbers[drawnNumbers.length - 1] === num;
        
        return (
          <div
            key={num}
            className={`
              aspect-square rounded-lg flex items-center justify-center text-base sm:text-xl font-black transition-all duration-300
              ${isDrawn 
                ? (isLatest 
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white scale-110 shadow-lg ring-2 ring-indigo-200 dark:ring-indigo-900/30 z-10' 
                    : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50')
                : 'bg-slate-100/50 dark:bg-slate-950 text-slate-300 dark:text-slate-800 border border-slate-200 dark:border-slate-800/30'}
            `}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryGrid;
