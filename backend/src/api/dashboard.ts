import { Router, Request, Response } from 'express';
import { UserService } from '../services/user-service';
import { ProgressService } from '../services/progress-service';
import { GamificationService } from '../services/gamification';
import { searchExercises } from '../skills/exercise-library';

const router = Router();

router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const [stats, weeklyReport, chartData, gamification] = await Promise.all([
      UserService.getStatsSummary(req.params.userId),
      ProgressService.getWeeklyReport(req.params.userId),
      ProgressService.getProgressChartData(req.params.userId, 30),
      GamificationService.getGamificationData(req.params.userId),
    ]);
    res.json({ stats, weeklyReport, chartData, gamification });
  } catch (e) { res.status(500).json({ error: 'Failed to load dashboard' }); }
});

router.get('/exercises/search', (req: Request, res: Response) => {
  try { res.json(searchExercises(req.query.q as string || '')); }
  catch (e) { res.status(500).json({ error: 'Search failed' }); }
});

export default router;
