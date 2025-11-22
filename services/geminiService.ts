import { GoogleGenAI } from "@google/genai";
import { MathQuestion, Grade } from "../types";

// Initialize Gemini
// NOTE: In a real production app, calls should go through a backend to protect the key.
// For this client-side demo, we rely on the environment variable.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAIExplanation = async (question: MathQuestion, grade: Grade): Promise<string> => {
  if (!apiKey) {
    return "请配置 API Key 以获取 AI 讲解。";
  }

  try {
    const prompt = `
      你是一位亲切的小学数学老师。请为一位${grade}的学生讲解这道数学题：
      题目：${question.num1} ${question.operation} ${question.num2} = ?
      正确答案是：${question.answer}。
      用户的错误答案是：${question.userAnswer}。

      要求：
      1. 语气要鼓励、可爱、有趣。
      2. 简单解释计算方法（例如：凑十法、竖式计算思路、九九乘法口诀）。
      3. 字数控制在60字以内。
      4. 使用中文。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "哎呀，老师正在思考，请稍后再试！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络有点小卡顿，老师暂时连不上线啦。";
  }
};