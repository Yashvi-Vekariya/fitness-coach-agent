import Groq from 'groq-sdk';
import { PROGRESS_AGENT_PROMPT } from '../utils/prompts';
import { UserProfile, UserService } from '../services/user-service';
import { ProgressService } from '../services/progress-service';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function progressAgent(message: string, user: UserProfile, chatHistory: any[] = []): Promise<string> {
  // Check if user is logging weight
  const weightMatch = message.match(/(\d+\.?\d*)\s*(kg|kgs|kilos?)/i);
  if (weightMatch) {
    const weight = parseFloat(weightMatch[1]);
    if (weight > 20 && weight < 300) {
      const result = await ProgressService.logWeight(user.id, weight);
      const bmiStr = result.bmi ? ` Your BMI is ${result.bmi}.` : '';
      const changeStr = result.change !== 0 ? ` That's ${result.change > 0 ? '+' : ''}${result.change}kg since last log.` : '';
      return `✅ Weight logged: ${weight}kg!${bmiStr}${changeStr}\n\n+5 points earned! 📊`;
    }
  }

  const stats = await UserService.getStatsSummary(user.id);
  const weeklyReport = await ProgressService.getWeeklyReport(user.id);

  const profileStr = user.name
    ? `Name: ${user.name}, Age: ${user.age}, Weight: ${user.weight}kg, Height: ${user.height}cm, Goal: ${user.goal}`
    : 'New user';

  const progressStr = JSON.stringify({ currentWeight: user.weight, streak: (stats.user as any).streak, totalWorkouts: (stats.user as any).total_workouts, workoutsThisWeek: stats.workoutsThisWeek, weeklyReport });

  const systemPrompt = PROGRESS_AGENT_PROMPT.replace('{userProfile}', profileStr).replace('{progressData}', progressStr);

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, ...chatHistory.slice(-4).map((m: any) => ({ role: m.role, content: m.content })), { role: 'user', content: message }],
      temperature: 0.7, max_tokens: 1500,
    });
    return completion.choices[0]?.message?.content || 'Could not process progress data.';
  } catch { return '⚠️ Sorry, having trouble processing your progress data. Try again!'; }
}
