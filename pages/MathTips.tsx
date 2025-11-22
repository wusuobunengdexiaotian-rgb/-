import React from 'react';
import { BookOpen, Lightbulb, Zap, Search } from 'lucide-react';

const MathTips: React.FC = () => {
  const tips = [
    {
      title: "凑十法 (加法)",
      icon: Zap,
      desc: "看大数，分小数，凑成十，算得数。",
      example: "9 + 6 = ? \n把6分成1和5，9+1=10，10+5=15",
      bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", iconBg: "bg-pink-100"
    },
    {
      title: "破十法 (减法)",
      icon: Lightbulb,
      desc: "十几减九，几加一；十几减五，几加五。",
      example: "15 - 9 = ? \n15分成10和5，10-9=1，1+5=6",
      bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", iconBg: "bg-emerald-100"
    },
    {
      title: "乘法口诀记忆",
      icon: BookOpen,
      desc: "顺序背，倒序背，拐弯背。",
      example: "三五十五，三六十八... 熟能生巧！",
      bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", iconBg: "bg-amber-100"
    },
    {
      title: "找规律",
      icon: Search,
      desc: "观察数字的变化，找出隐藏的秘密。",
      example: "2, 4, 6, 8... 下一个是10 (加2)",
      bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-600", iconBg: "bg-sky-100"
    }
  ];

  return (
    <div className="p-6 pb-28 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cartoon text-purple-600 mb-2">口算小秘籍</h2>
        <p className="text-purple-400 text-sm">掌握这些技巧，算得又快又准！</p>
      </div>
      
      <div className="space-y-5">
        {tips.map((tip, index) => (
          <div key={index} className={`relative p-6 rounded-3xl border-b-4 shadow-sm transition-transform hover:scale-[1.02] ${tip.bg} ${tip.border}`}>
            <div className="flex items-start justify-between mb-3">
                <h3 className={`font-cartoon text-xl font-bold ${tip.text}`}>{tip.title}</h3>
                <div className={`p-2 rounded-xl ${tip.iconBg} ${tip.text}`}>
                    <tip.icon size={20} />
                </div>
            </div>
            
            <p className="mb-4 font-medium text-gray-700 leading-relaxed">{tip.desc}</p>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-sm font-mono text-slate-600 border border-white/50 shadow-inner">
                {tip.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathTips;