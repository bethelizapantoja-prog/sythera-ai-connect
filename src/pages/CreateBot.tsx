import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function CreateBot() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{t('bots.create')}</h1>
      </div>
      <p className="text-muted-foreground">{t('common.loading')}</p>
    </div>
  );
}
