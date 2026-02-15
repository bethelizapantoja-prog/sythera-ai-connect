import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, BookOpen, Star, AlertCircle, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

export default function Library() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: bots, isLoading, isError, refetch } = useQuery({
    queryKey: ['bots', search],
    queryFn: async () => {
      let query = supabase
        .from('bots')
        .select('*')
        .eq('privacy', 'public')
        .order('total_likes', { ascending: false })
        .limit(50);

      if (search.trim()) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const tags = ['Todos', 'Romance', 'Aventura', 'Ficção', 'Humor', 'Terror', 'NSFW'];

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t('bots.library')}</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('bots.search')}
            className="pl-10 h-11 rounded-xl bg-card border-border/50"
          />
        </div>

        {/* Tags scroll */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === 'Todos' ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                (tag === 'Todos' && !activeTag) || activeTag === tag
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border/30">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-muted-foreground text-center">Erro ao carregar bots</p>
            <Button variant="outline" onClick={() => refetch()} className="rounded-xl">
              Tentar novamente
            </Button>
          </div>
        ) : !bots || bots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-center">{t('bots.noResults')}</p>
            <Button onClick={() => navigate('/create-bot')} className="rounded-xl">
              {t('bots.create')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {bots.map((bot, i) => (
              <button
                key={bot.id}
                onClick={() => navigate(`/bot/${bot.id}`)}
                className="group rounded-2xl overflow-hidden bg-card border border-border/30 text-left transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                {/* Avatar */}
                <div className="aspect-[3/4] bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  {bot.avatar_url ? (
                    <img src={bot.avatar_url} alt={bot.name} className="w-full h-full object-cover" />
                  ) : (
                    <Bot className="h-12 w-12 text-primary/40" />
                  )}
                </div>

                {/* Info */}
                <div className="p-3 space-y-1.5">
                  <h3 className="font-semibold text-sm truncate">{bot.name}</h3>
                  {bot.slogan && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{bot.slogan}</p>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 text-primary" />
                    <span className="text-xs text-muted-foreground">{bot.total_likes}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
