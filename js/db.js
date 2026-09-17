// Supabase database configuration and client helper
// You can hardcode your Supabase URL and Anon Key here, or configure them through the admin panel (saved in localStorage).

const DEFAULT_SUPABASE_URL = ""; // E.g., "https://xyzcompany.supabase.co"
const DEFAULT_SUPABASE_KEY = ""; // E.g., "eyJhbGciOiJIUzI1NiIsIn..."

// Helper to get configuration
function getSupabaseConfig() {
  const url = localStorage.getItem("SUPABASE_URL") || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem("SUPABASE_KEY") || DEFAULT_SUPABASE_KEY;
  return { url, key };
}

// Helper to save configuration
function saveSupabaseConfig(url, key) {
  if (url) localStorage.setItem("SUPABASE_URL", url);
  else localStorage.removeItem("SUPABASE_URL");
  
  if (key) localStorage.setItem("SUPABASE_KEY", key);
  else localStorage.removeItem("SUPABASE_KEY");
}

let supabaseClient = null;

// Initialize Supabase Client
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  
  const config = getSupabaseConfig();
  if (!config.url || !config.key) {
    return null;
  }
  
  try {
    // supabase comes from the CDN script tag: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    if (typeof supabase !== 'undefined') {
      supabaseClient = supabase.createClient(config.url, config.key);
      return supabaseClient;
    }
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
  }
  return null;
}
