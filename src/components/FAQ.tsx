import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does the AI smart search work?',
      a: 'Our smart discovery engine indexes federal, municipal, and philanthropic grant databases. By analyzing your organization profile, past awards, and project outline, it scores and ranks matches, showing only those grants you are highly qualified to win.',
    },
    {
      q: 'Can we collaborate with external partners?',
      a: 'Absolutely. You can invite external co-investigators, copywriters, or compliance reviewers to specific grant threads. You can restrict their permissions to read-only or allow them to edit proposals concurrently with your team.',
    },
    {
      q: 'Is our data secure and kept private?',
      a: 'Yes, security is a top priority. All client drafts, documents, and private data are fully encrypted at rest and in transit. We never use your proprietary proposal content to train public AI models. All workspace items are isolated and secure.',
    },
    {
      q: 'What is post-award compliance tracking?',
      a: 'Once you win a grant, the system sets up an audit-ready compliance workspace. It automatically links milestone dates with calendar tasks, alerts you to file report packages, and aggregates expenses from your financial systems to prove where funds were spent.',
    },
    {
      q: 'Can we cancel or change plans at any time?',
      a: 'Yes. You can upgrade, downgrade, or cancel your monthly or yearly subscription directly from your team settings page. If you cancel, your access remains active until the end of the current billing cycle.',
    },
  ];

  const handleToggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="section-container border-t border-white/5 bg-slate-950">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
          <span className="text-sm font-semibold gradient-text">❓ Got Questions?</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-display font-bold">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
          Have questions about security, collaboration, or billing? Find answers here.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <motion.div
              key={idx}
              className="glass-panel overflow-hidden border border-white/10 bg-slate-900/35"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left text-white font-semibold text-base focus:outline-none hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle size={18} className="text-indigo-400 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-400 shrink-0"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-5 pt-0 text-sm text-slate-400 border-t border-white/5 leading-relaxed bg-slate-900/10">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
