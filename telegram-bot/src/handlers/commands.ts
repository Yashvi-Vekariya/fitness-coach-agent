import TelegramBot from 'node-telegram-bot-api';
import { mainMenuKeyboard } from '../keyboards/main-menu';

export function registerCommands(bot: TelegramBot, sendToBackend: Function) {

  bot.onText(/\/start/, (msg) => {
    const name = msg.from?.first_name || 'there';

    const welcome =
      `🏋️ <b>Welcome to FitCoach AI, ${name}!</b>\n\n` +
      `💪 Personalized Workouts\n🥗 Nutrition Advice\n📊 Progress Tracking\n🏆 Gamification\n📸 Meal Photo Analysis\n\n` +
      `Tell me about yourself to get started!`;

    bot.sendMessage(msg.chat.id, welcome, {
      parse_mode: "HTML",
      ...mainMenuKeyboard()
    });
  });   // ✅ yaha missing tha

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `❓ <b>Commands:</b>\n/start /help /workout /bmi /stats /progress /profile`,
      { parse_mode: 'HTML' }
    );
  });

  bot.onText(/\/workout/, (msg) => {
    bot.sendMessage(msg.chat.id, '💪 What type of workout?', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🏠 Home', callback_data: 'workout_home' },
            { text: '🏋️ Gym', callback_data: 'workout_gym' }
          ],
          [
            { text: '🔄 Full Body', callback_data: 'workout_fullbody' },
            { text: '📋 Weekly', callback_data: 'workout_weekly' }
          ]
        ]
      }
    });
  });

  bot.onText(/\/stats/, async (msg) => {
    const result = await sendToBackend(
      'Show my stats and achievements',
      `${msg.from?.id}`
    );

    bot.sendMessage(msg.chat.id, result.response.slice(0, 4000), {
      parse_mode: 'HTML'
    });
  });

  bot.onText(/\/progress/, async (msg) => {
    const result = await sendToBackend(
      'Show weekly progress report',
      `${msg.from?.id}`
    );

    bot.sendMessage(msg.chat.id, result.response.slice(0, 4000), {
      parse_mode: 'HTML'
    });
  });
}