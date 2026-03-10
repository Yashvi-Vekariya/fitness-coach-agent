import { UserProfile, UserService } from './user-service';

export interface MealPlan {
  meal: string;
  time: string;
  items: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroSplit {
  protein: number; // grams
  carbs: number;
  fat: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
}

export class NutritionService {
  // Calculate macro split based on goal
  static calculateMacros(user: UserProfile, activityLevel: string = 'moderate'): { tdee: number; target: number; macros: MacroSplit } {
    const tdee = UserService.calculateTDEE(user, activityLevel);

    let target = tdee;
    let proteinPct = 30, carbsPct = 40, fatPct = 30;

    switch (user.goal) {
      case 'weight_loss':
        target = tdee - 500;
        proteinPct = 35; carbsPct = 35; fatPct = 30;
        break;
      case 'muscle_gain':
        target = tdee + 400;
        proteinPct = 30; carbsPct = 45; fatPct = 25;
        break;
      case 'endurance':
        proteinPct = 25; carbsPct = 50; fatPct = 25;
        break;
      case 'flexibility':
        proteinPct = 25; carbsPct = 45; fatPct = 30;
        break;
      default:
        proteinPct = 30; carbsPct = 40; fatPct = 30;
    }

    const macros: MacroSplit = {
      protein: Math.round((target * proteinPct / 100) / 4), // 4 cal per gram
      carbs: Math.round((target * carbsPct / 100) / 4),
      fat: Math.round((target * fatPct / 100) / 9), // 9 cal per gram
      proteinPercent: proteinPct,
      carbsPercent: carbsPct,
      fatPercent: fatPct,
    };

    return { tdee, target, macros };
  }

  // Calculate water intake recommendation
  static calculateWaterIntake(weightKg: number, isWorkoutDay: boolean = true): number {
    let liters = weightKg * 0.033; // Base: 33ml per kg
    if (isWorkoutDay) liters += 0.5;
    return Math.round(liters * 10) / 10;
  }

  // Get pre-made meal templates (Indian options)
  static getMealTemplates(dietType: string, calorieTarget: number): MealPlan[] {
    const scale = calorieTarget / 2000; // Scale portions based on target

    if (dietType === 'vegetarian' || dietType === 'vegan') {
      return [
        {
          meal: 'Breakfast', time: '7:00 - 8:00 AM',
          items: [
            { name: 'Oats with milk & banana', portion: `${Math.round(50 * scale)}g oats`, calories: Math.round(350 * scale), protein: 12, carbs: 55, fat: 8 },
            { name: 'Mixed nuts', portion: `${Math.round(20 * scale)}g`, calories: Math.round(120 * scale), protein: 4, carbs: 4, fat: 10 },
          ],
          totalCalories: Math.round(470 * scale), totalProtein: 16, totalCarbs: 59, totalFat: 18,
        },
        {
          meal: 'Lunch', time: '12:30 - 1:30 PM',
          items: [
            { name: 'Roti', portion: `${Math.round(2 * scale)} pieces`, calories: Math.round(240 * scale), protein: 8, carbs: 48, fat: 2 },
            { name: 'Paneer sabzi', portion: `${Math.round(150 * scale)}g`, calories: Math.round(250 * scale), protein: 18, carbs: 8, fat: 16 },
            { name: 'Dal', portion: '1 bowl', calories: Math.round(180 * scale), protein: 12, carbs: 28, fat: 2 },
            { name: 'Rice', portion: `${Math.round(100 * scale)}g`, calories: Math.round(130 * scale), protein: 3, carbs: 28, fat: 0 },
            { name: 'Salad', portion: '1 plate', calories: 30, protein: 1, carbs: 6, fat: 0 },
          ],
          totalCalories: Math.round(830 * scale), totalProtein: 42, totalCarbs: 118, totalFat: 20,
        },
        {
          meal: 'Snack', time: '4:00 - 5:00 PM',
          items: [
            { name: 'Sprouts chaat', portion: '1 bowl', calories: Math.round(150 * scale), protein: 10, carbs: 20, fat: 3 },
            { name: 'Green tea', portion: '1 cup', calories: 5, protein: 0, carbs: 1, fat: 0 },
          ],
          totalCalories: Math.round(155 * scale), totalProtein: 10, totalCarbs: 21, totalFat: 3,
        },
        {
          meal: 'Dinner', time: '7:30 - 8:30 PM',
          items: [
            { name: 'Roti', portion: `${Math.round(2 * scale)} pieces`, calories: Math.round(240 * scale), protein: 8, carbs: 48, fat: 2 },
            { name: 'Mixed veg curry', portion: '1 bowl', calories: Math.round(180 * scale), protein: 6, carbs: 22, fat: 8 },
            { name: 'Curd/Raita', portion: '1 bowl', calories: Math.round(100 * scale), protein: 5, carbs: 8, fat: 5 },
          ],
          totalCalories: Math.round(520 * scale), totalProtein: 19, totalCarbs: 78, totalFat: 15,
        },
      ];
    }

    // Non-vegetarian
    return [
      {
        meal: 'Breakfast', time: '7:00 - 8:00 AM',
        items: [
          { name: 'Eggs (boiled/omelette)', portion: `${Math.round(3 * scale)} eggs`, calories: Math.round(210 * scale), protein: 18, carbs: 2, fat: 15 },
          { name: 'Whole wheat toast', portion: '2 slices', calories: Math.round(160 * scale), protein: 6, carbs: 28, fat: 2 },
          { name: 'Banana', portion: '1 medium', calories: 105, protein: 1, carbs: 27, fat: 0 },
        ],
        totalCalories: Math.round(475 * scale), totalProtein: 25, totalCarbs: 57, totalFat: 17,
      },
      {
        meal: 'Lunch', time: '12:30 - 1:30 PM',
        items: [
          { name: 'Chicken breast', portion: `${Math.round(150 * scale)}g`, calories: Math.round(250 * scale), protein: 46, carbs: 0, fat: 5 },
          { name: 'Rice', portion: `${Math.round(150 * scale)}g`, calories: Math.round(195 * scale), protein: 4, carbs: 42, fat: 0 },
          { name: 'Dal', portion: '1 bowl', calories: Math.round(180 * scale), protein: 12, carbs: 28, fat: 2 },
          { name: 'Salad', portion: '1 plate', calories: 30, protein: 1, carbs: 6, fat: 0 },
        ],
        totalCalories: Math.round(655 * scale), totalProtein: 63, totalCarbs: 76, totalFat: 7,
      },
      {
        meal: 'Snack', time: '4:00 - 5:00 PM',
        items: [
          { name: 'Protein shake', portion: '1 scoop + milk', calories: Math.round(200 * scale), protein: 28, carbs: 12, fat: 4 },
          { name: 'Almonds', portion: '10 pieces', calories: 70, protein: 3, carbs: 2, fat: 6 },
        ],
        totalCalories: Math.round(270 * scale), totalProtein: 31, totalCarbs: 14, totalFat: 10,
      },
      {
        meal: 'Dinner', time: '7:30 - 8:30 PM',
        items: [
          { name: 'Roti', portion: `${Math.round(2 * scale)} pieces`, calories: Math.round(240 * scale), protein: 8, carbs: 48, fat: 2 },
          { name: 'Fish/Chicken curry', portion: '1 bowl', calories: Math.round(300 * scale), protein: 30, carbs: 10, fat: 15 },
          { name: 'Vegetables', portion: '1 bowl', calories: 80, protein: 3, carbs: 14, fat: 2 },
        ],
        totalCalories: Math.round(620 * scale), totalProtein: 41, totalCarbs: 72, totalFat: 19,
      },
    ];
  }

  // Format meal plan as text
  static formatMealPlan(meals: MealPlan[], tdee: number, target: number): string {
    let text = `🥗 **Your Daily Meal Plan**\n`;
    text += `📊 TDEE: ${tdee} cal | Target: ${target} cal\n\n`;

    let dayTotal = { cal: 0, protein: 0, carbs: 0, fat: 0 };

    for (const meal of meals) {
      text += `⏰ **${meal.meal}** (${meal.time})\n`;
      for (const item of meal.items) {
        text += `  • ${item.name} — ${item.portion} (${item.calories} cal)\n`;
      }
      text += `  📊 ${meal.totalCalories} cal | P: ${meal.totalProtein}g | C: ${meal.totalCarbs}g | F: ${meal.totalFat}g\n\n`;

      dayTotal.cal += meal.totalCalories;
      dayTotal.protein += meal.totalProtein;
      dayTotal.carbs += meal.totalCarbs;
      dayTotal.fat += meal.totalFat;
    }

    text += `\n📋 **Daily Totals:**\n`;
    text += `🔥 Calories: ${dayTotal.cal} cal\n`;
    text += `🥩 Protein: ${dayTotal.protein}g\n`;
    text += `🍚 Carbs: ${dayTotal.carbs}g\n`;
    text += `🥑 Fat: ${dayTotal.fat}g\n`;

    return text;
  }
}
