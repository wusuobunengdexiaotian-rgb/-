import React from 'react';
import { Delete } from 'lucide-react';

interface NumberPadProps {
  onInput: (val: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ onInput, onDelete, onSubmit, disabled }) => {
  // Only render 1-9 via map to control the layout of the last row manually
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Helper to keep number button styling consistent
  const getNumBtnClass = (isDisabled?: boolean) => `
    h-16 rounded-2xl text-2xl font-cartoon shadow-[0_4px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all
    ${isDisabled 
      ? 'bg-gray-200 text-gray-400 shadow-none border-gray-200' 
      : 'bg-white text-blue-600 border-2 border-blue-100 hover:bg-blue-50'
    }
  `;

  return (
    <div className="grid grid-cols-3 gap-3 p-4 pb-8 max-w-md mx-auto w-full">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => onInput(btn)}
          disabled={disabled}
          className={getNumBtnClass(disabled)}
        >
          {btn}
        </button>
      ))}
      
      {/* Row 4, Col 1: Delete Button (Swapped) */}
      <button
        onClick={onDelete}
        disabled={disabled}
        className={`
          h-16 rounded-2xl flex items-center justify-center shadow-[0_4px_0_rgb(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all
          ${disabled 
            ? 'bg-gray-200 text-gray-400 shadow-none' 
            : 'bg-red-100 text-red-500 border-2 border-red-200 hover:bg-red-200'
          }
        `}
      >
        <Delete size={28} strokeWidth={2.5} />
      </button>

      {/* Row 4, Col 2: 0 Button (Swapped) */}
      <button
        onClick={() => onInput('0')}
        disabled={disabled}
        className={getNumBtnClass(disabled)}
      >
        0
      </button>

      {/* Row 4, Col 3: Submit Button */}
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`
          h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all font-cartoon tracking-widest
          ${disabled 
            ? 'bg-gray-300 shadow-none' 
            : 'bg-gradient-to-b from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
          }
        `}
      >
        提交
      </button>
    </div>
  );
};

export default NumberPad;