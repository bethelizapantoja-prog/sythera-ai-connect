import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, AlertCircle, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Servers() {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Since servers table was removed in the new schema, show empty state
  // This page can be repurposed for conversations/chat history

  const { data: conversations, isLoading, isError, refetch } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('conversations')
        .select('*, bot:bots!conversations_bot_id_fkey(id, name, avatar_url, slogan)')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Conversas</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/30">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-muted-foreground">Erro ao carregar conversas</p>
            <Button variant="outline" onClick={() => refetch()} className="rounded-xl">Tentar novamente</Button>
          </div>
        ) : !conversations || conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-center">Nenhuma conversa ainda</p>
            <p className="text-xs text-muted-foreground text-center">Visite a Biblioteca e converse com um bot!</p>
          </div>
        ) : (
          conversations.map((conv, i) => {
            const bot = conv.bot as { id: string; name: string; avatar_url: string; slogan: string } | null;
            return (
              <div
                key={conv.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/30 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {bot?.avatar_url ? (
                    <img src={bot.avatar_url} alt={bot.name} className="h-full w-full object-cover" />
                  ) : (
                    <Users className="h-5 w-5 text-primary/50" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{bot?.name || 'Bot'}</p>
                  <p className="text-xs text-muted-foreground truncate">{bot?.slogan || 'Sem mensagens'}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
