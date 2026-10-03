/*
# Fix contact email validation

1. Modified Table
- `public.contact_messages`
- Correct the email format check so standard addresses such as `nom@domaine.com` are accepted.

2. Security
- Replace the public INSERT policy validation with the corrected email expression.
- Keep anonymous and authenticated visitors limited to INSERT access.
- Keep SELECT, UPDATE, and DELETE blocked for public client roles.

3. Data Safety
- No stored rows, columns, or table names are removed.
- This migration only relaxes an incorrectly escaped validation rule to accept valid email addresses.
*/

ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_email_check;

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_email_check CHECK (
    char_length(btrim(email)) BETWEEN 3 AND 254
    AND btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  );

DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(btrim(email)) BETWEEN 3 AND 254
  AND btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
);