import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

if (!TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN is required! Set it in .env file.');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

console.log(`
╔══════════════════════════════════════════╗
║   🏋️  FitCoach AI - Telegram Bot        ║
║   Bot is running...                      ║
║   Backend: ${BACKEND_URL}           ║
╚══════════════════════════════════════════╝
`);

async function sendToBackend(message: string, telegramUserId: string): Promise<any> {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/chat/message`, {
      message,
      userId: `tg_${telegramUserId}`,
      channel: 'telegram',
    });
    return response.data;
  } catch (error: any) {
    console.error('Backend error:', error.message);
    return { response: 'Sorry, I\'m having connection issues. Please try again!' };
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,3}\s(.*)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .slice(0, 4000);
}

// /start
bot.onText(/\/start/, async (msg) => {
  const name = msg.from?.first_name || 'there';
  const welcome = `🏋️ Welcome to FitCoach AI, ${name}!\n\n` +
    `I'm your personal AI fitness coach. I can help you with:\n\n` +
    `💪 Workout Plans - Personalized for your goals\n` +
    `🥗 Nutrition Advice - Diet plans & calorie tracking\n` +
    `📊 Progress Tracking - Weight, BMI, stats\n` +
    `🏆 Gamification - Points, levels, achievements\n` +
    `📸 Meal Analysis - Send food photo for calories\n\n` +
    `Tell me about yourself - your age, weight, height, and fitness goals.\n\n` +
    `Or use the menu below 👇`;

  bot.sendMessage(msg.chat.id, welcome, {
    reply_markup: {
      keyboard: [
        ['💪 Workout Plan', '🥗 Nutrition Advice'],
        ['📊 My Progress', '🏆 My Stats'],
        ['📏 BMI Calculator', '🔍 Exercise Search'],
        ['⚙️ Setup Profile', '❓ Help'],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// /help
bot.onText(/\/help/, async (msg) => {
  const helpText = `❓ FitCoach AI - Help Guide\n\n` +
    `Commands:\n` +
    `/start - Start the bot\n` +
    `/help - Show this help\n` +
    `/workout - Get a workout plan\n` +
    `/nutrition - Get nutrition advice\n` +
    `/progress - View your progress\n` +
    `/bmi - Calculate your BMI\n` +
    `/stats - View your stats & achievements\n` +
    `/profile - Update your profile\n\n` +
    `Quick Actions:\n` +
    `Type "log weight 70kg" to log weight\n` +
    `Send a food photo for calorie analysis 📸\n\n` +
    `Examples:\n` +
    `"Give me a home workout plan"\n` +
    `"What should I eat for muscle gain?"\n` +
    `"My weight today is 72kg"\n` +
    `"I feel unmotivated today"`;
  bot.sendMessage(msg.chat.id, helpText);
});

// /workout
bot.onText(/\/workout/, async (msg) => {
  bot.sendMessage(msg.chat.id, '💪 What type of workout would you like?', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏠 Home Workout', callback_data: 'workout_home' }, { text: '🏋️ Gym Workout', callback_data: 'workout_gym' }],
        [{ text: '💪 Upper Body', callback_data: 'workout_upper' }, { text: '🦵 Lower Body', callback_data: 'workout_lower' }],
        [{ text: '🔄 Full Body', callback_data: 'workout_fullbody' }, { text: '📋 Weekly Plan', callback_data: 'workout_weekly' }],
      ],
    },
  });
});

// /bmi
bot.onText(/\/bmi/, async (msg) => {
  bot.sendMessage(msg.chat.id, '📏 BMI Calculator\n\nSend your weight and height like this:\n\nBMI 70 170\n\n(Weight in kg, Height in cm)');
});

// /stats
bot.onText(/\/stats/, async (msg) => {
  const result = await sendToBackend('Show me my stats, points, level, streak, and achievements', `${msg.from?.id}`);
  bot.sendMessage(msg.chat.id, cleanText(result.response));
});

// /progress
bot.onText(/\/progress/, async (msg) => {
  const result = await sendToBackend('Show me my weekly progress report with all details', `${msg.from?.id}`);
  bot.sendMessage(msg.chat.id, cleanText(result.response));
});

// /profile
bot.onText(/\/profile/, async (msg) => {
  bot.sendMessage(msg.chat.id,
    '⚙️ Setup Your Profile\n\nTell me about yourself in this format:\n\n' +
    'Profile: Name, Age, Gender, Weight(kg), Height(cm), Goal, Level, Diet, Workout Type\n\n' +
    'Example:\nProfile: Rahul, 25, male, 75, 175, muscle_gain, beginner, vegetarian, gym\n\n' +
    'Goals: weight_loss, muscle_gain, flexibility, endurance, general_fitness\n' +
    'Levels: beginner, intermediate, advanced\n' +
    'Diet: vegetarian, non_vegetarian, vegan\n' +
    'Workout: home, gym'
  );
});

// Callback queries (inline buttons)
bot.on('callback_query', async (query) => {
  const chatId = query.message?.chat.id;
  if (!chatId || !query.data) return;
  bot.answerCallbackQuery(query.id);

  const workoutMap: Record<string, string> = {
    'workout_home': 'Give me a complete home workout plan for today with no equipment',
    'workout_gym': 'Give me a complete gym workout plan for today',
    'workout_upper': 'Give me an upper body workout plan (chest, back, shoulders, arms)',
    'workout_lower': 'Give me a lower body workout plan (legs, glutes, calves)',
    'workout_fullbody': 'Give me a full body workout plan',
    'workout_weekly': 'Create a complete weekly workout plan for me (Monday to Sunday)',
  };

  const message = workoutMap[query.data];
  if (message) {
    bot.sendMessage(chatId, '⏳ Creating your workout plan...');
    const result = await sendToBackend(message, `${query.from?.id}`);
    bot.sendMessage(chatId, cleanText(result.response));
  }
});

// BMI calculation
bot.onText(/^bmi\s+(\d+\.?\d*)\s+(\d+\.?\d*)/i, async (msg, match) => {
  if (!match) return;
  const weight = parseFloat(match[1]);
  const height = parseFloat(match[2]);
  try {
    const response = await axios.post(`${BACKEND_URL}/api/user/bmi`, { weight, height });
    const { bmi, category, advice } = response.data;
    bot.sendMessage(msg.chat.id, `📊 BMI Result\n\nWeight: ${weight} kg\nHeight: ${height} cm\nBMI: ${bmi}\nCategory: ${category}\n\n💡 ${advice}`);
  } catch (error) {
    bot.sendMessage(msg.chat.id, '⚠️ Error calculating BMI. Please try again.');
  }
});

// Profile setup
bot.onText(/^profile:\s*(.+)/i, async (msg, match) => {
  if (!match) return;
  const parts = match[1].split(',').map(s => s.trim());
  if (parts.length < 9) {
    bot.sendMessage(msg.chat.id, '⚠️ Please provide all fields. Use /profile for the format.');
    return;
  }
  try {
    const [name, age, gender, weight, height, goal, fitness_level, diet_type, workout_type] = parts;
    await axios.put(`${BACKEND_URL}/api/user/tg_${msg.from?.id}`, {
      name, age: parseInt(age), gender, weight: parseFloat(weight),
      height: parseFloat(height), goal, fitness_level, diet_type, workout_type,
    });
    bot.sendMessage(msg.chat.id, `✅ Profile Updated!\n\nName: ${name}\nAge: ${age}\nWeight: ${weight}kg\nHeight: ${height}cm\nGoal: ${goal}\nLevel: ${fitness_level}\nDiet: ${diet_type}\nWorkout: ${workout_type}\n\nYou're all set! Start chatting for personalized advice 💪`);
  } catch (error) {
    bot.sendMessage(msg.chat.id, '⚠️ Error updating profile. Please check format and try again.');
  }
});

// Photo messages (meal analysis)
bot.on('photo', async (msg) => {
  bot.sendMessage(msg.chat.id, '📸 Analyzing your meal... Please wait ⏳');
  try {
    const result = await sendToBackend('Analyze this meal photo and tell me the calories, macros, and health rating.', `${msg.from?.id}`);
    bot.sendMessage(msg.chat.id, cleanText(result.response));
  } catch (error) {
    bot.sendMessage(msg.chat.id, '⚠️ Could not analyze the photo. Please try again.');
  }
});

// Voice messages
bot.on('voice', async (msg) => {
  bot.sendMessage(msg.chat.id, '🎙️ Voice received! For now, please type your message. Voice-to-text coming soon!');
});

// All other messages
bot.on('message', async (msg) => {
  if (!msg.text) return;
  if (msg.text.startsWith('/')) return;
  if (/^bmi\s/i.test(msg.text)) return;
  if (/^profile:/i.test(msg.text)) return;

  const menuMap: Record<string, string> = {
    '💪 Workout Plan': 'Give me a personalized workout plan for today',
    '🥗 Nutrition Advice': 'Give me nutrition advice and a meal plan for today',
    '📊 My Progress': 'Show me my progress report and stats',
    '🏆 My Stats': 'Show me my points, level, streak, and achievements',
    '📏 BMI Calculator': 'How do I calculate my BMI? Tell me the format.',
    '🔍 Exercise Search': 'Show me some exercises I can do. What body part should I focus on?',
    '⚙️ Setup Profile': 'Help me set up my fitness profile',
    '❓ Help': 'Show me what you can do and how to use this bot',
  };

  const mappedMessage = menuMap[msg.text] || msg.text;
  bot.sendChatAction(msg.chat.id, 'typing');
  const result = await sendToBackend(mappedMessage, `${msg.from?.id}`);
  bot.sendMessage(msg.chat.id, cleanText(result.response));
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});