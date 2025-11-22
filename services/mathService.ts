import { Grade, MathQuestion, Operation } from '../types';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateQuestion = (grade: Grade): MathQuestion => {
  let num1 = 0;
  let num2 = 0;
  let operation = Operation.ADD;
  let answer = 0;

  // Difficulty Configuration
  switch (grade) {
    case Grade.KG:
      // Add/Sub within 10 or 20
      operation = Math.random() > 0.5 ? Operation.ADD : Operation.SUB;
      if (operation === Operation.ADD) {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        answer = num1 + num2;
      } else {
        num1 = getRandomInt(2, 20);
        num2 = getRandomInt(1, num1); // Ensure positive result
        answer = num1 - num2;
      }
      break;

    case Grade.G1:
      // Add/Sub within 100
      operation = Math.random() > 0.5 ? Operation.ADD : Operation.SUB;
      if (operation === Operation.ADD) {
        num1 = getRandomInt(1, 50);
        num2 = getRandomInt(1, 40);
        answer = num1 + num2;
      } else {
        num1 = getRandomInt(10, 99);
        num2 = getRandomInt(1, num1);
        answer = num1 - num2;
      }
      break;

    case Grade.G2:
      // Add/Sub within 100, Intro to Mul (Tables 1-9)
      const rand2 = Math.random();
      if (rand2 < 0.4) operation = Operation.ADD;
      else if (rand2 < 0.8) operation = Operation.SUB;
      else operation = Operation.MUL;

      if (operation === Operation.ADD) {
        num1 = getRandomInt(10, 90);
        num2 = getRandomInt(10, 90);
        answer = num1 + num2;
      } else if (operation === Operation.SUB) {
        num1 = getRandomInt(20, 100);
        num2 = getRandomInt(10, num1);
        answer = num1 - num2;
      } else {
        num1 = getRandomInt(1, 9);
        num2 = getRandomInt(1, 9);
        answer = num1 * num2;
      }
      break;

    case Grade.G3:
    case Grade.G4:
      // Mixed, larger numbers, intro to Div
      const rand3 = Math.random();
      if (rand3 < 0.3) operation = Operation.ADD;
      else if (rand3 < 0.6) operation = Operation.SUB;
      else if (rand3 < 0.8) operation = Operation.MUL;
      else operation = Operation.DIV;

      if (operation === Operation.ADD) {
        num1 = getRandomInt(100, 999);
        num2 = getRandomInt(100, 999);
        answer = num1 + num2;
      } else if (operation === Operation.SUB) {
        num1 = getRandomInt(200, 999);
        num2 = getRandomInt(100, num1);
        answer = num1 - num2;
      } else if (operation === Operation.MUL) {
        num1 = getRandomInt(2, 20);
        num2 = getRandomInt(2, 20);
        answer = num1 * num2;
      } else {
        // Generate division with integer result
        num2 = getRandomInt(2, 12);
        answer = getRandomInt(2, 12);
        num1 = num2 * answer;
      }
      break;

    default: // G5, G6
      // More complex
      const rand4 = Math.random();
      if (rand4 < 0.25) operation = Operation.ADD;
      else if (rand4 < 0.5) operation = Operation.SUB;
      else if (rand4 < 0.75) operation = Operation.MUL;
      else operation = Operation.DIV;

      if (operation === Operation.ADD) {
        num1 = getRandomInt(500, 5000);
        num2 = getRandomInt(500, 5000);
        answer = num1 + num2;
      } else if (operation === Operation.SUB) {
        num1 = getRandomInt(1000, 9000);
        num2 = getRandomInt(100, num1);
        answer = num1 - num2;
      } else if (operation === Operation.MUL) {
        num1 = getRandomInt(10, 99);
        num2 = getRandomInt(2, 15);
        answer = num1 * num2;
      } else {
        num2 = getRandomInt(3, 20);
        answer = getRandomInt(5, 50);
        num1 = num2 * answer;
      }
      break;
  }

  return {
    id: Date.now().toString() + Math.random().toString(),
    num1,
    num2,
    operation,
    answer,
    timestamp: Date.now(),
  };
};