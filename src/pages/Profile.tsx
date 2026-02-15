import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Moon, Sun, LogOut, Settings, Crown, Edit } from 'lucide-react';

export default function Profile() {
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-full">
      {/* Banner */}
      <div className="relative h-36 bg-gradient-to-br from-primary/30 via-primary/10 to-background">
        <div className="absolute -bottom-10 left-4">
          <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {profile?.name?.charAt(0)?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="pt-14 px-4 pb-4 space-y-6">
        {/* User info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{profile?.name || 'Usuário'}</h1>
            {profile?.is_premium && <Crown className="h-4 w-4 text-yellow-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{profile?.email}</p>
        </div>

        <Button variant="outline" className="w-full rounded-xl gap-2">
          <Edit className="h-4 w-4" /> {t('profile.editProfile')}
        </Button>

        {/* Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">{t('settings.title')}</h3>
          </div>

          <div className="rounded-2xl border border-border/50 divide-y divide-border/50 overflow-hidden">
            {/* Theme */}
            <div className="flex items-center justify-between p-4 bg-card">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
                <span className="text-sm">{theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}</span>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
          </div>

          <Button variant="destructive" className="w-full rounded-xl" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('auth.logout')}
          </Button>
        </div>
      </div>
    </div>
  );
}
