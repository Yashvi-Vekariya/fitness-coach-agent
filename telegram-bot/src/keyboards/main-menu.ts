export function mainMenuKeyboard() {
  return {
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
  };
}
