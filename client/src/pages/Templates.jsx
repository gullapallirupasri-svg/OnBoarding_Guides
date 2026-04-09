import { motion } from 'framer-motion';
import { BookTemplate, Sparkles } from 'lucide-react';
import { templates } from '../data/templates';
import TemplateCard from '../components/templates/TemplateCard';

const Templates = () => {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          <BookTemplate size={28} className="inline mr-2 text-primary-400" />
          Template Library
        </h1>
        <p className="text-surface-400">
          Start from a pre-built template and customize it to your needs
        </p>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 mb-8 flex items-center gap-3 bg-primary-500/5 border-primary-500/20"
      >
        <Sparkles size={18} className="text-primary-400 flex-shrink-0" />
        <p className="text-sm text-surface-300">
          Click any template to <strong className="text-primary-300">pre-fill the generator form</strong>. You can customize every field before generating your guide.
        </p>
      </motion.div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <TemplateCard key={template.id} template={template} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Templates;
