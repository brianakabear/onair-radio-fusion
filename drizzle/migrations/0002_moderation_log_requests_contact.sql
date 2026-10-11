CREATE TABLE public.moderation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL,
  target_user_id uuid,
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.moderation_log TO authenticated;
GRANT ALL ON public.moderation_log TO service_role;
ALTER TABLE public.moderation_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read moderation log" ON public.moderation_log FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.log_chat_delete()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND auth.uid() <> OLD.user_id AND COALESCE(current_setting('app.bulk_clear', true), '') <> '1' THEN
    INSERT INTO public.moderation_log (actor_id, action, target_user_id, details)
    VALUES (auth.uid(), 'deleted_message', OLD.user_id, left(OLD.content, 300));
  END IF;
  RETURN OLD;
END $$;
CREATE TRIGGER chat_delete_log AFTER DELETE ON public.chat_messages FOR EACH ROW EXECUTE FUNCTION public.log_chat_delete();

CREATE OR REPLACE FUNCTION public.log_ban_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.is_banned IS DISTINCT FROM OLD.is_banned THEN
    INSERT INTO public.moderation_log (actor_id, action, target_user_id)
    VALUES (auth.uid(), CASE WHEN NEW.is_banned THEN 'blocked_user' ELSE 'unblocked_user' END, NEW.id);
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER profiles_ban_log AFTER UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.log_ban_change();

CREATE OR REPLACE FUNCTION public.clear_user_chat(_user_id uuid)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n integer;
BEGIN
  IF NOT public.is_staff(auth.uid()) THEN RAISE EXCEPTION 'Not allowed'; END IF;
  PERFORM set_config('app.bulk_clear', '1', true);
  DELETE FROM public.chat_messages WHERE user_id = _user_id;
  GET DIAGNOSTICS n = ROW_COUNT;
  PERFORM set_config('app.bulk_clear', '', true);
  INSERT INTO public.moderation_log (actor_id, action, target_user_id, details)
  VALUES (auth.uid(), 'cleared_history', _user_id, n || ' messages removed');
  RETURN n;
END $$;
REVOKE EXECUTE ON FUNCTION public.clear_user_chat(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.clear_user_chat(uuid) TO authenticated;

CREATE TABLE public.song_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  song text NOT NULL CHECK (char_length(song) BETWEEN 1 AND 200),
  artist text CHECK (artist IS NULL OR char_length(artist) <= 200),
  message text CHECK (message IS NULL OR char_length(message) <= 1000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','done')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.song_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.song_requests TO authenticated;
GRANT ALL ON public.song_requests TO service_role;
ALTER TABLE public.song_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a request" ON public.song_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Staff read requests" ON public.song_requests FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff update requests" ON public.song_requests FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete requests" ON public.song_requests FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  sms_opt_in boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','done')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a contact message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Staff read contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff update contact messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete contact messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));