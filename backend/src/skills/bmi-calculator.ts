import { UserService } from '../services/user-service';
import { BMI_CATEGORIES } from '../utils/constants';

export function calculateBMI(weight: number, heightCm: number) {
  return UserService.calculateBMI(weight, heightCm);
}

export function formatBMIResult(result: { bmi: number; category: string; advice: string }): string {
  const bars = Math.round(result.bmi / 2);
  const bar = '█'.repeat(Math.min(bars, 20)) + '░'.repeat(Math.max(20 - bars, 0));

  return `📊 **BMI Calculator Result**\n\n` +
    `BMI: **${result.bmi}**\n` +
    `Category: **${result.category}**\n` +
    `[${bar}]\n\n` +
    `💡 ${result.advice}\n\n` +
    `📋 BMI Scale:\n` +
    `• < 18.5 → Underweight\n` +
    `• 18.5 - 24.9 → Normal ✅\n` +
    `• 25 - 29.9 → Overweight\n` +
    `• > 30 → Obese\n\n` +
    `⚠️ BMI is a general indicator. Consult a healthcare professional for personalized advice.`;
}
