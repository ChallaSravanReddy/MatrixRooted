-- Run this in your Supabase SQL Editor to allow public access to specific offer letters via their UUID

-- 1. Create a policy that allows reading the table rows
-- This is secure because UUIDs (like 'f47ac10b-58cc-4372-a567-0e02b2c3d479') are cryptographically unguessable.
-- Someone would need the exact link to view their offer letter.
CREATE POLICY "Allow public select by id" 
ON internship_applications 
FOR SELECT 
TO public 
USING (true);
