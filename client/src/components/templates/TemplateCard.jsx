import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Megaphone, TrendingUp, Headphones, Users, GitBranch } from 'lucide-react';

const iconMap = {
  Code2,
  Megaphone,
  TrendingUp,
  HeadphonesIcon: Headphones,
  Users,
  GitBranch,
};

const TemplateCard = ({ template, index = 0 }) => {
  const navigate = useNavigate();
  const Icon = iconMap[template.icon] || Code2;

  const handleUse = () => {
    navigate('/generator', { state: { prefillData: template.formData } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card-hover p-6 group cursor-pointer"
      onClick={handleUse}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon size={22} className="text-white" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
        {template.title}
      </h3>

      <p className="text-sm text-surface-400 mb-4 leading-relaxed">
        {template.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {template.formData.tools.slice(0, 4).map((tool) => (
          <span key={tool} className="px-2 py-0.5 text-xs bg-surface-800 text-surface-400 rounded-md border border-surface-700/50">
            {tool}
          </span>
        ))}
        {template.formData.tools.length > 4 && (
          <span className="px-2 py-0.5 text-xs text-surface-500">
            +{template.formData.tools.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center text-primary-400 text-sm font-medium group-hover:gap-2 gap-1 transition-all">
        Use Template <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};

export default TemplateCard;
