import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Building2, Briefcase, Trash2, Eye, Globe, Lock, ExternalLink } from 'lucide-react';

const GuideCard = ({ guide, onDelete, onTogglePublic, index = 0 }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card-hover p-5 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3
            onClick={() => navigate(`/guide/${guide._id}`)}
            className="font-semibold text-white truncate cursor-pointer hover:text-primary-300 transition-colors"
          >
            {guide.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            {guide.role && (
              <span className="flex items-center gap-1 text-xs text-surface-500">
                <Briefcase size={12} />
                {guide.role}
              </span>
            )}
            {guide.department && (
              <span className="flex items-center gap-1 text-xs text-surface-500">
                <Building2 size={12} />
                {guide.department}
              </span>
            )}
          </div>
        </div>
        {guide.llmProvider && (
          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
            guide.llmProvider === 'groq'
              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              : 'bg-green-500/10 text-green-400 border border-green-500/20'
          }`}>
            {guide.llmProvider === 'groq' ? 'Groq' : 'NVIDIA'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-surface-600 mb-4">
        <Calendar size={12} />
        {formatDate(guide.createdAt)}
        {guide.isPublic && (
          <span className="flex items-center gap-1 text-green-500">
            <Globe size={12} /> Public
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-surface-800/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigate(`/guide/${guide._id}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-lg hover:bg-primary-500/20 transition-colors"
        >
          <Eye size={13} /> View
        </button>
        <button
          onClick={() => onTogglePublic && onTogglePublic(guide._id)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-400 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors"
        >
          {guide.isPublic ? <Lock size={13} /> : <Globe size={13} />}
          {guide.isPublic ? 'Private' : 'Share'}
        </button>
        {guide.isPublic && guide.slug && (
          <button
            onClick={() => window.open(`/shared/${guide.slug}`, '_blank')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-400 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors"
          >
            <ExternalLink size={13} /> Link
          </button>
        )}
        <button
          onClick={() => onDelete && onDelete(guide._id)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors ml-auto"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default GuideCard;
