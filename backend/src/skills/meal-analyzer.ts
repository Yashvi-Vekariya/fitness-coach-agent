import { GoogleGenerativeAI } from '@google/generative-ai';
import { MEAL_ANALYSIS_PROMPT } from '../utils/prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeMealImage(imageBase64: string, mimeType: string = 'image/jpeg'): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      { text: MEAL_ANALYSIS_PROMPT },
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
    ]);

    const response = result.response.text();

    // Try to parse JSON from response
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Return as text if not JSON
    }

    return { rawAnalysis: response };
  } catch (error) {
    console.error('Meal analysis error:', error);
    return { error: 'Could not analyze the meal image. Please try again.' };
  }
}

export function formatMealAnalysis(analysis: any): string {
  if (analysis.error) return `⚠️ ${analysis.error}`;
  if (analysis.rawAnalysis) return `🍽️ Meal Analysis:\n${analysis.rawAnalysis}`;

  let msg = '🍽️ **Meal Analysis**\n\n';

  if (analysis.foods && analysis.foods.length > 0) {
    msg += '**Identified Foods:**\n';
    for (const food of analysis.foods) {
      msg += `• ${food.name} - ${food.calories} cal (P: ${food.protein}g | C: ${food.carbs}g | F: ${food.fat}g)\n`;
    }
  }

  msg += `\n📊 **Totals:**\n`;
  msg += `• Calories: ${analysis.totalCalories || 0} kcal\n`;
  msg += `• Protein: ${analysis.totalProtein || 0}g\n`;
  msg += `• Carbs: ${analysis.totalCarbs || 0}g\n`;
  msg += `• Fat: ${analysis.totalFat || 0}g\n`;
  msg += `• Health Rating: ${'⭐'.repeat(analysis.healthRating || 5)} (${analysis.healthRating}/10)\n`;

  if (analysis.suggestions && analysis.suggestions.length > 0) {
    msg += `\n💡 **Suggestions:**\n`;
    for (const s of analysis.suggestions) {
      msg += `• ${s}\n`;
    }
  }

  return msg;
}
