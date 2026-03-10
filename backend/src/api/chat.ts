import { Router, Request, Response } from 'express';
import { supervisorAgent } from '../agents/supervisor';
import { workoutAgent } from '../agents/workout-agent';
import { nutritionAgent } from '../agents/nutrition-agent';
import { progressAgent } from '../agents/progress-agent';
import { motivationAgent } from '../agents/motivation-agent';
import { UserService } from '../services/user-service';
import { getContextForAgent } from '../rag/retriever';
import { sanitizeInput } from '../utils/validators';
import { GENERAL_PROMPT } from '../utils/prompts';
import supabase from '../database/supabase';
import Groq from 'groq-sdk';

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/message', async (req: Request, res: Response) => {
  try {
    const { message, userId, channel = 'web' } = req.body;
    if (!message || typeof message !== 'string') return res.status(400).json({ error: 'Message is required' });

    const cleanMessage = sanitizeInput(message);
    const user = await UserService.getOrCreateUser(userId);

    // Save user message
    await supabase.from('chat_history').insert({ user_id: user.id, role: 'user', content: cleanMessage, channel });

    // Get chat history
    const { data: history } = await supabase.from('chat_history').select('role, content').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);
    const chatHistory = (history || []).reverse();

    // Route through supervisor
    const route = await supervisorAgent(cleanMessage);
    const ragContext = getContextForAgent(cleanMessage);
    const augmented = ragContext ? `${cleanMessage}\n${ragContext}` : cleanMessage;

    let response: string;
    switch (route.route) {
      case 'workout': response = await workoutAgent(augmented, user, chatHistory); break;
      case 'nutrition': response = await nutritionAgent(augmented, user, chatHistory); break;
      case 'progress': response = await progressAgent(augmented, user, chatHistory); break;
      case 'motivation': response = await motivationAgent(augmented, user, chatHistory); break;
      default: response = await generalChat(augmented, user, chatHistory);
    }

    // Save response
    await supabase.from('chat_history').insert({ user_id: user.id, role: 'assistant', content: response, agent: route.route, channel });

    res.json({ response, agent: route.route, intent: route.intent, userId: user.id });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again!' });
  }
});

async function generalChat(message: string, user: any, chatHistory: any[]): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: GENERAL_PROMPT },
        ...chatHistory.slice(-6).map((m: any) => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
      ],
      temperature: 0.7, max_tokens: 1500,
    });
    return completion.choices[0]?.message?.content || 'Hello! I\'m your FitCoach AI. How can I help? 💪';
  } catch { return 'Hello! 👋 I\'m FitCoach AI! I help with workouts, nutrition, progress tracking & motivation. What would you like? 💪'; }
}

export default router;
