import { Router, Request, Response } from 'express';
import { ProgressService } from '../services/progress-service';
import { GamificationService } from '../services/gamification';

const router = Router();

router.post('/:userId/weight', async (req: Request, res: Response) => {
  try { res.json(await ProgressService.logWeight(req.params.userId, req.body.weight)); }
  catch (e) { res.status(500).json({ error: 'Failed to log weight' }); }
});

router.post('/:userId/workout', async (req: Request, res: Response) => {
  try { res.json(await ProgressService.logWorkout(req.params.userId, req.body)); }
  catch (e) { res.status(500).json({ error: 'Failed to log workout' }); }
});

router.post('/:userId/meal', async (req: Request, res: Response) => {
  try { res.json(await ProgressService.logMeal(req.params.userId, req.body)); }
  catch (e) { res.status(500).json({ error: 'Failed to log meal' }); }
});

router.get('/:userId/weekly-report', async (req: Request, res: Response) => {
  try { res.json(await ProgressService.getWeeklyReport(req.params.userId)); }
  catch (e) { res.status(500).json({ error: 'Failed to generate report' }); }
});

router.get('/:userId/charts', async (req: Request, res: Response) => {
  try { res.json(await ProgressService.getProgressChartData(req.params.userId, parseInt(req.query.days as string) || 30)); }
  catch (e) { res.status(500).json({ error: 'Failed to get chart data' }); }
});

router.get('/:userId/gamification', async (req: Request, res: Response) => {
  try { res.json(await GamificationService.getGamificationData(req.params.userId)); }
  catch (e) { res.status(500).json({ error: 'Failed to get gamification data' }); }
});

export default router;
