import { supervisorAgent } from '../agents/supervisor';
import { workoutAgent } from '../agents/workout-agent';
import { nutritionAgent } from '../agents/nutrition-agent';
import { progressAgent } from '../agents/progress-agent';
import { motivationAgent } from '../agents/motivation-agent';
import { UserService } from '../services/user-service';
import { getContextForAgent } from '../rag/retriever';

export class FitnessCoachSkill {
  static name = 'fitness-coach';
  static triggers = ['workout', 'exercise', 'fitness', 'gym', 'diet', 'nutrition', 'calorie', 'weight', 'bmi', 'progress'];

  static async handleMessage(message: string, userId: string, chatHistory: any[] = []) {
    const user = await UserService.getOrCreateUser(userId);
    const route = await supervisorAgent(message);
    const ragContext = getContextForAgent(message);
    const augmented = ragContext ? `${message}\n${ragContext}` : message;
    let response: string;
    switch (route.route) {
      case 'workout': response = await workoutAgent(augmented, user, chatHistory); break;
      case 'nutrition': response = await nutritionAgent(augmented, user, chatHistory); break;
      case 'progress': response = await progressAgent(augmented, user, chatHistory); break;
      case 'motivation': response = await motivationAgent(augmented, user, chatHistory); break;
      default: response = await workoutAgent(augmented, user, chatHistory);
    }
    return { response, agent: route.route };
  }
}
