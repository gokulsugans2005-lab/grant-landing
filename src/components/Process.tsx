import { Search, PenSquare, Send, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      icon: Search,
      num: '01',
      title: 'AI Smart Discovery',
      description: 'Our recommendations engine scans thousands of public and private funding sources to match your project criteria automatically.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: PenSquare,
      num: '02',
      title: 'Collaborative Proposal Builder',
      description: 'Draft proposals together in real time. Use integrated generative models to polish text, write executive summaries, and format layouts.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Send,
      num: '03',
      title: 'Audit-Ready Submission',
      description: 'Run automatic compliance checks, cross-reference package requirements, and submit through secure integrations with major grant portals.',
      gradient: 'from-fuchsia-500 to-pink-500',
    },
    {
      icon: BarChart2,
      num: '04',
      title: 'Post-Award Compliance',
      description: 'Automatically track spendings, milestone achievements, and impact metrics. Generate instant board-ready reports to maintain trust.',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section id="process" className="section-container border-t border-white/5 bg-slate-950">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
          <span className="text-sm font-semibold gradient-text">⚙️ How it Works</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-display font-bold">
          Streamlining Your Workflow, <span className="gradient-text">Step by Step</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
          From initial search to reporting back on impact, GrantFlow manages the full complexity of funding.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection line in large viewports */}
        <div className="hidden lg:block absolute top-1/4 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-emerald-500/20 -z-10" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              className="relative p-6 glass-panel bg-slate-900/40 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Stepper badge */}
              <div className="absolute -top-5 left-6 w-10 h-10 bg-slate-950 border border-white/10 rounded-full flex items-center justify-center font-bold text-slate-400 font-display">
                {step.num}
              </div>

              <div className="mt-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-3 flex items-center justify-center shadow-lg`}>
                  <Icon className="text-white" size={20} />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
