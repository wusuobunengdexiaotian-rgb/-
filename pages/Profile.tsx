import React from 'react';
import { UserProfile, Grade } from '../types';
import { User, GraduationCap, Star, Settings } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  return (
    <div className="p-6 pb-28 max-w-md mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-500/10 p-8 mb-8 text-center relative border-b-4 border-blue-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-100 to-transparent opacity-50"></div>
        
        <div className="relative z-10">
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg ring-4 ring-white">
            <User size={56} />
            </div>
            <h2 className="text-3xl font-cartoon text-slate-800 mb-2">{user.name || '小小数学家'}</h2>
            <div className="inline-flex items-center bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full shadow-sm">
                <Star size={18} className="fill-current mr-1.5" />
                <span className="font-bold">{user.stars} 颗星星</span>
            </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 px-2">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <GraduationCap size={20} />
             </div>
             <h3 className="text-xl font-cartoon text-slate-700">我上几年级了？</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.values(Grade).map((g) => (
            <button
              key={g}
              onClick={() => onUpdateUser({ grade: g })}
              className={`
                py-4 px-4 rounded-2xl text-sm font-bold transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1
                ${user.grade === g
                  ? 'bg-blue-500 border-blue-700 text-white shadow-lg shadow-blue-200'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }
              `}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Footer/About */}
      <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-white/50 text-center">
         <p className="text-slate-400 text-xs leading-relaxed">
             开心口算宝 AI版 v1.2<br/>
             让数学变得像游戏一样简单有趣！
         </p>
      </div>
    </div>
  );
};

export default Profile;