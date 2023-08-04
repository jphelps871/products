import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://auadmybidlhxtnwcecgh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1YWRteWJpZGxoeHRud2NlY2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5Mjg4MDEsImV4cCI6MjAwNTUwNDgwMX0._tsRDWBMbjhP0IfAzjiDtXLwxWmVqyFuh89t2tQ8V5g';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase