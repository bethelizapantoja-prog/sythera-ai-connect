import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Moon, Sun, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Profile() {
  const { user, profile, signOut, refreshProfile, isAdult } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleNsfwToggle = async (enabled: boolean) => {
    if (!isAdult && enabled) {
      toast.error('Apenas maiores de 18 podem ativar o modo 18+');
      return;
    }
    if (!user) return;
    await supabase.from('profiles').update({ nsfw_enabled: enabled }).eq('user_id', user.id);
    await refreshProfile();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      </div>

      {profile && (
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {profile.name?.charAt(0)?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <p className="text-xs text-muted-foreground">{t('profile.reputation')}: {profile.reputation_global}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">{t('settings.title')}</h3>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="text-sm">{theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}</span>
          </div>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        </div>

        {/* NSFW toggle */}
        {isAdult && (
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <span className="text-sm">{t('settings.nsfwMode')}</span>
              <p className="text-xs text-muted-foreground">{t('settings.nsfwDescription')}</p>
            </div>
            <Switch checked={profile?.nsfw_enabled ?? false} onCheckedChange={handleNsfwToggle} />
          </div>
        )}

        <Button variant="destructive" className="w-full" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          {t('auth.logout')}
        </Button>
      </div>
    </div>
  );
}
