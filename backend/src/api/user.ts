import { Router, Request, Response } from 'express';
import { UserService } from '../services/user-service';
import { validateUserProfile } from '../utils/validators';

const router = Router();

router.get('/:userId', async (req: Request, res: Response) => {
  try { res.json(await UserService.getOrCreateUser(req.params.userId)); }
  catch (e) { res.status(500).json({ error: 'Failed to get user' }); }
});

router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const v = validateUserProfile(req.body);
    if (!v.valid) return res.status(400).json({ errors: v.errors });
    res.json(await UserService.updateProfile(req.params.userId, req.body));
  } catch (e) { res.status(500).json({ error: 'Failed to update profile' }); }
});

router.get('/:userId/stats', async (req: Request, res: Response) => {
  try { res.json(await UserService.getStatsSummary(req.params.userId)); }
  catch (e) { res.status(500).json({ error: 'Failed to get stats' }); }
});

router.post('/bmi', (req: Request, res: Response) => {
  try {
    const { weight, height } = req.body;
    if (!weight || !height) return res.status(400).json({ error: 'Weight and height required' });
    res.json(UserService.calculateBMI(weight, height));
  } catch (e) { res.status(500).json({ error: 'Failed to calculate BMI' }); }
});

router.get('/:userId/tdee', async (req: Request, res: Response) => {
  try {
    const user = await UserService.getOrCreateUser(req.params.userId);
    const tdee = UserService.calculateTDEE(user, (req.query.activity as string) || 'moderate');
    res.json({ tdee });
  } catch (e) { res.status(500).json({ error: 'Failed to calculate TDEE' }); }
});

export default router;
