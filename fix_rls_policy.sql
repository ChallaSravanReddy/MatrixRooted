-- Run this in your Supabase SQL Editor to allow public form submissions

-- 1. Enable RLS (if it isn't already)
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing conflicting policies
DROP POLICY IF EXISTS "Allow public inserts" ON internship_applications;

-- 3. Create a policy that allows ANYONE to insert data into the table
CREATE POLICY "Allow public inserts" 
ON internship_applications 
FOR INSERT 
TO public 
WITH CHECK (true);
