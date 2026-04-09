import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Circle, Clock, ChevronDown, ChevronRight,
  Calendar, Loader2, BarChart3
} from 'lucide-react';
import { guidesAPI } from '../../services/api';
import toast from 'react-hot-toast';

const dueCategoryLabels = {
  day1: { label: 'Day 1', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  day3: { label: 'Day 3', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  week1: { label: 'Week 1', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  week2: { label: 'Week 2', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  month1: { label: 'Month 1', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  month2: { label: 'Month 2', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  month3: { label: 'Month 3', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
};

const statusConfig = {
  not_started: {
    icon: Circle,
    label: 'Not Started',
    color: 'text-surface-500',
    bg: 'bg-surface-800/50',
    border: 'border-surface-600/50',
    pill: 'bg-surface-700 text-surface-400',
  },
  in_progress: {
    icon: Clock,
    label: 'In Progress',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/5',
    border: 'border-yellow-500/30',
    pill: 'bg-yellow-500/15 text-yellow-400',
  },
  complete: {
    icon: CheckCircle2,
    label: 'Complete',
    color: 'text-green-400',
    bg: 'bg-green-500/5',
    border: 'border-green-500/30',
    pill: 'bg-green-500/15 text-green-400',
  },
};

const nextStatus = {
  not_started: 'in_progress',
  in_progress: 'complete',
  complete: 'not_started',
};

const ChecklistPanel = ({ guideId, checklist = [], onUpdate }) => {
  const [items, setItems] = useState(checklist);
  const [updatingId, setUpdatingId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const total = items.length;
  const completed = items.filter((i) => i.status === 'complete').length;
  const inProgress = items.filter((i) => i.status === 'in_progress').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleStatusToggle = async (itemId, currentStatus) => {
    const newStatus = nextStatus[currentStatus];
    setUpdatingId(itemId);

    try {
      const res = await guidesAPI.updateChecklist(guideId, { itemId, status: newStatus });
      setItems(res.data.checklist);
      if (onUpdate) onUpdate(res.data.checklist);
    } catch {
      toast.error('Failed to update checklist.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await guidesAPI.generateChecklist(guideId);
      setItems(res.data.checklist);
      if (onUpdate) onUpdate(res.data.checklist);
      toast.success(res.data.message);
    } catch {
      toast.error('Failed to generate checklist.');
    } finally {
      setGenerating(false);
    }
  };

  // Group by due category
  const groups = {};
  for (const item of items) {
    const cat = item.dueCategory || 'week1';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }

  const toggleGroup = (key) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (total === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <BarChart3 size={36} className="text-surface-600 mx-auto mb-3" />
        <h3 className="font-semibold text-surface-300 mb-1 text-sm">No Checklist Yet</h3>
        <p className="text-xs text-surface-500 mb-4">
          Generate an interactive checklist from this guide's sections
        </p>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-xl text-sm hover:shadow-lg hover:shadow-primary-500/20 transition-all disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <CheckCircle2 size={14} />
              Generate Checklist
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Progress Header */}
      <div className="p-5 border-b border-surface-700/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary-400" />
            Onboarding Checklist
          </h3>
          <span className="text-xs font-medium text-surface-400">
            {completed}/{total} tasks
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-surface-800 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-surface-500">
            {percentage}% complete
          </span>
          <div className="flex items-center gap-3">
            <span className="text-yellow-400">{inProgress} in progress</span>
            <span className="text-green-400">{completed} done</span>
          </div>
        </div>
      </div>

      {/* Checklist Items grouped by due date */}
      <div className="divide-y divide-surface-800/50">
        {Object.entries(dueCategoryLabels).map(([key, catInfo]) => {
          const groupItems = groups[key];
          if (!groupItems || groupItems.length === 0) return null;

          const groupCompleted = groupItems.filter((i) => i.status === 'complete').length;
          const isCollapsed = collapsed[key];

          return (
            <div key={key}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(key)}
                className="w-full px-5 py-3 flex items-center justify-between hover:bg-surface-800/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {isCollapsed ? (
                    <ChevronRight size={14} className="text-surface-500" />
                  ) : (
                    <ChevronDown size={14} className="text-surface-500" />
                  )}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${catInfo.color}`}>
                    {catInfo.label}
                  </span>
                </div>
                <span className="text-xs text-surface-500">
                  {groupCompleted}/{groupItems.length}
                </span>
              </button>

              {/* Items */}
              {!isCollapsed &&
                groupItems.map((item) => {
                  const config = statusConfig[item.status];
                  const StatusIcon = config.icon;
                  const isUpdating = updatingId === item._id;

                  return (
                    <motion.div
                      key={item._id}
                      layout
                      className={`px-5 py-3 flex items-center gap-3 border-l-2 ml-5 ${config.border} ${config.bg} hover:bg-surface-800/20 transition-all cursor-pointer`}
                      onClick={() => !isUpdating && handleStatusToggle(item._id, item.status)}
                    >
                      <div className={`flex-shrink-0 ${config.color}`}>
                        {isUpdating ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <StatusIcon size={18} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            item.status === 'complete' ? 'text-surface-500 line-through' : 'text-surface-200'
                          }`}
                        >
                          {item.sectionTitle}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${config.pill}`}>
                        {config.label}
                      </span>
                    </motion.div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistPanel;
