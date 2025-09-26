import config from "../config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
