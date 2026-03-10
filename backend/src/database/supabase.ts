import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_ANON_KEY are required in .env');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function initDatabase(): Promise<void> {
  console.log('✅ Supabase client initialized');
  console.log('📌 URL:', supabaseUrl?.slice(0, 30) + '...');

  // Test connection
  const { error } = await supabase.from('users').select('id').limit(1);
  if (error && error.code === '42P01') {
    console.log('⚠️  Tables not found. Run: npm run setup-db');
    console.log('   Or create tables in Supabase Dashboard → SQL Editor');
  } else if (error) {
    console.log('⚠️  Supabase connection issue:', error.message);
  } else {
    console.log('✅ Database connected successfully');
  }
}

export default supabase;
