import { ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  user: any;
  onOpenAuth: () => void;
  onOpenBooking: () => void;
}

export default function Hero({ user, onOpenAuth, onOpenBooking }: HeroProps) {
  const handleTrialClick = () => {
    if (!user) {
      onOpenAuth();
    } else {
      alert(`Welcome back, ${user.user_metadata?.full_name || user.email}! Your free trial is active.`);
    }
  };

  return (
    <section className="section-container pt-20 lg:pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <motion.div
              className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold gradient-text">✨ Transform Your Funding Journey</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="gradient-text text-glow">Transform Your Funding Lifecycle</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Streamline grant discovery, application, and management with intelligent automation. Collaborate seamlessly across teams and unlock insights that drive impact.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <motion.div
                className="glass-panel p-4"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold gradient-text">94%</div>
                <p className="text-xs text-slate-400 mt-1">Success Rate</p>
              </motion.div>
              <motion.div
                className="glass-panel p-4"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold gradient-text">500K+</div>
                <p className="text-xs text-slate-400 mt-1">Grants Tracked</p>
              </motion.div>
              <motion.div
                className="glass-panel p-4"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold gradient-text">$8B+</div>
                <p className="text-xs text-slate-400 mt-1">Funded</p>
              </motion.div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              onClick={handleTrialClick}
              className="btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{user ? 'View Dashboard' : 'Start Free Trial'}</span>
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={onOpenBooking}
              className="btn-outline flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Dashboard Mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel p-6 lg:p-8 hover:border-white/20 transition-all duration-300 shadow-glow bg-slate-900/50 backdrop-blur-xl">
            {/* Simulated Dashboard Header */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-300">Grant Dashboard</h3>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-semibold">Active</span>
              </div>

              {/* Mock Chart */}
              <div className="space-y-3">
                <div className="flex items-end gap-2 h-40 bg-slate-800/30 rounded-lg p-4">
                  {[65, 40, 78, 52, 88, 72, 95, 68].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-indigo-600 via-violet-500 to-emerald-500 rounded-t-lg"
                      style={{ height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>

              {/* Application Pipeline */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-slate-400">Application Pipeline</div>
                <div className="space-y-2">
                  {['Discovery', 'Draft', 'Review', 'Submit', 'Track'].map((stage, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-white/5"
                      whileHover={{ x: 5, backgroundColor: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <div className={`w-2 h-2 rounded-full ${i <= 2 ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                      <span className="text-xs text-slate-300">{stage}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Budget Allocation */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400">Budget Allocation</div>
                {['Research', 'Operations', 'Marketing', 'Development'].map((category, i) => {
                  const percentages = [45, 30, 15, 10];
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">{category}</span>
                        <span className="text-slate-300 font-semibold">{percentages[i]}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentages[i]}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-sm font-bold gradient-text">$2.4M</div>
                  <p className="text-xs text-slate-400">Total Funded</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold gradient-text">12</div>
                  <p className="text-xs text-slate-400">Active Grants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Icons */}
          <motion.div
            className="absolute top-4 right-4 text-indigo-400 pointer-events-none"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BarChart3 size={32} />
          </motion.div>
          <motion.div
            className="absolute bottom-8 -left-12 text-violet-400 pointer-events-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TrendingUp size={40} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
