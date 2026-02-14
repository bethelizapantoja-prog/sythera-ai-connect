import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare } from 'lucide-react';

export default function Servers() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{t('servers.title')}</h1>
      </div>
      <p className="text-muted-foreground">{t('common.loading')}</p>
    </div>
  );
}
