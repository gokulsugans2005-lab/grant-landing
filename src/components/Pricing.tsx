import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tiers = [
    {
      name: 'Starter',
      description: 'Ideal for small nonprofits and independent researchers starting out.',
      price: billingCycle === 'yearly' ? 79 : 99,
      features: [
        'Up to 3 active grant applications',
        'Basic AI Search Recommendations',
        'Single workspace channel',
        'Standard templates & boilerplates',
        'Email Support',
      ],
      cta: 'Start Free Trial',
      popular: false,
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      name: 'Growth',
      description: 'Perfect for growing community organizations and research teams.',
      price: billingCycle === 'yearly' ? 199 : 249,
      features: [
        'Unlimited active grant applications',
        'Advanced AI matching & auto-drafting',
        'Up to 10 team seats',
        'Post-award budget & compliance trackers',
        'Priority Slack & email support',
      ],
      cta: 'Start Free Trial',
      popular: true,
      gradient: 'from-indigo-600/35 to-violet-600/35',
    },
    {
      name: 'Enterprise',
      description: 'For large universities, hospital labs, and corporate grant makers.',
      price: 'Custom',
      features: [
        'Multi-department overhead distribution',
        'Unlimited team seats & workspaces',
        'Custom grant portals for foundation givers',
        'Dedicated success manager',
        'SLA uptime & custom API integrations',
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
  ];

  return (
    <section id="pricing" className="section-container border-t border-white/5 bg-slate-950">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-4">
          <span className="text-sm font-semibold gradient-text">💳 Flat Pricing</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-display font-bold">
          Transparent Plans, <span className="gradient-text">No Hidden Fees</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
          Choose a workspace tier that fits your team's funding objectives.
        </p>

        {/* Yearly / Monthly Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-slate-900 border border-white/10 rounded-full p-1 relative flex items-center transition-colors focus:outline-none cursor-pointer"
          >
            <motion.div
              className="w-5 h-5 bg-indigo-500 rounded-full"
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                alignSelf: billingCycle === 'monthly' ? 'flex-start' : 'flex-end',
                marginLeft: billingCycle === 'monthly' ? '0px' : 'auto',
              }}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-slate-400'}`}>
            Yearly <span className="text-emerald-400 text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 ml-1">Save 20%</span>
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            className={`glass-panel p-8 bg-slate-900/35 relative flex flex-col justify-between border hover:border-white/20 transition-all duration-300 ${
              tier.popular ? 'border-indigo-500/60 shadow-glow bg-slate-900/60' : 'border-white/10'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold rounded-full tracking-wide uppercase">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">{tier.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-8">
                {typeof tier.price === 'number' ? (
                  <>
                    <span className="text-5xl font-bold text-white font-display">${tier.price}</span>
                    <span className="text-slate-400 text-sm">/ month</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-white font-display">{tier.price}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 border-t border-white/5 pt-6">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                tier.popular
                  ? 'btn-primary'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span>{tier.cta}</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
