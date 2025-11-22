import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MultiplicationTable from './pages/MultiplicationTable';
import MathTips from './pages/MathTips';
import WrongQuestions from './pages/WrongQuestions';
import Profile from './pages/Profile';
import { AppTab, Grade, UserProfile, WrongQuestion, MathQuestion } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.HOME);
  
  // State: User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mathApp_user');
    return saved ? JSON.parse(saved) : {
      name: '小朋友',
      grade: Grade.G1,
      avatarId: 1,
      stars: 0
    };
  });

  // State: Wrong Questions List
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestion[]>(() => {
    const saved = localStorage.getItem('mathApp_mistakes');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('mathApp_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mathApp_mistakes', JSON.stringify(wrongQuestions));
  }, [wrongQuestions]);

  // Handlers
  const handleAddWrongQuestion = (q: MathQuestion) => {
    setWrongQuestions(prev => {
      const existing = prev.find(wq => wq.num1 === q.num1 && wq.num2 === q.num2 && wq.operation === q.operation);
      if (existing) {
        return prev.map(wq => wq.id === existing.id ? { ...wq, wrongCount: wq.wrongCount + 1, userAnswer: q.userAnswer, timestamp: Date.now() } : wq);
      }
      return [{ ...q, wrongCount: 1 }, ...prev];
    });
  };

  const handleRemoveWrongQuestion = (id: string) => {
    setWrongQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  // Render Content
  const renderContent = () => {
    switch (currentTab) {
      case AppTab.HOME:
        return <Home user={user} onAddWrongQuestion={handleAddWrongQuestion} />;
      case AppTab.TABLE:
        return <MultiplicationTable />;
      case AppTab.TIPS:
        return <MathTips />;
      case AppTab.MISTAKES:
        return <WrongQuestions questions={wrongQuestions} onRemove={handleRemoveWrongQuestion} grade={user.grade} />;
      case AppTab.PROFILE:
        return <Profile user={user} onUpdateUser={handleUpdateUser} />;
      default:
        return <Home user={user} onAddWrongQuestion={handleAddWrongQuestion} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-purple-50 to-pink-50 font-sans text-gray-900">
      {/* Safe area for top content (StatusBar simulation) */}
      <div className="h-safe-top w-full bg-transparent"></div>
      
      <main className="h-screen flex flex-col overflow-hidden relative">
        {/* Background Decoration Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="flex-1 overflow-y-auto no-scrollbar z-10">
          {renderContent()}
        </div>
      </main>

      <BottomNav currentTab={currentTab} onSwitch={setCurrentTab} />
    </div>
  );
};

export default App;