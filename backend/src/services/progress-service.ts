import supabase from '../database/supabase';
import { UserService } from './user-service';

export class ProgressService {
  static async logWeight(userId: string, weight: number) {
    const user = await UserService.getOrCreateUser(userId);
    let bmi = null;
    if (user.height) { const r = UserService.calculateBMI(weight, user.height); bmi = r.bmi; }

    await supabase.from('weight_logs').insert({ user_id: userId, weight, bmi });
    await supabase.from('users').update({ weight, updated_at: new Date().toISOString() }).eq('id', userId);
    await UserService.addPoints(userId, 'WEIGHT_LOGGED');

    const { data: logs } = await supabase.from('weight_logs').select('weight').eq('user_id', userId).order('logged_at', { ascending: false }).limit(2);
    const change = logs && logs.length > 1 ? weight - logs[1].weight : 0;

    return { weight, bmi, change: Math.round(change * 10) / 10, logged: true };
  }

  static async logWorkout(userId: string, data: any) {
    await supabase.from('workout_logs').insert({
      user_id: userId, workout_type: data.workout_type || 'general', body_part: data.body_part || 'full_body',
      duration_minutes: data.duration_minutes || 30, exercises_count: data.exercises_count || 0, calories_burned: data.calories_burned || 0
    });
    await supabase.from('users').update({ total_workouts: (await supabase.from('users').select('total_workouts').eq('id', userId).single()).data?.total_workouts + 1 || 1 }).eq('id', userId);

    const pointsResult = await UserService.addPoints(userId, 'WORKOUT_COMPLETE');
    const streakResult = await UserService.updateStreak(userId);

    if (streakResult.streak === 7) await UserService.addPoints(userId, 'STREAK_BONUS_7');
    if (streakResult.streak === 30) await UserService.addPoints(userId, 'STREAK_BONUS_30');

    return { logged: true, streak: streakResult.streak, points: pointsResult.newPoints, levelUp: pointsResult.levelUp, newLevel: pointsResult.newLevel };
  }

  static async logMeal(userId: string, data: any) {
    await supabase.from('meal_logs').insert({
      user_id: userId, meal_type: data.meal_type || 'meal', description: data.description || '',
      calories: data.calories || 0, protein: data.protein || 0, carbs: data.carbs || 0, fat: data.fat || 0, health_rating: data.health_rating || 5
    });
    await UserService.addPoints(userId, 'MEAL_LOGGED');
    return { logged: true };
  }

  static async getWeeklyReport(userId: string) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const { data: workouts } = await supabase.from('workout_logs').select('*').eq('user_id', userId).gte('logged_at', sevenDaysAgo);
    const { data: user } = await supabase.from('users').select('streak, points, level').eq('id', userId).single();

    const { data: weightStart } = await supabase.from('weight_logs').select('weight').eq('user_id', userId).gte('logged_at', sevenDaysAgo).order('logged_at', { ascending: true }).limit(1).single();
    const { data: weightEnd } = await supabase.from('weight_logs').select('weight').eq('user_id', userId).order('logged_at', { ascending: false }).limit(1).single();

    const { data: meals } = await supabase.from('meal_logs').select('calories, protein').eq('user_id', userId).gte('logged_at', sevenDaysAgo);

    const w = workouts || [];
    const m = meals || [];
    return {
      workoutsCompleted: w.length,
      totalDuration: w.reduce((s, x) => s + (x.duration_minutes || 0), 0),
      totalCaloriesBurned: w.reduce((s, x) => s + (x.calories_burned || 0), 0),
      weightChange: weightStart && weightEnd ? Math.round((weightEnd.weight - weightStart.weight) * 10) / 10 : null,
      mealsLogged: m.length,
      avgDailyCalories: m.length > 0 ? Math.round(m.reduce((s, x) => s + (x.calories || 0), 0) / 7) : 0,
      streak: (user as any)?.streak || 0,
      points: (user as any)?.points || 0,
      level: (user as any)?.level || 'Beginner',
    };
  }

  static async getProgressChartData(userId: string, days: number = 30) {
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const { data: weights } = await supabase.from('weight_logs').select('weight, bmi, logged_at').eq('user_id', userId).gte('logged_at', since).order('logged_at');
    return { weights: weights || [], workoutsByDay: [], caloriesByDay: [] };
  }
}
