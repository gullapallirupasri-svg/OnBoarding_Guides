import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Shield, Layers, Code2, Users, FileText } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Generation',
    description: 'Leverages LLaMA 3.1 models via Groq and NVIDIA NIM to generate rich, personalized guides in seconds.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Layers,
    title: 'Multi-Step Wizard',
    description: 'Intuitive 5-step form captures all the context needed — company info, role details, tools, culture, and preferences.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    icon: FileText,
    title: 'Template Library',
    description: 'Start from pre-built templates for common roles — developers, marketing, sales, support, and more.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Shield,
    title: 'Save & Share',
    description: 'Save guides to your library, share public links, download as PDF, or copy to clipboard.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Code2,
    title: 'Rich Markdown',
    description: 'Generated guides feature proper headings, checklists, tables, code blocks, and timeline sections.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Users,
    title: 'Team Ready',
    description: 'Build a library of guides for every role and department. Search, filter, and manage with ease.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-surface-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <img
                src="/onboard logo.jpeg"
                alt="OnboardAI Logo"
                className="w-28 h-28 mx-auto rounded-2xl shadow-2xl shadow-primary-500/20 object-cover"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-8"
            >
              <Sparkles size={14} />
              Powered by LLaMA 3.1 — Groq & NVIDIA NIM
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              <span className="text-white">Create </span>
              <span className="gradient-text">AI-Powered</span>
              <br />
              <span className="text-white">Onboarding Guides</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Generate comprehensive, personalized onboarding documents for any role in minutes.
              Just provide context, and let AI craft the perfect welcome guide.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-base !px-8 !py-4 !rounded-2xl !shadow-xl !shadow-primary-500/30"
                >
                  Get Started Free
                  <ArrowRight size={18} className="ml-2 inline" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-base !px-8 !py-4 !rounded-2xl"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="glass-card p-1 rounded-2xl shadow-2xl shadow-primary-500/10">
              <div className="bg-surface-900 rounded-xl p-6">
                {/* Fake Browser Bar */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-surface-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-surface-800 rounded-lg text-xs text-surface-500">
                      onboardai.app/generator
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center mb-3">
                      <Sparkles size={16} className="text-primary-400" />
                    </div>
                    <div className="h-2 bg-surface-700 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-surface-800 rounded w-full mb-2" />
                    <div className="h-2 bg-surface-800 rounded w-2/3" />
                  </div>
                  <div className="glass-card p-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                      <Layers size={16} className="text-purple-400" />
                    </div>
                    <div className="h-2 bg-surface-700 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-surface-800 rounded w-full mb-2" />
                    <div className="h-2 bg-surface-800 rounded w-1/2" />
                  </div>
                  <div className="glass-card p-4">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3">
                      <FileText size={16} className="text-pink-400" />
                    </div>
                    <div className="h-2 bg-surface-700 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-surface-800 rounded w-full mb-2" />
                    <div className="h-2 bg-surface-800 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to onboard <span className="gradient-text">brilliantly</span>
            </h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              A complete toolkit for creating world-class onboarding experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon size={22} className={feature.color} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 bg-gradient-to-br from-primary-500/5 to-purple-500/5"
          >
            <img
              src="/onboard logo.jpeg"
              alt="OnboardAI Logo"
              className="w-16 h-16 mx-auto mb-6 rounded-xl shadow-lg shadow-primary-500/20 object-cover"
            />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your onboarding?</h2>
            <p className="text-surface-400 mb-8 max-w-lg mx-auto">
              Join OnboardAI and create stunning onboarding guides in minutes, not days.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-base !px-10 !py-4 !rounded-2xl"
              >
                Start Creating Guides
                <ArrowRight size={18} className="ml-2 inline" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img
              src="/onboard logo.jpeg"
              alt="OnboardAI Logo"
              className="w-7 h-7 rounded-lg shadow-md object-cover"
            />
            <span className="font-bold gradient-text">OnboardAI</span>
          </div>
          <p className="text-xs text-surface-600">
            Built with React, Node.js, MongoDB, Groq & NVIDIA NIM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
