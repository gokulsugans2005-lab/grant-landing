import { Search, CheckCircle, TrendingUp, Users, Shield, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Discover grants matching your profile using AI-powered recommendations and advanced filters.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: CheckCircle,
      title: 'Pipeline Management',
      description: 'Track applications from discovery through award with visual dashboards and real-time updates.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Work seamlessly with team members, assign tasks, and share documents in one unified workspace.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Budget Tracking',
      description: 'Monitor spending, allocate resources, and ensure compliance with detailed financial analytics.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      title: 'Compliance',
      description: 'Automatically maintain audit trails, generate reports, and stay compliant with regulations.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'Impact Analytics',
      description: 'Measure outcomes, track impact metrics, and demonstrate value to stakeholders with rich analytics.',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="section-container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
          <span className="gradient-text">Powerful Features</span> for Modern Organizations
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Everything you need to streamline your grant management process and maximize your impact.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass-panel p-8 hover:border-white/20 transition-all duration-300 glow-effect bg-slate-900/30 backdrop-blur-sm"
              whileHover={{ y: -8, borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300`}
                whileHover={{ scale: 1.1 }}
              >
                <Icon className="text-white" size={24} />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>

              <motion.div
                className="mt-6 flex items-center text-indigo-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2 cursor-pointer"
                whileHover={{ x: 5 }}
              >
                Learn more →
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
