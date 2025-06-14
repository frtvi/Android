import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ijspzmyvcwpgujrkiimc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqc3B6bXl2Y3dwZ3VqcmtpaW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzODcwMzUsImV4cCI6MjA2Mzk2MzAzNX0.UK9s3yCXDtf6dTqPJLrIgtalhULtUiN7Vio91MoDwEI";

// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);