import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Building, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function UseCases() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Nonprofits',
      icon: Heart,
      title: 'Maximize Your Organization Impact',
      subtitle: 'For mission-driven groups looking to expand funding.',
      bullets: [
        'Automated matching with thousands of local, national, and corporate grants.',
        'Collaborative proposals builder that stores project descriptions and boilerplates.',
        'Compliance tracking that keeps audit trails completely clean for federal funds.',
      ],
      tagline: 'Save up to 40 hours per proposal write-up',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      label: 'Research & Academia',
      icon: GraduationCap,
      title: 'Accelerate Academic Discovery',
      subtitle: 'For universities, labs, and research teams.',
      bullets: [
        'Advanced compliance filters matching federal policies (NSF, NIH, DoD).',
        'Overhead allocation tools and multi-department budget trackers.',
        'Integration with academic publication databases for easier bibliography reference.',
      ],
      tagline: '94% success rate in matching federal parameters',
      gradient: 'from-indigo-500 to-cyan-500',
    },
    {
      label: 'Corporates & Givers',
      icon: Building,
      title: 'Distribute Funds Responsibly',
      subtitle: 'For corporate giving teams and private foundations.',
      bullets: [
        'Custom grant portals allowing applicants to submit directly to your system.',
        'AI scoring matrix that flags proposals matching your foundation goals.',
        'Real-time transparency reports that demonstrate where distributions are going.',
      ],
      tagline: 'Track ROI and social impact metrics dynamically',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section id="use-cases" className="section-container border-t border-white/5 bg-slate-950">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Side: Header & Tab Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
            <span className="text-sm font-semibold gradient-text">🎯 Tailored Solutions</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-white">
            Designed for <span className="gradient-text">Every Funding Scenario</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Whether you write proposal packages or distribute community funds, GrantFlow optimizes compliance and speed.
          </p>

          <div className="space-y-3 pt-4">
            {tabs.map((tab, idx) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-900 to-slate-900/50 border-indigo-500/50 shadow-lg text-white'
                      : 'bg-transparent border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <TabIcon size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">{tab.label}</span>
                    <span className="text-xs text-slate-500">{isActive ? 'Active View' : 'Learn More'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tab Details panel */}
        <div className="lg:col-span-2 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6 md:p-8 bg-slate-900/40 relative overflow-hidden border border-white/10"
            >
              {/* background color glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${tabs[activeTab].gradient} opacity-10 rounded-full blur-3xl pointer-events-none`} />

              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Sparkles size={14} />
                <span>Custom Workspace Module</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                {tabs[activeTab].title}
              </h3>
              <p className="text-slate-400 text-sm mb-6">{tabs[activeTab].subtitle}</p>

              <div className="space-y-4 mb-8">
                {tabs[activeTab].bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck size={14} />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-semibold">Projected Impact</span>
                  <span className="font-bold text-white text-sm md:text-base">{tabs[activeTab].tagline}</span>
                </div>
                <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer">
                  <span>View Case Study</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
