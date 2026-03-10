import supabase from '../database/supabase';
import { ACHIEVEMENTS, LEVELS } from '../utils/constants';

export class GamificationService {
  static async getGamificationData(userId: string) {
    const { data: user } = await supabase.from('users').select('points, level, streak, longest_streak, total_workouts').eq('id', userId).single();
    if (!user) return null;

    const { data: unlockedRaw } = await supabase.from('user_achievements').select('achievement_id, unlocked_at').eq('user_id', userId);
    const unlockedIds = new Set((unlockedRaw || []).map(a => a.achievement_id));

    const allAchievements = ACHIEVEMENTS.map(a => ({
      ...a, unlocked: unlockedIds.has(a.id),
      unlocked_at: (unlockedRaw || []).find(ua => ua.achievement_id === a.id)?.unlocked_at || null,
    }));

    const currentLevel = LEVELS.find(l => l.name === user.level) || LEVELS[0];
    const idx = LEVELS.indexOf(currentLevel);
    const nextLevel = LEVELS[idx + 1] || null;
    const progressToNext = nextLevel ? Math.min(Math.round(((user.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100), 100) : 100;

    return {
      points: user.points || 0, level: currentLevel, nextLevel,
      progressToNext, streak: user.streak || 0, longestStreak: user.longest_streak || 0,
      totalWorkouts: user.total_workouts || 0, achievements: allAchievements,
      unlockedCount: (unlockedRaw || []).length, totalAchievements: ACHIEVEMENTS.length,
    };
  }

  static async checkAchievements(userId: string) {
    const { data: user } = await supabase.from('users').select('total_workouts, streak').eq('id', userId).single();
    if (!user) return [];

    const { count: wlCount } = await supabase.from('weight_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId);
    const { count: mlCount } = await supabase.from('meal_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId);

    const stats: any = { workouts: user.total_workouts || 0, streak: user.streak || 0, weight_logs: wlCount || 0, meal_logs: mlCount || 0 };
    const newAchievements: any[] = [];

    for (const a of ACHIEVEMENTS) {
      const [stat, op, val] = a.requirement.split(' ');
      if (op === '>=' && stats[stat] >= parseInt(val)) {
        const { error } = await supabase.from('user_achievements').insert({ user_id: userId, achievement_id: a.id });
        if (!error) newAchievements.push(a);
      }
    }
    return newAchievements;
  }
}
