import React, { useState } from 'react';
import { X } from 'lucide-react';

const MultiplicationTable: React.FC = () => {
  const [activeCell, setActiveCell] = useState<{r: number, c: number} | null>(null);

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Gradient colors for rows to make it look like a rainbow
  const rowColors = [
    'bg-red-50 border-red-200 text-red-600',
    'bg-orange-50 border-orange-200 text-orange-600',
    'bg-amber-50 border-amber-200 text-amber-600',
    'bg-yellow-50 border-yellow-200 text-yellow-600',
    'bg-lime-50 border-lime-200 text-lime-600',
    'bg-green-50 border-green-200 text-green-600',
    'bg-emerald-50 border-emerald-200 text-emerald-600',
    'bg-teal-50 border-teal-200 text-teal-600',
    'bg-cyan-50 border-cyan-200 text-cyan-600',
  ];

  return (
    <div className="p-4 pb-28 max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 border-b-4 border-blue-100">
        <h2 className="text-3xl font-cartoon text-center text-blue-500 tracking-widest">九九乘法表</h2>
        <p className="text-center text-gray-400 text-xs mt-2">点击卡片查看读法哦</p>
      </div>
      
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={row} className="flex flex-wrap gap-2 justify-center">
            {rows.slice(0, row).map(col => (
              <button
                key={`${row}-${col}`}
                onClick={() => setActiveCell({r: row, c: col})}
                className={`
                    px-2 py-1.5 text-xs sm:text-sm rounded-xl border-b-4 border active:border-b-0 active:translate-y-1 transition-all duration-100 font-medium
                    ${activeCell?.r === row && activeCell?.c === col 
                        ? 'bg-blue-500 border-blue-700 text-white scale-110 z-10' 
                        : `${rowColors[idx]} hover:brightness-95`
                    }
                `}
              >
                {col}×{row}={col * row}
              </button>
            ))}
          </div>
        ))}
      </div>

      {activeCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setActiveCell(null)}>
             <div className="bg-white p-8 rounded-[2rem] shadow-2xl border-4 border-yellow-300 w-full max-w-sm relative animate-bounce-in" onClick={e => e.stopPropagation()}>
                <button onClick={() => setActiveCell(null)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
                    <X size={24} />
                </button>
                
                <div className="text-center">
                    <div className="text-6xl font-cartoon text-slate-700 mb-4">
                        {activeCell.c} × {activeCell.r}
                    </div>
                    <div className="text-4xl font-bold text-blue-500 mb-6 bg-blue-50 py-2 rounded-xl">
                        = {activeCell.c * activeCell.r}
                    </div>
                    <div className="text-2xl text-slate-500 font-cartoon tracking-widest bg-slate-100 inline-block px-6 py-2 rounded-full">
                        {toChineseNum(activeCell.c)}{toChineseNum(activeCell.r)}{toChineseResult(activeCell.c * activeCell.r)}
                    </div>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

// Helpers
const cnNums = ['','一','二','三','四','五','六','七','八','九'];
const toChineseNum = (n: number) => cnNums[n];
const toChineseResult = (n: number) => {
    if(n < 10) return "得" + cnNums[n];
    if(n % 10 === 0) return cnNums[n/10] + "十";
    const tens = Math.floor(n/10);
    const ones = n % 10;
    return cnNums[tens] + "十" + cnNums[ones];
}

export default MultiplicationTable;