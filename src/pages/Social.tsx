import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Heart, MessageCircle, Share2, AlertCircle, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

export default function Social() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, creator:users!posts_creator_id_fkey(id, name, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{t('social.feed')}</h1>
          </div>
          <Button size="icon" variant="ghost" className="rounded-xl">
            <PenSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border/30 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-muted-foreground">Erro ao carregar feed</p>
            <Button variant="outline" onClick={() => refetch()} className="rounded-xl">Tentar novamente</Button>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-center">Nenhuma publicação ainda</p>
            <Button className="rounded-xl">{t('social.newPost')}</Button>
          </div>
        ) : (
          posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))
        )}
      </div>
    </div>
  );
}

function PostCard({ post, index }: { post: any; index: number }) {
  const [liked, setLiked] = useState(false);

  const creator = post.creator as { id: string; name: string; avatar_url: string } | null;

  return (
    <div
      className="rounded-2xl bg-card border border-border/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-in fade-in slide-in-from-bottom-2"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="p-4 space-y-3">
        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={creator?.avatar_url || ''} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {creator?.name?.charAt(0)?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{creator?.name || 'Usuário'}</p>
            <p className="text-xs text-muted-foreground">
              {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR }) : ''}
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed">{post.content_text}</p>

        {/* Image */}
        {post.image_url && (
          <div className="rounded-xl overflow-hidden">
            <img src={post.image_url} alt="" className="w-full object-cover max-h-80" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLiked(!liked)}
            className={`rounded-xl gap-1.5 ${liked ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-primary' : ''}`} />
            <span className="text-xs">Curtir</span>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-xl gap-1.5 text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Comentar</span>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-xl gap-1.5 text-muted-foreground">
            <Share2 className="h-4 w-4" />
            <span className="text-xs">Compartilhar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
