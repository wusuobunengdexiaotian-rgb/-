import React, { useState, useEffect, useCallback } from 'react';
import { generateQuestion } from '../services/mathService';
import { getAIExplanation } from '../services/geminiService';
import { UserProfile, MathQuestion } from '../types';
import NumberPad from '../components/NumberPad';
import { Volume2, Sparkles, RefreshCw, Trophy } from 'lucide-react';

interface HomeProps {
  user: UserProfile;
  onAddWrongQuestion: (q: MathQuestion) => void;
}

// Sound Effects Helper
const playSound = (type: 'correct' | 'wrong') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'correct') {
      // Happy Major chord arpeggio
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.linearRampToValueAtTime(1046.5, now + 0.3); // C6
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      osc.start();
      osc.stop(now + 0.5);
    } else {
      // Sad slide down
      const now = ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      osc.start();
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

const Home: React.FC<HomeProps> = ({ user, onAddWrongQuestion }) => {
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [streak, setStreak] = useState(0);

  const loadNewQuestion = useCallback(() => {
    const q = generateQuestion(user.grade);
    setQuestion(q);
    setInput('');
    setStatus('idle');
    setAiExplanation(null);
    setIsLoadingAI(false);
    // Optional: Auto read question on load
    // setTimeout(() => speakQuestion(q), 300); 
  }, [user.grade]);

  // Initial load
  useEffect(() => {
    loadNewQuestion();
  }, [loadNewQuestion]);

  // Text to Speech Function
  const speakQuestion = (q: MathQuestion | null) => {
    if (!q) return;
    if (!window.speechSynthesis) return;

    // Cancel current speech
    window.speechSynthesis.cancel();

    let opText = '';
    switch (q.operation) {
      case '+': opText = '加'; break;
      case '-': opText = '减'; break;
      case '×': opText = '乘以'; break;
      case '÷': opText = '除以'; break;
    }

    const text = `${q.num1} ${opText} ${q.num2} 等于多少？`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch for friendliness
    
    window.speechSynthesis.speak(utterance);
  };

  const handleInput = (val: string) => {
    if (input.length < 6) {
      setInput(prev => prev + val);
    }
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    if (!question || !input) return;

    const userVal = parseInt(input, 10);
    const isCorrect = userVal === question.answer;
    const updatedQuestion = { ...question, userAnswer: userVal, isCorrect };

    if (isCorrect) {
      setStatus('correct');
      setStreak(s => s + 1);
      playSound('correct');
      setTimeout(() => {
        loadNewQuestion();
      }, 1200);
    } else {
      setStatus('wrong');
      setStreak(0);
      playSound('wrong');
      onAddWrongQuestion(updatedQuestion);
      
      setIsLoadingAI(true);
      const explanation = await getAIExplanation(updatedQuestion, user.grade);
      setAiExplanation(explanation);
      setIsLoadingAI(false);
    }
  };

  if (!question) return <div className="p-10 text-center font-cartoon text-gray-500 animate-pulse">题目加载中...</div>;

  return (
    <div className="flex flex-col h-full max-w-md mx-auto pb-24 relative">
      {/* Decorative floating elements */}
      <div className="absolute top-10 left-4 text-yellow-400 opacity-20 animate-float text-4xl">✨</div>
      <div className="absolute top-20 right-6 text-blue-400 opacity-20 animate-float text-2xl" style={{animationDelay: '1s'}}>⭐</div>

      {/* Header Stats */}
      <div className="flex justify-between items-center px-6 py-4 z-10">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur border border-orange-100 px-4 py-2 rounded-full shadow-sm transform hover:scale-105 transition-transform">
          <Trophy size={20} className="text-orange-500" fill="currentColor" />
          <span className="font-cartoon text-orange-600 font-bold text-lg">{streak} 连对</span>
        </div>
        <button 
          onClick={loadNewQuestion} 
          className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-blue-500 hover:rotate-180 transition-all duration-500"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto">
        
        {/* Question Card */}
        <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-8 mb-8 relative border-4 border-white">
            {/* Question Text */}
            <div className={`flex flex-col items-center justify-center transition-all duration-300 ${status === 'correct' ? 'scale-110' : ''}`}>
               <div className="flex items-center gap-3 mb-6">
                  <span className={`text-5xl sm:text-6xl font-cartoon tracking-wider drop-shadow-sm ${
                    status === 'wrong' ? 'text-red-500 shake-animation' : 'text-slate-700'
                  }`}>
                    {question.num1} {question.operation} {question.num2}
                  </span>
                  <span className="text-5xl sm:text-6xl font-cartoon text-slate-400">=</span>
               </div>

               {/* Speak Button */}
               <button 
                 onClick={() => speakQuestion(question)}
                 className="absolute top-4 right-4 p-2 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-500 transition-colors"
                 aria-label="朗读题目"
               >
                  <Volume2 size={24} />
               </button>
            </div>

            {/* Input/Result Display */}
            <div className="flex justify-center">
              <div className={`
                h-20 min-w-[140px] px-6 flex items-center justify-center rounded-2xl text-5xl font-cartoon font-bold transition-all duration-300 shadow-inner
                ${status === 'idle' 
                  ? 'bg-slate-100 text-slate-800 border-2 border-transparent ring-4 ring-slate-50' 
                  : status === 'correct'
                    ? 'bg-green-100 text-green-600 border-2 border-green-200 ring-4 ring-green-50 scale-110'
                    : 'bg-red-100 text-red-500 border-2 border-red-200 ring-4 ring-red-50'
                }
              `}>
                {status === 'idle' && input === '' ? (
                  <span className="text-slate-300 text-4xl">?</span>
                ) : (
                   input
                )}
                {status === 'idle' && <span className="w-0.5 h-8 bg-slate-400 animate-pulse ml-1"></span>}
              </div>
            </div>

             {/* Feedback Text */}
             {status === 'correct' && (
                 <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce-in">
                    答对啦！太棒了！🎉
                 </div>
             )}
        </div>

        {/* AI Explanation Area */}
        {(status === 'wrong' || aiExplanation) && (
          <div className="w-full bg-white/90 backdrop-blur rounded-3xl p-5 shadow-xl border-2 border-indigo-100 mb-4 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 to-purple-300"></div>
            <div className="flex items-center gap-2 mb-3 text-indigo-600 font-bold font-cartoon text-lg">
              <div className="bg-indigo-100 p-1.5 rounded-lg">
                 <Sparkles size={18} />
              </div>
              <span>AI 老师小课堂</span>
            </div>
            {isLoadingAI ? (
              <div className="flex items-center space-x-2 text-indigo-400 text-sm py-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                <span>老师正在思考解题妙招...</span>
              </div>
            ) : (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {aiExplanation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="z-20">
         <NumberPad 
            onInput={handleInput} 
            onDelete={handleDelete} 
            onSubmit={handleSubmit} 
            disabled={status === 'correct'} 
         />
      </div>
    </div>
  );
};

export default Home;