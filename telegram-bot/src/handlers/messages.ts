import TelegramBot from 'node-telegram-bot-api';
import { formatForTelegram } from '../utils/formatter';

export function registerMessageHandler(bot: TelegramBot, sendToBackend: Function) {
  bot.on('message', async (msg) => {
    if (!msg.text || msg.text.startsWith('/')) return;
    const chatId = msg.chat.id;
    bot.sendChatAction(chatId, 'typing');
    const result = await sendToBackend(msg.text, `${msg.from?.id}`);
    bot.sendMessage(chatId, formatForTelegram(result.response), { parse_mode: 'HTML' });
  });
}

export function registerVoiceHandler(bot: TelegramBot) {
  bot.on('voice', (msg) => {
    bot.sendMessage(msg.chat.id, '🎙️ Voice received! Please type your message for now.');
  });
}

export function registerPhotoHandler(bot: TelegramBot, sendToBackend: Function) {
  bot.on('photo', async (msg) => {
    bot.sendMessage(msg.chat.id, '📸 Analyzing your meal...');
    const result = await sendToBackend('Analyze this meal photo for calories and macros', `${msg.from?.id}`);
    bot.sendMessage(msg.chat.id, formatForTelegram(result.response), { parse_mode: 'HTML' });
  });
}

export function registerCallbackHandler(bot: TelegramBot, sendToBackend: Function) {
  const map: Record<string, string> = {
    'workout_home': 'Give me a home workout plan',
    'workout_gym': 'Give me a gym workout plan',
    'workout_fullbody': 'Give me a full body workout',
    'workout_weekly': 'Create a weekly workout plan',
  };

  bot.on('callback_query', async (query) => {
    if (!query.data || !query.message) return;
    bot.answerCallbackQuery(query.id);
    const msg = map[query.data];
    if (msg) {
      bot.sendMessage(query.message.chat.id, '⏳ Generating...');
      const result = await sendToBackend(msg, `${query.from?.id}`);
      bot.sendMessage(query.message.chat.id, formatForTelegram(result.response), { parse_mode: 'HTML' });
    }
  });
}
