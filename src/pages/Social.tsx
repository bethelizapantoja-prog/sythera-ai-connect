import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function Social() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{t('social.feed')}</h1>
      </div>
      <p className="text-muted-foreground">{t('common.loading')}</p>
    </div>
  );
}
