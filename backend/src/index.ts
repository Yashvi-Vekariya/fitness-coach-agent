import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { initDatabase } from './database/supabase';
import chatRouter from './api/chat';
import userRouter from './api/user';
import progressRouter from './api/progress';
import dashboardRouter from './api/dashboard';

dotenv.config({ path: '../.env' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use('/api/', rateLimit({ windowMs: 60000, max: 30, message: { error: 'Too many requests' } }));

app.get('/', (_req, res) => {
  res.json({ name: '🏋️ FitCoach AI Agent', status: 'running', version: '1.0.0', database: 'Supabase' });
});
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use('/api/chat', chatRouter);
app.use('/api/user', userRouter);
app.use('/api/progress', progressRouter);
app.use('/api/dashboard', dashboardRouter);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`
  ╔══════════════════════════════════════════╗
  ║   🏋️  FitCoach AI Agent - Backend       ║
  ║   Running on port ${PORT}                   ║
  ║   Database: Supabase                     ║
  ║   API: http://localhost:${PORT}             ║
  ╚══════════════════════════════════════════╝
    `);
  });
}

start();
export default app;
