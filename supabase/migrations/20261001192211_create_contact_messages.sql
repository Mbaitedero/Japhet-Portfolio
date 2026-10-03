/*
# Create contact messages table

1. New Tables
- `public.contact_messages`
- `id` (uuid, primary key): Identifiant unique du message.
- `name` (text): Nom fourni dans le formulaire, limité à 120 caractères.
- `email` (text): Adresse email du visiteur, limitée à 254 caractères.
- `message` (text): Contenu du message, limité à 5000 caractères.
- `created_at` (timestamptz): Date et heure de réception du message.

2. Security
- Enable Row Level Security on `contact_messages`.
- Allow anonymous and authenticated visitors to insert valid contact messages.
- Explicitly deny anonymous and authenticated visitors from reading, updating, or deleting messages.
- Grant only INSERT access to the public client roles.

3. Validation
- Reject empty names, emails, and messages.
- Reject malformed email values at the database boundary.

4. Important Notes
- This portfolio has no sign-in flow, so contact submissions are intentionally accepted from the anon role.
- Messages are stored for the portfolio owner to review through the Supabase dashboard or a future private administration screen.
*/

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (
    char_length(btrim(email)) BETWEEN 3 AND 254
    AND btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\\.[^[:space:]@]+$'
  ),
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.contact_messages FROM anon, authenticated;
GRANT INSERT ON TABLE public.contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(btrim(email)) BETWEEN 3 AND 254
  AND btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\\.[^[:space:]@]+$'
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
);

DROP POLICY IF EXISTS "Public cannot read contact messages" ON public.contact_messages;
CREATE POLICY "Public cannot read contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public cannot update contact messages" ON public.contact_messages;
CREATE POLICY "Public cannot update contact messages"
ON public.contact_messages
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete contact messages" ON public.contact_messages;
CREATE POLICY "Public cannot delete contact messages"
ON public.contact_messages
FOR DELETE
TO anon, authenticated
USING (false);