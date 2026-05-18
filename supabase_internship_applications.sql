-- Run this in your Supabase SQL Editor to create the table for the Application Form

CREATE TABLE IF NOT EXISTS internship_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  college text NOT NULL,
  year_of_study text NOT NULL,
  course_of_study text NOT NULL,
  internship_domain text NOT NULL,
  terms_accepted boolean NOT NULL
);

-- (Optional) Enable Row Level Security (RLS) and allow public inserts if you want to insert directly from the client without a secret key
-- ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public inserts on internship_applications" ON internship_applications FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow read access to authenticated users only" ON internship_applications FOR SELECT USING (auth.role() = 'authenticated');
