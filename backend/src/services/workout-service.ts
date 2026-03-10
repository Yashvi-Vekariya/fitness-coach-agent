import { getExercisesByBodyPart, Exercise } from '../skills/exercise-library';
import { UserProfile } from './user-service';

export interface WorkoutPlan {
  day: string;
  bodyPart: string;
  exercises: WorkoutExercise[];
  warmup: string[];
  cooldown: string[];
  estimatedDuration: number;
  estimatedCalories: number;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export class WorkoutService {
  // Generate a weekly workout plan
  static generateWeeklyPlan(user: UserProfile): WorkoutPlan[] {
    const isGym = user.workout_type === 'gym';
    const level = user.fitness_level || 'beginner';

    const setsMap: Record<string, number> = { beginner: 3, intermediate: 4, advanced: 5 };
    const sets = setsMap[level] || 3;

    const splits: Record<string, string[][]> = {
      beginner: [
        ['Monday', 'full_body'], ['Tuesday', 'rest'], ['Wednesday', 'full_body'],
        ['Thursday', 'rest'], ['Friday', 'full_body'], ['Saturday', 'rest'], ['Sunday', 'rest'],
      ],
      intermediate: [
        ['Monday', 'chest,shoulders'], ['Tuesday', 'back,arms'], ['Wednesday', 'rest'],
        ['Thursday', 'legs,core'], ['Friday', 'chest,back'], ['Saturday', 'arms,shoulders'],
        ['Sunday', 'rest'],
      ],
      advanced: [
        ['Monday', 'chest'], ['Tuesday', 'back'], ['Wednesday', 'shoulders,arms'],
        ['Thursday', 'legs'], ['Friday', 'chest,back'], ['Saturday', 'arms,core'],
        ['Sunday', 'rest'],
      ],
    };

    const weekPlan = splits[level] || splits.beginner;

    return weekPlan.map(([day, parts]) => {
      if (parts === 'rest') {
        return {
          day,
          bodyPart: 'Rest Day',
          exercises: [],
          warmup: ['Light walking 10 min', 'Stretching'],
          cooldown: ['Foam rolling', 'Deep breathing'],
          estimatedDuration: 0,
          estimatedCalories: 0,
        };
      }

      const bodyParts = parts.split(',');
      const exercises: WorkoutExercise[] = [];

      for (const part of bodyParts) {
        const available = getExercisesByBodyPart(part.trim(), isGym ? 'gym' : 'home', level);
        const selected = available.slice(0, level === 'beginner' ? 3 : 4);

        for (const ex of selected) {
          exercises.push({
            name: ex.name,
            sets,
            reps: getRepRange(user.goal || 'general_fitness', level),
            rest: getRestTime(user.goal || 'general_fitness'),
            notes: ex.instructions.slice(0, 80),
          });
        }
      }

      return {
        day,
        bodyPart: bodyParts.join(' & '),
        exercises,
        warmup: getWarmup(bodyParts[0]),
        cooldown: getCooldown(),
        estimatedDuration: exercises.length * 4 + 15, // ~4 min per exercise + warmup/cooldown
        estimatedCalories: exercises.length * 30 + 50,
      };
    });
  }

  // Generate single day workout
  static generateDayWorkout(user: UserProfile, bodyPart: string): WorkoutPlan {
    const isGym = user.workout_type === 'gym';
    const level = user.fitness_level || 'beginner';
    const setsMap: Record<string, number> = { beginner: 3, intermediate: 4, advanced: 5 };
    const sets = setsMap[level] || 3;

    const parts = bodyPart === 'full_body' ? ['chest', 'back', 'legs', 'core'] : [bodyPart];
    const exercises: WorkoutExercise[] = [];

    for (const part of parts) {
      const available = getExercisesByBodyPart(part, isGym ? 'gym' : 'home', level);
      const count = bodyPart === 'full_body' ? 2 : 4;
      const selected = available.slice(0, count);

      for (const ex of selected) {
        exercises.push({
          name: ex.name,
          sets,
          reps: getRepRange(user.goal || 'general_fitness', level),
          rest: getRestTime(user.goal || 'general_fitness'),
          notes: ex.instructions.slice(0, 80),
        });
      }
    }

    return {
      day: 'Today',
      bodyPart,
      exercises,
      warmup: getWarmup(parts[0]),
      cooldown: getCooldown(),
      estimatedDuration: exercises.length * 4 + 15,
      estimatedCalories: exercises.length * 30 + 50,
    };
  }

  // Format workout plan as readable text
  static formatPlan(plan: WorkoutPlan): string {
    if (plan.exercises.length === 0) {
      return `📅 **${plan.day}** — 🛌 Rest Day\nRecovery is important! Do light stretching or a walk.`;
    }

    let text = `📅 **${plan.day}** — ${plan.bodyPart.toUpperCase()}\n`;
    text += `⏱️ ~${plan.estimatedDuration} min | 🔥 ~${plan.estimatedCalories} cal\n\n`;

    text += `🔥 **Warm-up (5 min):**\n`;
    plan.warmup.forEach(w => { text += `  • ${w}\n`; });
    text += '\n';

    text += `💪 **Exercises:**\n`;
    plan.exercises.forEach((ex, i) => {
      text += `${i + 1}. **${ex.name}**\n`;
      text += `   Sets: ${ex.sets} | Reps: ${ex.reps} | Rest: ${ex.rest}\n`;
      if (ex.notes) text += `   💡 ${ex.notes}\n`;
      text += '\n';
    });

    text += `🧊 **Cool-down (5 min):**\n`;
    plan.cooldown.forEach(c => { text += `  • ${c}\n`; });

    return text;
  }
}

function getRepRange(goal: string, level: string): string {
  const ranges: Record<string, Record<string, string>> = {
    weight_loss: { beginner: '15-20', intermediate: '12-15', advanced: '12-20' },
    muscle_gain: { beginner: '10-12', intermediate: '8-12', advanced: '6-10' },
    endurance: { beginner: '15-20', intermediate: '15-25', advanced: '20-30' },
    flexibility: { beginner: '10-15', intermediate: '12-15', advanced: '12-15' },
    general_fitness: { beginner: '12-15', intermediate: '10-12', advanced: '8-12' },
  };
  return ranges[goal]?.[level] || '10-12';
}

function getRestTime(goal: string): string {
  const rests: Record<string, string> = {
    weight_loss: '30-45 sec',
    muscle_gain: '60-90 sec',
    endurance: '20-30 sec',
    flexibility: '30 sec',
    general_fitness: '45-60 sec',
  };
  return rests[goal] || '60 sec';
}

function getWarmup(bodyPart: string): string[] {
  const warmups: Record<string, string[]> = {
    chest: ['Arm circles (30 sec)', 'Push-up position hold (20 sec)', 'Band pull-aparts (15 reps)'],
    back: ['Cat-cow stretch (30 sec)', 'Arm swings (30 sec)', 'Light rows or band pulls (15 reps)'],
    shoulders: ['Arm circles (30 sec each direction)', 'Shoulder shrugs (15 reps)', 'Band dislocates (10 reps)'],
    arms: ['Wrist circles (20 sec)', 'Arm swings (30 sec)', 'Light curls (15 reps)'],
    legs: ['Bodyweight squats (15 reps)', 'Leg swings (10 each side)', 'Hip circles (10 each direction)'],
    core: ['Cat-cow (30 sec)', 'Pelvic tilts (15 reps)', 'Dead bug (10 reps)'],
    full_body: ['Jumping jacks (30 sec)', 'Arm circles (20 sec)', 'Bodyweight squats (10 reps)', 'High knees (20 sec)'],
  };
  return warmups[bodyPart] || warmups.full_body;
}

function getCooldown(): string[] {
  return [
    'Slow walking (2 min)',
    'Hamstring stretch (30 sec each side)',
    'Quad stretch (30 sec each side)',
    'Chest stretch (30 sec)',
    'Deep breathing (1 min)',
  ];
}
