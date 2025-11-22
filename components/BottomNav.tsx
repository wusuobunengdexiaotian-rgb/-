import React from 'react';
import { Home, Grid3X3, Lightbulb, AlertCircle, User } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  currentTab: AppTab;
  onSwitch: (tab: AppTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSwitch }) => {
  const navItems = [
    { id: AppTab.HOME, icon: Home, label: '练习' },
    { id: AppTab.TABLE, icon: Grid3X3, label: '口诀' },
    { id: AppTab.TIPS, icon: Lightbulb, label: '秘籍' },
    { id: AppTab.MISTAKES, icon: AlertCircle, label: '错题' },
    { id: AppTab.PROFILE, icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-white/90 backdrop-blur-md border border-white/50 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-2 py-2 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSwitch(item.id)}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-white shadow-lg scale-105 -translate-y-2' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {/* Active Background Blob */}
              {isActive && (
                <div className={`absolute inset-0 rounded-2xl ${
                   item.id === AppTab.HOME ? 'bg-blue-500' :
                   item.id === AppTab.TABLE ? 'bg-purple-500' :
                   item.id === AppTab.TIPS ? 'bg-yellow-400' :
                   item.id === AppTab.MISTAKES ? 'bg-red-400' : 'bg-green-400'
                }`}></div>
              )}
              
              <item.icon
                size={22}
                className={`z-10 mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`z-10 text-[10px] font-bold font-cartoon ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;