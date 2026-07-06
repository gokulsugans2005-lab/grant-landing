import { useState } from 'react';
import { Menu, X, ArrowRight, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenBooking: () => void;
}

export default function Navbar({ user, onLogout, onOpenAuth, onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ['Features', 'Process', 'Use Cases', 'Pricing', 'FAQs'];

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-500 rounded-xl flex items-center justify-center font-bold text-white shadow-glow transition-shadow duration-300">
              GF
            </div>
            <span className="font-display font-bold text-xl gradient-text hidden sm:inline-block">
              GrantFlow
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-slate-300 hover:text-white font-medium transition-colors duration-300 relative group py-2"
                whileHover={{ color: '#ffffff' }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm">
                  <User size={14} className="text-indigo-400" />
                  <span className="max-w-[120px] truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <motion.button
                onClick={onOpenAuth}
                className="btn-secondary text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}
            <motion.button
              onClick={onOpenBooking}
              className="btn-primary text-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Demo
              <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden lg:hidden border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-slate-300 hover:text-white font-medium py-2 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-4 space-y-2 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm">
                    <User size={14} className="text-indigo-400" />
                    <span className="truncate">{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg text-sm border border-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={() => {
                    onOpenAuth();
                    setIsOpen(false);
                  }}
                  className="w-full btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              )}
              <motion.button
                onClick={() => {
                  onOpenBooking();
                  setIsOpen(false);
                }}
                className="w-full btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
