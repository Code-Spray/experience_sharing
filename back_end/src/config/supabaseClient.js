import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

/**
 * Supabase client using the Service Role key (bypasses RLS — backend only).
 * Falls back to null when env vars are missing (dev without Supabase).
 */
export const supabase =
  env.supabaseUrl && env.supabaseServiceKey
    ? createClient(env.supabaseUrl, env.supabaseServiceKey)
    : null;
