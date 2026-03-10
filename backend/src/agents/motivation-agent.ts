import Groq from 'groq-sdk';
import { MOTIVATION_AGENT_PROMPT } from '../utils/prompts';
import { UserProfile } from '../services/user-service';
import { GamificationService } from '../services/gamification';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function motivationAgent(message: string, user: UserProfile, chatHistory: any[] = []): Promise<string> {
  const gamData = await GamificationService.getGamificationData(user.id);

  const profileStr = user.name ? `Name: ${user.name}, Goal: ${user.goal}, Level: ${user.fitness_level}` : 'New user';
  const gamStr = gamData ? JSON.stringify({ points: gamData.points, level: gamData.level.name, streak: gamData.streak, longestStreak: gamData.longestStreak, totalWorkouts: gamData.totalWorkouts, unlockedAchievements: gamData.achievements.filter(a => a.unlocked).map(a => a.name), progressToNextLevel: gamData.progressToNext }) : '{}';

  const systemPrompt = MOTIVATION_AGENT_PROMPT.replace('{userProfile}', profileStr).replace('{gamificationData}', gamStr);

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, ...chatHistory.slice(-4).map((m: any) => ({ role: m.role, content: m.content })), { role: 'user', content: message }],
      temperature: 0.8, max_tokens: 1500,
    });

    const newAchievements = await GamificationService.checkAchievements(user.id);
    let response = completion.choices[0]?.message?.content || 'Keep going! 💪';
    if (newAchievements.length > 0) {
      response += '\n\n🏆 **NEW ACHIEVEMENT UNLOCKED!**\n';
      for (const a of newAchievements) response += `${a.icon} ${a.name} - ${a.desc}\n`;
    }
    return response;
  } catch { return '💪 Keep pushing! Every step counts!'; }
}
