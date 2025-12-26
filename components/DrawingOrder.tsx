
import React from 'react';
import { ListOrdered } from 'lucide-react';

interface DrawingOrderProps {
  drawnNumbers: number[];
}

const DrawingOrder: React.FC<DrawingOrderProps> = ({ drawnNumbers }) => {
  if (drawnNumbers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-slate-300 dark:text-slate-700">
        <ListOrdered size={48} className="mb-4 opacity-20" />
        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Nenhum número sorteado ainda</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-10 gap-1.5">
        {[...drawnNumbers].map((num, index) => {
          const isLatest = index === drawnNumbers.length - 1;
          
          return (
            <div 
              key={`${num}-${index}`}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-base sm:text-xl font-black transition-all duration-300 relative
                ${isLatest 
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white scale-110 shadow-lg z-10 ring-2 ring-indigo-200 dark:ring-indigo-900/30' 
                  : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-indigo-600 dark:text-indigo-400'}
              `}
            >
              {num}
              {isLatest && (
                <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500 border border-white dark:border-slate-900"></span>
                </div>
              )}
              {/* Indicador de ordem reduzido e movido para o canto extremo */}
              <div className="absolute bottom-0.5 right-0.5 text-[5.5px] leading-none font-bold text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-900/80 px-0.5 py-0.5 rounded-[2px] pointer-events-none">
                #{index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrawingOrder;
