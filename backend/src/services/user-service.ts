import supabase from '../database/supabase';
import { v4 as uuidv4 } from 'uuid';
import { BMI_CATEGORIES, LEVELS, POINTS } from '../utils/constants';

export interface UserProfile {
  id: string;
  telegram_id?: string;
  name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  fitness_level: string;
  goal: string;
  diet_type: string;
  workout_type: string;
  injuries?: string;
  daily_calorie_target?: number;
  daily_water_target: number;
  points: number;
  level: string;
  streak: number;
  longest_streak: number;
  total_workouts: number;
}

export class UserService {
  static async getOrCreateUser(userId?: string, telegramId?: string): Promise<UserProfile> {
    if (telegramId) {
      const { data } = await supabase.from('users').select('*').eq('telegram_id', telegramId).single();
      if (data) return data as UserProfile;
    }
    if (userId) {
      const { data } = await supabase.from('users').select('*').eq('id', userId).single();
      if (data) return data as UserProfile;
    }

    const id = userId || uuidv4();
    const newUser = { id, telegram_id: telegramId || null, points: 0, level: 'Beginner', streak: 0, longest_streak: 0, total_workouts: 0, daily_water_target: 3.0, fitness_level: 'beginner', goal: 'general_fitness', diet_type: 'non_vegetarian', workout_type: 'home' };
    await supabase.from('users').insert(newUser);
    return newUser as UserProfile;
  }

  static async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const { id, ...updateData } = data as any;
    await supabase.from('users').update({ ...updateData, updated_at: new Date().toISOString() }).eq('id', userId);
    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
    return user as UserProfile;
  }

  static calculateBMI(weight: number, heightCm: number) {
    const heightM = heightCm / 100;
    const bmi = Math.round((weight / (heightM * heightM)) * 10) / 10;
    const cat = BMI_CATEGORIES.find(c => bmi >= c.min && bmi <= c.max) || BMI_CATEGORIES[3];
    return { bmi, category: cat.category, color: cat.color, advice: cat.advice };
  }

  static calculateTDEE(user: UserProfile, activityLevel: string = 'moderate'): number {
    if (!user.weight || !user.height || !user.age) return 2000;
    const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
    let bmr = user.gender === 'female'
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age - 161
      : 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    return Math.round(bmr * (multipliers[activityLevel] || 1.55));
  }

  static async addPoints(userId: string, pointType: keyof typeof POINTS) {
    const { data: user } = await supabase.from('users').select('points, level').eq('id', userId).single();
    const pts = POINTS[pointType];
    const newPoints = ((user as any)?.points || 0) + pts;

    let newLevel = LEVELS[0].name;
    for (const level of LEVELS) { if (newPoints >= level.minPoints) newLevel = level.name; }

    const levelUp = newLevel !== (user as any)?.level;
    await supabase.from('users').update({ points: newPoints, level: newLevel }).eq('id', userId);
    return { newPoints, levelUp, newLevel };
  }

  static async updateStreak(userId: string) {
    const { data: user } = await supabase.from('users').select('streak, longest_streak').eq('id', userId).single();
    const { data: lastWorkout } = await supabase.from('workout_logs').select('logged_at').eq('user_id', userId).order('logged_at', { ascending: false }).limit(1).single();

    let newStreak = 1;
    if (lastWorkout) {
      const lastDate = new Date(lastWorkout.logged_at).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const today = new Date().toDateString();
      if (lastDate === yesterday) newStreak = ((user as any)?.streak || 0) + 1;
      else if (lastDate === today) newStreak = (user as any)?.streak || 1;
    }

    const longestStreak = Math.max(newStreak, (user as any)?.longest_streak || 0);
    await supabase.from('users').update({ streak: newStreak, longest_streak: longestStreak }).eq('id', userId);
    return { streak: newStreak, isNew: newStreak > ((user as any)?.streak || 0) };
  }

  static async getStatsSummary(userId: string) {
    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
    const { data: weightLogs } = await supabase.from('weight_logs').select('weight, bmi, logged_at').eq('user_id', userId).order('logged_at', { ascending: false }).limit(30);
    const { data: achievements } = await supabase.from('user_achievements').select('achievement_id, unlocked_at').eq('user_id', userId);

    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const { count: workoutCount } = await supabase.from('workout_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId).gte('logged_at', sevenDaysAgo);

    const levelInfo = LEVELS.find(l => l.name === (user as any)?.level) || LEVELS[0];
    const nextLevel = LEVELS[LEVELS.indexOf(levelInfo) + 1];

    return {
      user: user || {},
      weightLogs: (weightLogs || []).reverse(),
      workoutsThisWeek: workoutCount || 0,
      achievements: achievements || [],
      currentLevel: { ...levelInfo },
      nextLevel: nextLevel ? { ...nextLevel, pointsNeeded: nextLevel.minPoints - ((user as any)?.points || 0) } : null,
    };
  }
}
