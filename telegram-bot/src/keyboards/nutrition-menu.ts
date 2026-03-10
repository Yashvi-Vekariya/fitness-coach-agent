export function nutritionMenuKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🥬 Veg Meal Plan', callback_data: 'nutrition_veg' }, { text: '🍗 Non-Veg Plan', callback_data: 'nutrition_nonveg' }],
        [{ text: '🌱 Vegan Plan', callback_data: 'nutrition_vegan' }, { text: '📊 My Macros', callback_data: 'nutrition_macros' }],
      ],
    },
  };
}
