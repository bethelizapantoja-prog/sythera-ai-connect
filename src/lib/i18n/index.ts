import ptBR from './pt-BR.json';
import en from './en.json';

export const translations: Record<string, Record<string, any>> = {
  'pt-BR': ptBR,
  'en': en,
};

export type Language = 'pt-BR' | 'en';

export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path;
}
