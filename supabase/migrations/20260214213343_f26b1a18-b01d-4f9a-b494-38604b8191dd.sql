
-- =============================================
-- SYTHERA IA — FASE 1: SCHEMA COMPLETO
-- =============================================

-- 1. ENUM TYPES
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.sender_type AS ENUM ('user', 'bot');
CREATE TYPE public.chat_mode AS ENUM ('normal', 'roleplay');
CREATE TYPE public.report_status AS ENUM ('pending', 'resolved', 'ignored');
CREATE TYPE public.report_target_type AS ENUM ('user', 'bot', 'post', 'message', 'server');
CREATE TYPE public.author_type AS ENUM ('user', 'bot');
CREATE TYPE public.reaction_type AS ENUM ('like', 'love', 'laugh', 'wow', 'sad', 'angry');

-- 2. PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  date_of_birth DATE NOT NULL,
  gender TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  reputation_global INT DEFAULT 0,
  followers_fake INT DEFAULT 0,
  nsfw_enabled BOOLEAN DEFAULT false,
  preferred_language TEXT DEFAULT 'pt-BR',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. USER ROLES TABLE (separate from profiles per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- 4. BOTS TABLE
CREATE TABLE public.bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gender TEXT DEFAULT '',
  slogan TEXT DEFAULT '',
  creator_note TEXT DEFAULT '',
  is_public BOOLEAN DEFAULT true,
  nsfw BOOLEAN DEFAULT false,
  personality_type TEXT DEFAULT '',
  personality_json JSONB DEFAULT '{}',
  history TEXT DEFAULT '',
  first_message TEXT DEFAULT '',
  status_config JSONB DEFAULT '{}',
  speech_style TEXT DEFAULT '',
  life_experience TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  reputation INT DEFAULT 0,
  followers_fake INT DEFAULT 0,
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. BOT NPCS
CREATE TABLE public.bot_npcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES public.bots(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT DEFAULT '',
  description TEXT DEFAULT ''
);

-- 6. CONVERSATIONS
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id UUID NOT NULL REFERENCES public.bots(id) ON DELETE CASCADE,
  mode chat_mode DEFAULT 'normal',
  relationship_points INT DEFAULT 0,
  auto_memory_json JSONB DEFAULT '{}',
  manual_memory_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, bot_id)
);

-- 7. MESSAGES
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type sender_type NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  message_type TEXT DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. SERVERS
CREATE TABLE public.servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  is_18_plus BOOLEAN DEFAULT false,
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. SERVER MEMBERS
CREATE TABLE public.server_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES public.servers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(server_id, user_id)
);

-- 10. SERVER BOTS
CREATE TABLE public.server_bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES public.servers(id) ON DELETE CASCADE,
  bot_id UUID NOT NULL REFERENCES public.bots(id) ON DELETE CASCADE,
  UNIQUE(server_id, bot_id)
);

-- 11. POSTS
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_type author_type NOT NULL DEFAULT 'user',
  author_id UUID NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT DEFAULT '',
  reputation_delta INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. POST COMMENTS
CREATE TABLE public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_type author_type NOT NULL DEFAULT 'user',
  author_id UUID NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. POST REACTIONS
CREATE TABLE public.post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction reaction_type NOT NULL DEFAULT 'like',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- 14. REPORTS
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type report_target_type NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT NOT NULL DEFAULT '',
  status report_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. WEB SEARCH CACHE
CREATE TABLE public.web_search_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  results JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 16. SERVER MESSAGES (group chat)
CREATE TABLE public.server_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES public.servers(id) ON DELETE CASCADE,
  sender_type sender_type NOT NULL,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 17. PRIVATE MESSAGES (user↔user in server)
CREATE TABLE public.private_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_messages_conversation ON public.messages(conversation_id, created_at DESC);
CREATE INDEX idx_posts_created ON public.posts(created_at DESC);
CREATE INDEX idx_server_messages_server ON public.server_messages(server_id, created_at DESC);
CREATE INDEX idx_bots_tags ON public.bots USING GIN(tags);
CREATE INDEX idx_bots_public ON public.bots(is_public, nsfw);
CREATE INDEX idx_web_search_cache_query ON public.web_search_cache(query);

-- =============================================
-- SECURITY DEFINER HELPER FUNCTIONS
-- =============================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_server_member(_server_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.server_members WHERE server_id = _server_id AND user_id = _user_id
  )
$$;

CREATE OR REPLACE FUNCTION public.is_server_owner(_server_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.servers WHERE id = _server_id AND owner_id = _user_id
  )
$$;

CREATE OR REPLACE FUNCTION public.can_view_nsfw(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id
      AND nsfw_enabled = true
      AND date_of_birth <= CURRENT_DATE - INTERVAL '18 years'
  )
$$;

-- =============================================
-- ENABLE RLS ON ALL TABLES
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_search_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES
-- =============================================

-- PROFILES
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- USER ROLES
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Only admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- BOTS
CREATE POLICY "Anyone can view public bots" ON public.bots FOR SELECT TO authenticated USING (is_public = true OR creator_id = auth.uid());
CREATE POLICY "Users can create bots" ON public.bots FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update own bots" ON public.bots FOR UPDATE TO authenticated USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete own bots" ON public.bots FOR DELETE TO authenticated USING (auth.uid() = creator_id);

-- BOT NPCS
CREATE POLICY "Anyone can view bot npcs" ON public.bot_npcs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Bot owner can manage npcs" ON public.bot_npcs FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.bots WHERE id = bot_id AND creator_id = auth.uid())
);
CREATE POLICY "Bot owner can update npcs" ON public.bot_npcs FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.bots WHERE id = bot_id AND creator_id = auth.uid())
);
CREATE POLICY "Bot owner can delete npcs" ON public.bot_npcs FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.bots WHERE id = bot_id AND creator_id = auth.uid())
);

-- CONVERSATIONS
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON public.conversations FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON public.conversations FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- MESSAGES
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert messages" ON public.messages FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE TO authenticated USING (
  sender_type = 'user' AND EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid())
);

-- SERVERS
CREATE POLICY "Anyone can view servers" ON public.servers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create servers" ON public.servers FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update servers" ON public.servers FOR UPDATE TO authenticated USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete servers" ON public.servers FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- SERVER MEMBERS
CREATE POLICY "Members can view server members" ON public.server_members FOR SELECT TO authenticated USING (public.is_server_member(server_id, auth.uid()));
CREATE POLICY "Users can join servers" ON public.server_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave or owners remove" ON public.server_members FOR DELETE TO authenticated USING (
  auth.uid() = user_id OR public.is_server_owner(server_id, auth.uid())
);

-- SERVER BOTS
CREATE POLICY "Members can view server bots" ON public.server_bots FOR SELECT TO authenticated USING (public.is_server_member(server_id, auth.uid()));
CREATE POLICY "Owners can add bots" ON public.server_bots FOR INSERT TO authenticated WITH CHECK (public.is_server_owner(server_id, auth.uid()));
CREATE POLICY "Owners can remove bots" ON public.server_bots FOR DELETE TO authenticated USING (public.is_server_owner(server_id, auth.uid()));

-- POSTS
CREATE POLICY "Anyone can view posts" ON public.posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (author_type = 'user' AND author_id = auth.uid());
CREATE POLICY "Users can update own posts" ON public.posts FOR UPDATE TO authenticated USING (author_type = 'user' AND author_id = auth.uid());
CREATE POLICY "Users can delete own posts" ON public.posts FOR DELETE TO authenticated USING (author_type = 'user' AND author_id = auth.uid());

-- POST COMMENTS
CREATE POLICY "Anyone can view comments" ON public.post_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create comments" ON public.post_comments FOR INSERT TO authenticated WITH CHECK (author_type = 'user' AND author_id = auth.uid());
CREATE POLICY "Users can delete own comments" ON public.post_comments FOR DELETE TO authenticated USING (author_type = 'user' AND author_id = auth.uid());

-- POST REACTIONS
CREATE POLICY "Anyone can view reactions" ON public.post_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can react" ON public.post_reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove reaction" ON public.post_reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- REPORTS
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins can view reports" ON public.reports FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')
);
CREATE POLICY "Admins can update reports" ON public.reports FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')
);

-- WEB SEARCH CACHE (only service role / edge functions)
CREATE POLICY "Service can manage cache" ON public.web_search_cache FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SERVER MESSAGES
CREATE POLICY "Members can view server messages" ON public.server_messages FOR SELECT TO authenticated USING (public.is_server_member(server_id, auth.uid()));
CREATE POLICY "Members can send server messages" ON public.server_messages FOR INSERT TO authenticated WITH CHECK (
  sender_type = 'user' AND sender_id = auth.uid() AND public.is_server_member(server_id, auth.uid())
);

-- PRIVATE MESSAGES
CREATE POLICY "Users can view own private messages" ON public.private_messages FOR SELECT TO authenticated USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send private messages" ON public.private_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name, date_of_birth)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE((NEW.raw_user_meta_data->>'date_of_birth')::DATE, '2000-01-01')
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- =============================================
-- ENABLE REALTIME
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.server_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.private_messages;

-- =============================================
-- STORAGE BUCKETS
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('bot-avatars', 'bot-avatars', true);

-- Storage RLS
CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view post images" ON storage.objects FOR SELECT USING (bucket_id = 'post-images');
CREATE POLICY "Users can upload post images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'post-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view bot avatars" ON storage.objects FOR SELECT USING (bucket_id = 'bot-avatars');
CREATE POLICY "Users can upload bot avatars" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'bot-avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);
