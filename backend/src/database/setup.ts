import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

console.log(`
╔══════════════════════════════════════════╗
║   🏋️  FitCoach AI — Database Setup      ║
╚══════════════════════════════════════════╝
`);
console.log('This script shows you the SQL to run in Supabase Dashboard.');
console.log('');
console.log('Go to: Supabase Dashboard → SQL Editor → New Query');
console.log('Paste the SQL below and click "Run":');
console.log('');
console.log('═'.repeat(60));
console.log(`

-- ============================================
-- FITNESS COACH AI - Database Tables
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  telegram_id TEXT UNIQUE,
  name TEXT,
  age INTEGER,
  gender TEXT,
  weight REAL,
  height REAL,
  fitness_level TEXT DEFAULT 'beginner',
  goal TEXT DEFAULT 'general_fitness',
  diet_type TEXT DEFAULT 'non_vegetarian',
  workout_type TEXT DEFAULT 'home',
  injuries TEXT,
  daily_calorie_target REAL,
  daily_water_target REAL DEFAULT 3.0,
  points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Beginner',
  streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_workouts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS weight_logs (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  weight REAL NOT NULL,
  bmi REAL,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workout_logs (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  workout_type TEXT,
  body_part TEXT,
  duration_minutes INTEGER,
  exercises_count INTEGER,
  calories_burned REAL,
  completed BOOLEAN DEFAULT true,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meal_logs (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  meal_type TEXT,
  description TEXT,
  calories REAL,
  protein REAL,
  carbs REAL,
  fat REAL,
  health_rating INTEGER,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_history (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  agent TEXT,
  channel TEXT DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS workout_plans (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  plan_name TEXT,
  plan_data TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reminders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  reminder_type TEXT,
  time TEXT,
  message TEXT,
  is_active BOOLEAN DEFAULT true,
  channel TEXT DEFAULT 'telegram',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (allow all for now)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations with anon key)
CREATE POLICY "Allow all" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON weight_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON workout_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON meal_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON chat_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON workout_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON reminders FOR ALL USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_weight_user ON weight_logs(user_id, logged_at);
CREATE INDEX IF NOT EXISTS idx_workout_user ON workout_logs(user_id, logged_at);
CREATE INDEX IF NOT EXISTS idx_meal_user ON meal_logs(user_id, logged_at);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_history(user_id, created_at);

`);
console.log('═'.repeat(60));
console.log('');
console.log('After running the SQL, your database is ready! 🎉');
