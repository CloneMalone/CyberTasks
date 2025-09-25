require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Create database client
const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase }