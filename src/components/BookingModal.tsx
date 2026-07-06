import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedOrg = org.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedOrg) {
      setError('Please fill in all required fields.');
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
          .from('demo_bookings')
          .insert([{ name: trimmedName, email: trimmedEmail, organization: trimmedOrg, message: trimmedMessage }]);

        if (dbError) throw dbError;
      } else {
        // Demo mode fallback: simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Demo mode booking request:', { name: trimmedName, email: trimmedEmail, org: trimmedOrg, message: trimmedMessage });
      }

      setSuccess(true);
      setTimeout(() => {
        // Reset and close
        setName('');
        setEmail('');
        setOrg('');
        setMessage('');
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
            className="relative w-full max-w-lg overflow-hidden glass-panel bg-slate-900 border border-white/10 p-6 md:p-8 text-left shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white">Demo Scheduled!</h3>
                <p className="text-slate-300 max-w-sm">
                  Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. We've recorded your interest for <span className="text-indigo-400">{org}</span>.
                </p>
                {!isSupabaseConfigured() && (
                  <span className="text-xs px-3 py-1 bg-yellow-500/10 text-yellow-300 rounded-full border border-yellow-500/20">
                    💡 Running in Sandbox / Demo Mode
                  </span>
                )}
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Schedule a Demo</h3>
                    <p className="text-sm text-slate-400">See how GrantFlow fits your organization.</p>
                  </div>
                </div>

                {!isSupabaseConfigured() && (
                  <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-start gap-2.5">
                    <AlertCircle className="text-indigo-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-indigo-200">
                      Supabase keys not yet configured. The form will run in offline sandbox mode.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@organization.org"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Global Tech Solutions"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Brief Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your grant management challenges..."
                      rows={3}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                      <AlertCircle size={16} />
                      <span>{error}</span>
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
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
