export function workoutMenuKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏠 Home Workout', callback_data: 'workout_home' }, { text: '🏋️ Gym Workout', callback_data: 'workout_gym' }],
        [{ text: '💪 Upper Body', callback_data: 'workout_upper' }, { text: '🦵 Lower Body', callback_data: 'workout_lower' }],
        [{ text: '🔄 Full Body', callback_data: 'workout_fullbody' }, { text: '📋 Weekly Plan', callback_data: 'workout_weekly' }],
      ],
    },
  };
}
