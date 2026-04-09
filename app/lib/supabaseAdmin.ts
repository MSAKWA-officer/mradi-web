import { createClient } from "@supabase/supabase-js";

// Hakikisha hapa tunachukua value moja kwa moja
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // Hii itakusaidia kuona kwenye terminal kama kweli key inasomeka
  console.log("⚠️ Supabase Config missing:", { 
    url: !!supabaseUrl, 
    key: !!supabaseServiceKey 
  });
}

export const supabaseAdmin = createClient(
  supabaseUrl || "https://kjqbqdlktzxfoltwvfvv.supabase.co", // placeholder kuzuia crash
  supabaseServiceKey || "sb_publishable_3QEglnCS8Fd-jtsdbJyNoQ_srGxPfvB"
);
