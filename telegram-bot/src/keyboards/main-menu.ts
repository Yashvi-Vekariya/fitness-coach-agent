export function mainMenuKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        [{ text: '💪 Workout Plan' }, { text: '🥗 Nutrition Advice' }],
        [{ text: '📊 My Progress' }, { text: '🏆 My Stats' }],
        [{ text: '📏 BMI Calculator' }, { text: '🔍 Exercise Search' }],
        [{ text: '⚙️ Setup Profile' }, { text: '❓ Help' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
}