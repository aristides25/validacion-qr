import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pczxtwdddgmxvixmnzby.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjenh0d2RkZGdteHZpeG1uemJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDgwMzcsImV4cCI6MjA1MTU4NDAzN30.uqdY56vL0OyAZxJG7sXeLxo8ey6kPXaH63x04943xcg'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase 