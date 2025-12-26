
import React from 'react';

interface RecentNumbersProps {
  history: number[];
}

const RecentNumbers: React.FC<RecentNumbersProps> = ({ history }) => {
  const lastFive = [...history].slice(0, -1).reverse().slice(0, 5);

  return (
    <div className="space-y-2">
      <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest text-center">Últimos 5 Números</h3>
      <div className="flex justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => {
          const num = lastFive[i];
          return (
            <div 
              key={i}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-black transition-all duration-500 border
                ${num 
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900 shadow-sm opacity-100 scale-100' 
                  : 'bg-slate-200/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-700 border-slate-200 dark:border-slate-800/50 opacity-100 scale-95'}
              `}
            >
              {num ? num.toString().padStart(2, '0') : '--'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentNumbers;
