import Groq from 'groq-sdk';
import { WORKOUT_AGENT_PROMPT } from '../utils/prompts';
import { UserProfile } from '../services/user-service';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function workoutAgent(message: string, user: UserProfile, chatHistory: any[] = []): Promise<string> {
  const profileStr = user.name
    ? `Name: ${user.name}, Age: ${user.age}, Weight: ${user.weight}kg, Height: ${user.height}cm, Level: ${user.fitness_level}, Goal: ${user.goal}, Workout Type: ${user.workout_type}, Injuries: ${user.injuries || 'None'}`
    : 'New user - profile not set up yet';

  const systemPrompt = WORKOUT_AGENT_PROMPT.replace('{userProfile}', profileStr);

  const messages: any[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-6).map((m: any) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a workout plan right now. Please try again!';
  } catch (error) {
    console.error('Workout agent error:', error);
    return '⚠️ Sorry, I\'m having trouble generating your workout plan. Please try again in a moment!';
  }
}
