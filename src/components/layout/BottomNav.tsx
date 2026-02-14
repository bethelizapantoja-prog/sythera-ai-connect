import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Globe, MessageSquare, Sparkles, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'library', icon: BookOpen, path: '/library', labelKey: 'nav.library' },
  { key: 'social', icon: Globe, path: '/social', labelKey: 'nav.social' },
  { key: 'servers', icon: MessageSquare, path: '/servers', labelKey: 'nav.servers' },
  { key: 'create', icon: Sparkles, path: '/create-bot', labelKey: 'nav.create' },
  { key: 'profile', icon: User, path: '/profile', labelKey: 'nav.profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map(({ key, icon: Icon, path, labelKey }) => {
          const isActive = location.pathname.startsWith(path);
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'drop-shadow-[0_0_6px_hsl(var(--primary))]')} />
              <span className="text-[10px] font-medium leading-none">{t(labelKey)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
