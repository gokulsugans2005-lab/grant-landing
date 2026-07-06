import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isSupabaseConfigured()) {
        const { error: dbError } = await supabase
          .from('subscribers')
          .insert([{ email: trimmedEmail }]);

        if (dbError) {
          if (dbError.code === '23505') {
            throw new Error('This email is already subscribed!');
          }
          throw dbError;
        }
      } else {
        // Demo Mode Fallback
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log('Demo mode subscriber email:', trimmedEmail);
      }

      setSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                GF
              </div>
              <span className="font-display font-bold text-lg text-white">GrantFlow</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Revolutionizing the full funding lifecycle for nonprofits, laboratories, and corporate giving teams through intelligent, secure automation.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Workflows</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Get Platform Updates</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Subscribe to receive updates on federal policy changes, compliance rules, and product features.
            </p>

            {success ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold">
                <CheckCircle2 size={16} />
                <span>Successfully Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Mail size={14} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.org"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-1.5 text-red-400 text-[10px]">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer h-8"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={12} />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} GrantFlow Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Secured by SSL</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
