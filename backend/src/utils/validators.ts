export function validateUserProfile(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.age && (data.age < 10 || data.age > 120)) errors.push('Age must be between 10 and 120');
  if (data.weight && (data.weight < 20 || data.weight > 300)) errors.push('Weight must be between 20 and 300 kg');
  if (data.height && (data.height < 100 || data.height > 250)) errors.push('Height must be between 100 and 250 cm');
  if (data.gender && !['male', 'female', 'other'].includes(data.gender)) errors.push('Gender must be male, female, or other');
  if (data.fitness_level && !['beginner', 'intermediate', 'advanced'].includes(data.fitness_level)) errors.push('Invalid fitness level');
  if (data.goal && !['weight_loss', 'muscle_gain', 'flexibility', 'endurance', 'general_fitness'].includes(data.goal)) errors.push('Invalid goal');

  return { valid: errors.length === 0, errors };
}

export function sanitizeInput(input: string): string {
  return input.trim().slice(0, 2000); // Max 2000 chars
}
