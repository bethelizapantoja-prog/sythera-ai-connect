import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen } from 'lucide-react';

export default function Library() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{t('bots.library')}</h1>
      </div>
      <p className="text-muted-foreground">{t('bots.noResults')}</p>
    </div>
  );
}
