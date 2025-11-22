export enum Grade {
  KG = '幼儿园大班',
  G1 = '一年级',
  G2 = '二年级',
  G3 = '三年级',
  G4 = '四年级',
  G5 = '五年级',
  G6 = '六年级',
}

export enum Operation {
  ADD = '+',
  SUB = '-',
  MUL = '×',
  DIV = '÷',
}

export interface UserProfile {
  name: string;
  grade: Grade;
  avatarId: number;
  stars: number;
}

export interface MathQuestion {
  id: string;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  userAnswer?: number;
  isCorrect?: boolean;
  timestamp: number;
  explanation?: string; // AI Explanation
}

export interface WrongQuestion extends MathQuestion {
  wrongCount: number;
}

export enum AppTab {
  HOME = 'home',
  TABLE = 'table',
  TIPS = 'tips',
  MISTAKES = 'mistakes',
  PROFILE = 'profile',
}