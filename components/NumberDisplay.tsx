
import React, { useEffect, useState } from 'react';

interface NumberDisplayProps {
  number: number | null;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ number }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (number !== null) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [number]);

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
      {/* Background circles */}
      <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900 rounded-full opacity-20 dark:opacity-10 animate-pulse"></div>
      <div className="absolute inset-4 border-2 border-indigo-200 dark:border-indigo-800 rounded-full border-dashed opacity-40"></div>
      
      {/* The Number Container */}
      <div className={`
        relative flex items-center justify-center 
        w-56 h-56 md:w-72 md:h-72 
        bg-white dark:bg-slate-900 rounded-full shadow-2xl 
        border-[6px] border-indigo-600 dark:border-indigo-500
        transition-all duration-300
        ${animate ? 'scale-105 shadow-indigo-200 dark:shadow-indigo-950' : 'scale-100'}
      `}>
        <span className={`
          text-[7rem] md:text-[9rem] font-black text-slate-800 dark:text-white tracking-tighter leading-none
          transition-all duration-300
          ${number === null ? 'text-slate-200 dark:text-slate-800 text-3xl' : ''}
        `}>
          {number !== null ? number.toString().padStart(2, '0') : '--'}
        </span>
      </div>
      
      {/* Subtle indicator label */}
      <div className="absolute -bottom-1 px-6 py-1.5 bg-indigo-600 dark:bg-indigo-500 text-white text-[12px] font-black rounded-full uppercase tracking-[0.25em] shadow-lg ring-4 ring-white dark:ring-slate-950">
        Sorteado
      </div>
    </div>
  );
};

export default NumberDisplay;
