import React, { useState } from 'react';
import { WrongQuestion, Grade } from '../types';
import { Trash2, Sparkles, AlertTriangle } from 'lucide-react';
import { getAIExplanation } from '../services/geminiService';

interface WrongQuestionsProps {
  questions: WrongQuestion[];
  onRemove: (id: string) => void;
  grade: Grade;
}

const WrongQuestions: React.FC<WrongQuestionsProps> = ({ questions, onRemove, grade }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async (q: WrongQuestion) => {
    if (expandedId === q.id && explanation) {
        setExpandedId(null); 
        return;
    }
    setExpandedId(q.id);
    setExplanation(null);
    setLoading(true);
    const text = await getAIExplanation(q, grade);
    setExplanation(text);
    setLoading(false);
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-3/4 text-gray-400 p-10 pb-24">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
             <span className="text-6xl">🌟</span>
        </div>
        <h3 className="text-xl font-cartoon text-gray-600 mb-2">太棒了！</h3>
        <p className="text-sm">目前没有错题，继续保持哦~</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-28 max-w-md mx-auto">
      <div className="flex items-center justify-center gap-2 mb-8">
         <AlertTriangle className="text-red-400" />
         <h2 className="text-2xl font-cartoon text-red-500">我的错题本 ({questions.length})</h2>
      </div>
      
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-white rounded-3xl shadow-sm border-b-4 border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-5">
               <div className="flex justify-between items-start mb-3">
                    <div className="text-2xl font-cartoon text-slate-700">
                      {q.num1} {q.operation} {q.num2} = ?
                    </div>
                    <div className="flex gap-2">
                        <button 
                        onClick={() => handleExplain(q)}
                        className="w-10 h-10 flex items-center justify-center text-indigo-500 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                        title="AI讲解"
                        >
                        <Sparkles size={20} />
                        </button>
                        <button 
                        onClick={() => onRemove(q.id)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="移除"
                        >
                        <Trash2 size={20} />
                        </button>
                    </div>
               </div>

               <div className="flex items-center gap-4 text-sm">
                   <div className="bg-green-50 px-3 py-1 rounded-lg text-green-700 border border-green-100">
                       正确: <span className="font-bold text-lg ml-1">{q.answer}</span>
                   </div>
                   <div className="bg-red-50 px-3 py-1 rounded-lg text-red-400 border border-red-100 decoration-wavy">
                       你的: <span className="font-bold text-lg ml-1 line-through">{q.userAnswer}</span>
                   </div>
               </div>
            </div>

            {expandedId === q.id && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 border-t border-indigo-100 animate-fade-in">
                {loading ? (
                    <div className="flex items-center gap-3 text-indigo-500">
                        <div className="animate-spin h-5 w-5 border-2 border-current rounded-full border-t-transparent"></div>
                        <span className="font-medium">AI 老师正在分析...</span>
                    </div>
                ) : (
                    <div>
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">AI 讲解</div>
                        <p className="text-slate-700 leading-relaxed font-medium">{explanation}</p>
                    </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WrongQuestions;