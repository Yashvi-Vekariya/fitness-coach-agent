export default {
  name: 'progress-tracker',
  async onMessage(context: any) {
    return { handled: true, response: 'Routed to progress tracking backend' };
  },
};
