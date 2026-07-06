import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (session: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const validatePassword = (pass: string) => {
    // Requires at least 8 characters and 1 number
    return pass.length >= 8 && /\d/.test(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();

    if (!trimmedEmail || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (isSignUp) {
      if (!trimmedName) {
        setError('Please enter your full name.');
        return;
      }
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long and contain at least one number.');
        return;
      }
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isSupabaseConfigured()) {
        if (isSignUp) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: trimmedEmail,
            password,
            options: {
              data: {
                full_name: trimmedName,
              },
            },
          });
          if (signUpError) throw signUpError;
          setSuccessMsg('Verification email sent! Check your inbox.');
          setTimeout(() => {
            setIsSignUp(false);
            setError(null);
            setSuccessMsg(null);
          }, 4000);
        } else {
          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: trimmedEmail,
            password,
          });
          if (signInError) throw signInError;
          onAuthSuccess(data.session);
          onClose();
        }
      } else {
        // Demo Mode Fallback
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        if (isSignUp) {
          const mockUser = { id: 'demo-uuid', email, user_metadata: { full_name: fullName } };
          const mockSession = { user: mockUser, access_token: 'mock' };
          localStorage.setItem('demo_user_session', JSON.stringify(mockSession));
          setSuccessMsg('Account created successfully (Sandbox Demo)!');
          setTimeout(() => {
            onAuthSuccess(mockSession);
            onClose();
          }, 1500);
        } else {
          const mockUser = { id: 'demo-uuid', email, user_metadata: { full_name: fullName || 'Demo Member' } };
          const mockSession = { user: mockUser, access_token: 'mock' };
          localStorage.setItem('demo_user_session', JSON.stringify(mockSession));
          onAuthSuccess(mockSession);
          onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@grantflow.com');
    setPassword('password123');
    setFullName('Demo Workspace Member');
    setIsSignUp(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden glass-panel bg-slate-900 border border-white/10 p-6 md:p-8 text-left shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6 text-center">
              <div className="inline-flex w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl items-center justify-center mb-3">
                <Lock size={22} />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {isSignUp ? 'Create your Account' : 'Welcome Back'}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {isSignUp ? 'Get started managing grants today.' : 'Access your GrantFlow workspace.'}
              </p>
            </div>

            {/* Config Notice & Quick Demo Button */}
            {!isSupabaseConfigured() && (
              <div className="mb-5 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-2">
                <div className="flex items-start gap-2 text-indigo-300 text-xs">
                  <AlertCircle className="shrink-0 mt-0.5" size={15} />
                  <span>Running in sandbox mode. Try quick login below:</span>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-1.5 px-3 bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600/50 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Fill Sandbox Demo Credentials
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alexander Hamilton"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle2 size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-2 h-11"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    Sign Up
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
