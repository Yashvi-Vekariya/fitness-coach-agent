export interface Exercise {
  name: string;
  bodyPart: string;
  equipment: string;
  level: string;
  instructions: string;
  muscles: string[];
  type: string;
}

export const EXERCISES: Exercise[] = [
  // CHEST
  { name: 'Push-ups', bodyPart: 'chest', equipment: 'none', level: 'beginner', instructions: 'Start in plank position, lower chest to ground, push back up. Keep body straight.', muscles: ['chest', 'triceps', 'shoulders'], type: 'home' },
  { name: 'Wide Push-ups', bodyPart: 'chest', equipment: 'none', level: 'beginner', instructions: 'Like regular push-ups but hands wider than shoulder width. Targets outer chest more.', muscles: ['chest', 'shoulders'], type: 'home' },
  { name: 'Diamond Push-ups', bodyPart: 'chest', equipment: 'none', level: 'intermediate', instructions: 'Hands close together forming a diamond shape. Great for inner chest and triceps.', muscles: ['chest', 'triceps'], type: 'home' },
  { name: 'Decline Push-ups', bodyPart: 'chest', equipment: 'none', level: 'intermediate', instructions: 'Feet elevated on a chair/bench. Targets upper chest.', muscles: ['upper chest', 'shoulders'], type: 'home' },
  { name: 'Bench Press', bodyPart: 'chest', equipment: 'barbell', level: 'intermediate', instructions: 'Lie on bench, grip bar shoulder-width, lower to chest, press up. Keep feet flat.', muscles: ['chest', 'triceps', 'shoulders'], type: 'gym' },
  { name: 'Incline Dumbbell Press', bodyPart: 'chest', equipment: 'dumbbells', level: 'intermediate', instructions: 'On incline bench (30-45°), press dumbbells up from chest level.', muscles: ['upper chest', 'shoulders'], type: 'gym' },
  { name: 'Cable Flyes', bodyPart: 'chest', equipment: 'cables', level: 'intermediate', instructions: 'Stand between cable machines, arms wide, bring handles together in front.', muscles: ['chest'], type: 'gym' },
  { name: 'Dumbbell Flyes', bodyPart: 'chest', equipment: 'dumbbells', level: 'intermediate', instructions: 'Lie on bench, arms extended with dumbbells, lower to sides in arc, squeeze back.', muscles: ['chest'], type: 'gym' },

  // BACK
  { name: 'Superman Hold', bodyPart: 'back', equipment: 'none', level: 'beginner', instructions: 'Lie face down, lift arms and legs off ground, hold. Strengthens lower back.', muscles: ['lower back', 'glutes'], type: 'home' },
  { name: 'Bodyweight Rows', bodyPart: 'back', equipment: 'bar/table', level: 'beginner', instructions: 'Under a table/bar, pull chest up to the bar. Keep body straight.', muscles: ['back', 'biceps'], type: 'home' },
  { name: 'Pull-ups', bodyPart: 'back', equipment: 'pull-up bar', level: 'intermediate', instructions: 'Hang from bar, pull chin above bar, lower with control.', muscles: ['lats', 'biceps', 'back'], type: 'home' },
  { name: 'Lat Pulldown', bodyPart: 'back', equipment: 'machine', level: 'beginner', instructions: 'Sit at machine, pull bar to upper chest, squeeze shoulder blades.', muscles: ['lats', 'biceps'], type: 'gym' },
  { name: 'Barbell Rows', bodyPart: 'back', equipment: 'barbell', level: 'intermediate', instructions: 'Bend over 45°, pull barbell to lower chest, squeeze back.', muscles: ['back', 'biceps', 'rear delts'], type: 'gym' },
  { name: 'Deadlift', bodyPart: 'back', equipment: 'barbell', level: 'advanced', instructions: 'Feet hip-width, grip bar, lift by driving hips forward. Keep back straight!', muscles: ['back', 'glutes', 'hamstrings', 'core'], type: 'gym' },
  { name: 'Seated Cable Row', bodyPart: 'back', equipment: 'cables', level: 'beginner', instructions: 'Sit at cable machine, pull handle to stomach, squeeze shoulder blades.', muscles: ['back', 'biceps'], type: 'gym' },

  // SHOULDERS
  { name: 'Pike Push-ups', bodyPart: 'shoulders', equipment: 'none', level: 'intermediate', instructions: 'Form inverted V with body, bend elbows to lower head, push back up.', muscles: ['shoulders', 'triceps'], type: 'home' },
  { name: 'Lateral Raises (bottles)', bodyPart: 'shoulders', equipment: 'none', level: 'beginner', instructions: 'Hold water bottles/light weights, raise arms to sides until shoulder height.', muscles: ['side delts'], type: 'home' },
  { name: 'Overhead Press', bodyPart: 'shoulders', equipment: 'dumbbells', level: 'intermediate', instructions: 'Press dumbbells from shoulder level overhead. Don\'t arch back.', muscles: ['shoulders', 'triceps'], type: 'gym' },
  { name: 'Lateral Raises', bodyPart: 'shoulders', equipment: 'dumbbells', level: 'beginner', instructions: 'Arms at sides, raise dumbbells out to shoulder height, lower slowly.', muscles: ['side delts'], type: 'gym' },
  { name: 'Face Pulls', bodyPart: 'shoulders', equipment: 'cables', level: 'beginner', instructions: 'Pull rope attachment to face level, squeeze rear delts.', muscles: ['rear delts', 'upper back'], type: 'gym' },

  // ARMS
  { name: 'Tricep Dips (chair)', bodyPart: 'arms', equipment: 'chair', level: 'beginner', instructions: 'Hands on chair edge, lower body by bending elbows, push back up.', muscles: ['triceps', 'chest'], type: 'home' },
  { name: 'Bicep Curls (bottles)', bodyPart: 'arms', equipment: 'none', level: 'beginner', instructions: 'Hold water bottles, curl up to shoulder, lower slowly. Keep elbows still.', muscles: ['biceps'], type: 'home' },
  { name: 'Barbell Curls', bodyPart: 'arms', equipment: 'barbell', level: 'beginner', instructions: 'Stand, grip barbell underhand, curl to shoulders, lower with control.', muscles: ['biceps'], type: 'gym' },
  { name: 'Tricep Pushdowns', bodyPart: 'arms', equipment: 'cables', level: 'beginner', instructions: 'At cable machine, push handle down until arms straight, return slowly.', muscles: ['triceps'], type: 'gym' },
  { name: 'Hammer Curls', bodyPart: 'arms', equipment: 'dumbbells', level: 'beginner', instructions: 'Palms facing each other, curl dumbbells up. Works brachialis.', muscles: ['biceps', 'forearms'], type: 'gym' },
  { name: 'Skull Crushers', bodyPart: 'arms', equipment: 'barbell', level: 'intermediate', instructions: 'Lie on bench, lower bar to forehead by bending elbows, extend back up.', muscles: ['triceps'], type: 'gym' },

  // LEGS
  { name: 'Bodyweight Squats', bodyPart: 'legs', equipment: 'none', level: 'beginner', instructions: 'Feet shoulder-width, sit back like sitting in chair, stand back up. Knees don\'t pass toes.', muscles: ['quads', 'glutes', 'hamstrings'], type: 'home' },
  { name: 'Lunges', bodyPart: 'legs', equipment: 'none', level: 'beginner', instructions: 'Step forward, lower until both knees at 90°, push back to start.', muscles: ['quads', 'glutes'], type: 'home' },
  { name: 'Jump Squats', bodyPart: 'legs', equipment: 'none', level: 'intermediate', instructions: 'Squat down, explode up into a jump, land softly, repeat.', muscles: ['quads', 'glutes', 'calves'], type: 'home' },
  { name: 'Wall Sit', bodyPart: 'legs', equipment: 'none', level: 'beginner', instructions: 'Back against wall, slide down to 90° angle, hold. Burns quads!', muscles: ['quads'], type: 'home' },
  { name: 'Calf Raises', bodyPart: 'legs', equipment: 'none', level: 'beginner', instructions: 'Stand on edge of step, raise up on toes, lower heels below step.', muscles: ['calves'], type: 'home' },
  { name: 'Glute Bridge', bodyPart: 'legs', equipment: 'none', level: 'beginner', instructions: 'Lie on back, knees bent, push hips up, squeeze glutes at top.', muscles: ['glutes', 'hamstrings'], type: 'home' },
  { name: 'Barbell Squats', bodyPart: 'legs', equipment: 'barbell', level: 'intermediate', instructions: 'Bar on upper back, squat below parallel, drive up through heels.', muscles: ['quads', 'glutes', 'core'], type: 'gym' },
  { name: 'Leg Press', bodyPart: 'legs', equipment: 'machine', level: 'beginner', instructions: 'Sit in machine, push platform away, don\'t lock knees.', muscles: ['quads', 'glutes'], type: 'gym' },
  { name: 'Romanian Deadlift', bodyPart: 'legs', equipment: 'barbell', level: 'intermediate', instructions: 'Hold bar, hinge at hips, lower along legs, feel hamstring stretch, return.', muscles: ['hamstrings', 'glutes', 'lower back'], type: 'gym' },
  { name: 'Leg Curls', bodyPart: 'legs', equipment: 'machine', level: 'beginner', instructions: 'Lie on machine, curl weight by bending knees, lower slowly.', muscles: ['hamstrings'], type: 'gym' },

  // CORE
  { name: 'Plank', bodyPart: 'core', equipment: 'none', level: 'beginner', instructions: 'Forearms and toes on ground, body straight like a board. Hold position.', muscles: ['core', 'shoulders'], type: 'home' },
  { name: 'Crunches', bodyPart: 'core', equipment: 'none', level: 'beginner', instructions: 'Lie on back, knees bent, curl upper body toward knees, lower slowly.', muscles: ['abs'], type: 'home' },
  { name: 'Mountain Climbers', bodyPart: 'core', equipment: 'none', level: 'beginner', instructions: 'In push-up position, alternate driving knees to chest rapidly.', muscles: ['core', 'hip flexors', 'shoulders'], type: 'home' },
  { name: 'Bicycle Crunches', bodyPart: 'core', equipment: 'none', level: 'beginner', instructions: 'Lie on back, alternate touching elbow to opposite knee in cycling motion.', muscles: ['abs', 'obliques'], type: 'home' },
  { name: 'Leg Raises', bodyPart: 'core', equipment: 'none', level: 'intermediate', instructions: 'Lie flat, legs straight, raise to 90°, lower slowly without touching floor.', muscles: ['lower abs', 'hip flexors'], type: 'home' },
  { name: 'Russian Twists', bodyPart: 'core', equipment: 'none', level: 'intermediate', instructions: 'Sit, lean back slightly, feet off ground, rotate torso side to side.', muscles: ['obliques', 'core'], type: 'home' },
  { name: 'Dead Bug', bodyPart: 'core', equipment: 'none', level: 'beginner', instructions: 'Lie on back, extend opposite arm and leg, alternate sides. Keep back flat.', muscles: ['core', 'hip flexors'], type: 'home' },
  { name: 'Side Plank', bodyPart: 'core', equipment: 'none', level: 'intermediate', instructions: 'On one forearm and side of foot, hold body in straight line.', muscles: ['obliques', 'core'], type: 'home' },
  { name: 'Cable Woodchops', bodyPart: 'core', equipment: 'cables', level: 'intermediate', instructions: 'Pull cable diagonally across body from high to low. Great for rotational core.', muscles: ['obliques', 'core'], type: 'gym' },
  { name: 'Hanging Leg Raises', bodyPart: 'core', equipment: 'pull-up bar', level: 'advanced', instructions: 'Hang from bar, raise legs to 90° or higher, lower with control.', muscles: ['lower abs', 'hip flexors'], type: 'gym' },

  // FULL BODY / CARDIO
  { name: 'Burpees', bodyPart: 'full_body', equipment: 'none', level: 'intermediate', instructions: 'Squat, kick feet back to push-up, push-up, jump feet forward, jump up.', muscles: ['full body'], type: 'home' },
  { name: 'Jumping Jacks', bodyPart: 'full_body', equipment: 'none', level: 'beginner', instructions: 'Jump feet apart while raising arms overhead, jump back to start.', muscles: ['full body'], type: 'home' },
  { name: 'High Knees', bodyPart: 'full_body', equipment: 'none', level: 'beginner', instructions: 'Run in place, driving knees up as high as possible. Keep pace fast.', muscles: ['hip flexors', 'core', 'quads'], type: 'home' },
  { name: 'Bear Crawl', bodyPart: 'full_body', equipment: 'none', level: 'intermediate', instructions: 'On hands and toes, knees hovering off ground, crawl forward/backward.', muscles: ['core', 'shoulders', 'quads'], type: 'home' },
  { name: 'Yoga - Sun Salutation', bodyPart: 'full_body', equipment: 'none', level: 'beginner', instructions: 'A flowing sequence of poses. Great for flexibility and warmth.', muscles: ['full body'], type: 'home' },
];

export function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase();
  return EXERCISES.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.bodyPart.toLowerCase().includes(q) ||
    e.muscles.some(m => m.toLowerCase().includes(q)) ||
    e.type.toLowerCase().includes(q) ||
    e.level.toLowerCase().includes(q)
  );
}

export function getExercisesByBodyPart(bodyPart: string, workoutType?: string, level?: string): Exercise[] {
  return EXERCISES.filter(e => {
    let match = e.bodyPart === bodyPart;
    if (workoutType) match = match && e.type === workoutType;
    if (level) match = match && (e.level === level || e.level === 'beginner');
    return match;
  });
}

export function formatExerciseInfo(exercise: Exercise): string {
  return `💪 **${exercise.name}**\n` +
    `📍 Body Part: ${exercise.bodyPart}\n` +
    `🏋️ Equipment: ${exercise.equipment}\n` +
    `📊 Level: ${exercise.level}\n` +
    `🎯 Muscles: ${exercise.muscles.join(', ')}\n` +
    `🏠 Type: ${exercise.type === 'home' ? 'Home' : 'Gym'}\n\n` +
    `📝 How to do it:\n${exercise.instructions}`;
}
