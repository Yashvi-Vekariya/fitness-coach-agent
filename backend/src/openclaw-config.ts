export const openclawConfig = {
  name: 'FitCoach AI',
  version: '1.0.0',
  provider: {
    primary: { type: 'groq', model: process.env.OPENCLAW_MODEL || 'llama-3.3-70b-versatile', apiKey: process.env.GROQ_API_KEY },
    vision: { type: 'google', model: 'gemini-1.5-flash', apiKey: process.env.GEMINI_API_KEY },
  },
  database: { type: 'supabase', url: process.env.SUPABASE_URL, key: process.env.SUPABASE_ANON_KEY },
  channels: {
    web: { enabled: true, port: parseInt(process.env.PORT || '3000') },
    telegram: { enabled: !!process.env.TELEGRAM_BOT_TOKEN, token: process.env.TELEGRAM_BOT_TOKEN },
  },
};
export default openclawConfig;
