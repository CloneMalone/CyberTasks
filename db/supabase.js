import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Create database client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);