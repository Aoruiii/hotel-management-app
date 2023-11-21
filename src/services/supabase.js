import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mkzysbeyitrlychtefcs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1renlzYmV5aXRybHljaHRlZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxOTE4NjUsImV4cCI6MjAxNTc2Nzg2NX0.bgGJB-rKKA87B_VVTZAhVputrbAuEQcQcZQ1ZhrDLp4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
