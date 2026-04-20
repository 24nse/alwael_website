import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Supabase Client — Production-Ready
 *
 * Uses validated environment variables from env.ts.
 * If VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing,
 * the app will fail at startup with a clear error message
 * instead of silently degrading with a dummy client.
 */
export const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
