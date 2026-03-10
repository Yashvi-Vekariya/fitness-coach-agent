// ============================================
// APP CONSTANTS
// ============================================

export const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
export const GOALS = ['weight_loss', 'muscle_gain', 'flexibility', 'endurance', 'general_fitness'] as const;
export const BODY_PARTS = ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full_body'] as const;
export const WORKOUT_TYPES = ['home', 'gym'] as const;
export const DIET_TYPES = ['vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'] as const;

// Gamification
export const LEVELS = [
  { name: 'Beginner', minPoints: 0, badge: '🌱' },
  { name: 'Warrior', minPoints: 100, badge: '⚔️' },
  { name: 'Champion', minPoints: 300, badge: '🏆' },
  { name: 'Beast', minPoints: 600, badge: '🦁' },
  { name: 'Legend', minPoints: 1000, badge: '👑' },
];

export const POINTS = {
  WORKOUT_COMPLETE: 10,
  STREAK_BONUS_7: 50,
  STREAK_BONUS_30: 200,
  WEIGHT_LOGGED: 5,
  MEAL_LOGGED: 5,
  GOAL_SET: 20,
  FIRST_WORKOUT: 30,
};

export const ACHIEVEMENTS = [
  { id: 'first_workout', name: 'First Step', desc: 'Complete your first workout', icon: '🎯', requirement: 'workouts >= 1' },
  { id: 'week_streak', name: 'On Fire', desc: '7-day workout streak', icon: '🔥', requirement: 'streak >= 7' },
  { id: 'month_streak', name: 'Unstoppable', desc: '30-day workout streak', icon: '💪', requirement: 'streak >= 30' },
  { id: 'weight_tracker', name: 'Data Driven', desc: 'Log weight 10 times', icon: '📊', requirement: 'weight_logs >= 10' },
  { id: 'meal_master', name: 'Nutrition Pro', desc: 'Log 20 meals', icon: '🥗', requirement: 'meal_logs >= 20' },
  { id: 'century', name: 'Century Club', desc: 'Complete 100 workouts', icon: '💯', requirement: 'workouts >= 100' },
];

export const BMI_CATEGORIES = [
  { min: 0, max: 18.5, category: 'Underweight', color: '#3b82f6', advice: 'Focus on calorie surplus and strength training' },
  { min: 18.5, max: 24.9, category: 'Normal', color: '#22c55e', advice: 'Great! Maintain with balanced diet and exercise' },
  { min: 25, max: 29.9, category: 'Overweight', color: '#f59e0b', advice: 'Focus on calorie deficit and cardio + strength training' },
  { min: 30, max: 100, category: 'Obese', color: '#ef4444', advice: 'Consult a doctor. Start with low-impact exercises' },
];
