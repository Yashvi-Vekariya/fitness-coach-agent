import Groq from 'groq-sdk';
import { SUPERVISOR_PROMPT } from '../utils/prompts';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export interface RouteResult {
  route: 'workout' | 'nutrition' | 'progress' | 'motivation' | 'general';
  intent: string;
}

export async function supervisorAgent(message: string): Promise<RouteResult> {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SUPERVISOR_PROMPT },
        { role: 'user', content: message },
      ],
      temperature: 0.1,
      max_tokens: 100,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(response);

    return {
      route: parsed.route || 'general',
      intent: parsed.intent || 'general query',
    };
  } catch (error) {
    console.error('Supervisor agent error:', error);
    // Fallback: simple keyword routing
    return fallbackRouting(message);
  }
}

function fallbackRouting(message: string): RouteResult {
  const msg = message.toLowerCase();

  if (/workout|exercise|training|gym|push.?up|squat|plank|run|cardio|stretch|yoga|leg day|chest day|arm|abs/.test(msg)) {
    return { route: 'workout', intent: 'workout related query' };
  }
  if (/food|eat|diet|nutrition|calorie|protein|carb|meal|breakfast|lunch|dinner|snack|water|drink|veg|chicken|rice/.test(msg)) {
    return { route: 'nutrition', intent: 'nutrition related query' };
  }
  if (/weight|bmi|progress|track|measure|kg|pound|lost|gained|stats|report|log/.test(msg)) {
    return { route: 'progress', intent: 'progress tracking query' };
  }
  if (/motivat|tired|lazy|skip|bore|streak|point|badge|level|achieve|give up|can.?t/.test(msg)) {
    return { route: 'motivation', intent: 'motivation needed' };
  }

  return { route: 'general', intent: 'general query' };
}
