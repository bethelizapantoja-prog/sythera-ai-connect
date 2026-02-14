import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message || t('auth.errors.generic'));
      } else {
        navigate('/library');
      }
    } else {
      if (!name.trim()) {
        toast.error(t('auth.errors.nameRequired'));
        setLoading(false);
        return;
      }
      if (!dob) {
        toast.error(t('auth.errors.dobRequired'));
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        toast.error(t('auth.errors.shortPassword'));
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        toast.error(t('auth.errors.passwordMismatch'));
        setLoading(false);
        return;
      }

      const { error } = await signUp(email, password, {
        name,
        date_of_birth: dob,
        gender,
      });
      if (error) {
        toast.error(error.message || t('auth.errors.generic'));
      } else {
        toast.success(t('auth.checkEmail'));
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">{t('app.name')}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.name')}</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">{t('auth.dateOfBirth')}</Label>
                <Input id="dob" type="date" value={dob} onChange={e => setDob(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">{t('auth.gender')}</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('auth.genderOptions.male')}</SelectItem>
                    <SelectItem value="female">{t('auth.genderOptions.female')}</SelectItem>
                    <SelectItem value="non-binary">{t('auth.genderOptions.nonBinary')}</SelectItem>
                    <SelectItem value="other">{t('auth.genderOptions.other')}</SelectItem>
                    <SelectItem value="prefer-not-to-say">{t('auth.genderOptions.preferNotToSay')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('common.loading') : isLogin ? t('auth.login') : t('auth.signup')}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? t('auth.signupHere') : t('auth.loginHere')}
          </button>
        </p>
      </div>
    </div>
  );
}
