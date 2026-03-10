// OpenClaw Fitness Coach Skill
// This skill integrates with the FitCoach AI backend

export default {
  name: 'fitness-coach',

  async onMessage(context: any) {
    const { message, user, memory } = context;

    // The main agent logic is handled by the backend server
    // This skill file is for OpenClaw integration reference

    return {
      handled: true,
      response: 'Routed to FitCoach AI backend',
    };
  },
};
