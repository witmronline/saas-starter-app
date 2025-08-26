import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://awgghvzxtgbofcjuovzd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3Z2dodnp4dGdib2ZjanVvdnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTE2OTMsImV4cCI6MjA3MTYyNzY5M30.DO98qmep6v4xu1o_Px9aZ33aoNcdLAio9YweIb0958k";
export const supabase = createClient(supabaseUrl, supabaseKey);
