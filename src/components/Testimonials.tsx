import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Director of Development',
      org: 'Urban Youth Initiative',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      text: 'Using GrantFlow cut our writing workflow in half. The AI recommendations suggested foundations we had completely overlooked, and we secured $150K in new funding within our first quarter.',
      stars: 5,
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Principal Investigator',
      org: 'BioGen Research Labs',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      text: 'Academic grant compliance is a logistical nightmare. GrantFlow tracks policies automatically, saving our lab team hours of reporting and ensuring overhead distributions are perfectly accurate.',
      stars: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Community Giving Lead',
      org: 'Aura Foundation',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      text: 'As grant makers, receiving clean, structured submissions is critical. Since advising our nonprofit partners to draft via GrantFlow, submission quality has gone through the roof.',
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="section-container border-t border-white/5 bg-slate-950">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-4">
          <span className="text-sm font-semibold gradient-text">💬 Customer Stories</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-display font-bold">
          Trusted by <span className="gradient-text">High-Impact Teams</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
          See how nonprofits, labs, and foundations are using GrantFlow to accelerate and simplify operations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            className="glass-panel p-6 bg-slate-900/40 relative flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-6 right-6 text-slate-700 pointer-events-none">
              <Quote size={40} />
            </div>

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-emerald-400 text-emerald-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-300 text-sm leading-relaxed relative z-10 italic">
                "{rev.text}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
              <img
                src={rev.img}
                alt={rev.name}
                className="w-12 h-12 rounded-full border border-white/10 object-cover"
              />
              <div>
                <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                <p className="text-xs text-slate-400">{rev.role}</p>
                <p className="text-xs text-indigo-400 font-semibold">{rev.org}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
