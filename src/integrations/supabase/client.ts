import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "";
const SUPABASE_PUBLISHABLE_KEY = "";

// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
