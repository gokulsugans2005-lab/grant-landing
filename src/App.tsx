import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { motion } from 'framer-motion';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Initialize session
  useEffect(() => {
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Offline/Demo Mode check
      const savedSession = localStorage.getItem('demo_user_session');
      if (savedSession) {
        setUser(JSON.parse(savedSession).user);
      }
    }
  }, []);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('demo_user_session');
    }
    setUser(null);
  };

  const handleAuthSuccess = (session: any) => {
    setUser(session.user);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Animated gradient mesh blobs in background */}
      <motion.div
        className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        animate={{
          y: [0, 60, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="fixed top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        animate={{
          y: [0, -60, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        animate={{
          y: [0, 60, 0],
          x: [0, -60, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(79, 70, 229, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 70, 229, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Layout Components */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <Hero
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <Features />
      <Process />
      <UseCases />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />

      {/* Modals Overlay */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
