import supabase from '../database/supabase';

export class SchedulerService {
  static async addReminder(userId: string, data: any) {
    const { data: result } = await supabase.from('reminders').insert({
      user_id: userId, reminder_type: data.reminder_type || 'workout',
      time: data.time || '07:00', message: data.message || 'Time for your workout! 💪',
      channel: data.channel || 'telegram'
    }).select().single();
    return result;
  }

  static async getReminders(userId: string) {
    const { data } = await supabase.from('reminders').select('*').eq('user_id', userId).eq('is_active', true);
    return data || [];
  }

  static async deactivateReminder(reminderId: number) {
    await supabase.from('reminders').update({ is_active: false }).eq('id', reminderId);
  }
}
