import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Básico', 'Personalidade', 'História', 'Finalizar'];

export default function CreateBot() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    slogan: '',
    intro: '',
    personality: '',
    likes: '',
    dislikes: '',
    charm_contrast: '',
    hidden_habits: '',
    relationship_with_user: '',
    opening_story: '',
    first_message: '',
  });

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  const handleCreate = async () => {
    if (!user) return;
    if (!form.name.trim()) { toast.error('Nome é obrigatório'); return; }
    setLoading(true);

    const { error } = await supabase.from('bots').insert({
      creator_id: user.id,
      name: form.name,
      slogan: form.slogan,
      intro: form.intro,
      personality: form.personality,
      likes: form.likes,
      dislikes: form.dislikes,
      charm_contrast: form.charm_contrast,
      hidden_habits: form.hidden_habits,
      relationship_with_user: form.relationship_with_user,
      opening_story: form.opening_story,
      first_message: form.first_message,
    });

    if (error) {
      toast.error('Erro ao criar bot: ' + error.message);
    } else {
      toast.success('Bot criado com sucesso!');
      navigate('/library');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t('bots.create')}</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${i <= step ? 'bg-primary' : 'bg-border'}`} />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{STEPS[step]}</p>
      </div>

      <div className="flex-1 p-4 space-y-4 animate-in fade-in duration-300">
        {step === 0 && (
          <>
            <Field label="Nome do Bot *" value={form.name} onChange={v => update('name', v)} />
            <Field label="Slogan" value={form.slogan} onChange={v => update('slogan', v)} />
            <FieldArea label="Introdução" value={form.intro} onChange={v => update('intro', v)} placeholder="Apresentação curta do bot..." />
          </>
        )}

        {step === 1 && (
          <>
            <FieldArea label="Personalidade" value={form.personality} onChange={v => update('personality', v)} placeholder="Descreva a personalidade..." />
            <Field label="Gostos" value={form.likes} onChange={v => update('likes', v)} />
            <Field label="Não gosta" value={form.dislikes} onChange={v => update('dislikes', v)} />
            <FieldArea label="Contraste de charme" value={form.charm_contrast} onChange={v => update('charm_contrast', v)} placeholder="O que torna esse bot único..." />
            <FieldArea label="Hábitos ocultos" value={form.hidden_habits} onChange={v => update('hidden_habits', v)} />
          </>
        )}

        {step === 2 && (
          <>
            <FieldArea label="Relação com o usuário" value={form.relationship_with_user} onChange={v => update('relationship_with_user', v)} placeholder="Como o bot se relaciona com o usuário..." />
            <FieldArea label="História de abertura" value={form.opening_story} onChange={v => update('opening_story', v)} placeholder="O cenário inicial..." />
            <FieldArea label="Primeira mensagem" value={form.first_message} onChange={v => update('first_message', v)} placeholder="A primeira coisa que o bot diz..." />
          </>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="rounded-2xl bg-card border border-border/30 p-4 space-y-2">
              <h3 className="font-bold text-lg">{form.name || 'Sem nome'}</h3>
              {form.slogan && <p className="text-sm text-muted-foreground">{form.slogan}</p>}
              {form.intro && <p className="text-sm">{form.intro}</p>}
            </div>
            <p className="text-xs text-muted-foreground text-center">Revise e confirme a criação do seu bot</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="sticky bottom-20 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 flex gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-xl flex-1">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep(s => s + 1)} className="rounded-xl flex-1">
            Próximo <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleCreate} disabled={loading} className="rounded-xl flex-1 bg-primary">
            <Check className="h-4 w-4 mr-1" /> {loading ? 'Criando...' : 'Criar Bot'}
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="h-11 rounded-xl bg-card border-border/50" />
    </div>
  );
}

function FieldArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="rounded-xl bg-card border-border/50 min-h-[80px]" />
    </div>
  );
}
