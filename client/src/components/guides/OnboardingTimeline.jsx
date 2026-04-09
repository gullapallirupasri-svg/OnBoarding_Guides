import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { parseTimeline, categoryColors } from '../../utils/parseTimeline';

const categoryLabels = {
  setup: '⚙️ Setup',
  social: '👥 Social',
  technical: '💻 Technical',
  review: '📋 Review',
};

const OnboardingTimeline = ({ content }) => {
  const [expandedPeriod, setExpandedPeriod] = useState(null);
  const [hoveredPeriod, setHoveredPeriod] = useState(null);

  const timeline = useMemo(() => parseTimeline(content), [content]);
  const activePeriods = timeline.filter((p) => p.hasContent);

  if (activePeriods.length === 0) return null;

  return (
    <div className="glass-card p-6 mb-6 overflow-hidden">
      <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
        <span className="text-lg">🗺️</span>
        Onboarding Timeline
      </h3>

      {/* Desktop Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-700/50" />
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Milestones */}
          <div className="relative flex justify-between">
            {timeline.map((period, idx) => {
              const isActive = period.hasContent;
              const isExpanded = expandedPeriod === period.key;
              const isHovered = hoveredPeriod === period.key;
              const mainSection = period.sections[0];
              const colors = mainSection ? categoryColors[mainSection.category] : null;

              return (
                <div
                  key={period.key}
                  className="flex flex-col items-center relative"
                  style={{ width: `${100 / timeline.length}%` }}
                  onMouseEnter={() => isActive && setHoveredPeriod(period.key)}
                  onMouseLeave={() => setHoveredPeriod(null)}
                >
                  {/* Dot */}
                  <motion.button
                    onClick={() => isActive && setExpandedPeriod(isExpanded ? null : period.key)}
                    className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? isExpanded
                          ? `${colors?.dot || 'bg-primary-500'} border-transparent shadow-lg`
                          : `bg-surface-900 ${colors?.border || 'border-surface-600'} hover:scale-110 cursor-pointer`
                        : 'bg-surface-900 border-surface-700/50 cursor-default'
                    }`}
                    whileHover={isActive ? { scale: 1.15 } : {}}
                    whileTap={isActive ? { scale: 0.95 } : {}}
                  >
                    {isActive ? (
                      <span className="text-xs font-bold text-white">{period.sections.length}</span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-surface-700" />
                    )}
                  </motion.button>

                  {/* Label */}
                  <span
                    className={`mt-2.5 text-xs font-medium ${
                      isActive ? 'text-surface-300' : 'text-surface-600'
                    }`}
                  >
                    {period.label}
                  </span>

                  {/* Hover Preview */}
                  <AnimatePresence>
                    {isHovered && !isExpanded && mainSection && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-14 z-30 w-48 p-3 rounded-xl border ${colors?.bg || ''} ${colors?.border || 'border-surface-700'}`}
                        style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)' }}
                      >
                        <p className={`text-xs font-semibold mb-1 ${colors?.text || 'text-surface-300'}`}>
                          {mainSection.title}
                        </p>
                        <p className="text-[11px] text-surface-500 leading-relaxed line-clamp-3">
                          {mainSection.summary || 'Click to expand'}
                        </p>
                        {period.sections.length > 1 && (
                          <p className="text-[10px] text-surface-600 mt-1.5">
                            +{period.sections.length - 1} more sections
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Expanded Period Detail */}
          <AnimatePresence>
            {expandedPeriod && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface-800/30 rounded-xl p-5 border border-surface-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white text-sm">
                      {timeline.find((p) => p.key === expandedPeriod)?.label}
                    </h4>
                    <button
                      onClick={() => setExpandedPeriod(null)}
                      className="text-surface-500 hover:text-surface-300 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeline
                      .find((p) => p.key === expandedPeriod)
                      ?.sections.map((section, sIdx) => {
                        const sColors = categoryColors[section.category];
                        return (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sIdx * 0.05 }}
                            className={`p-4 rounded-xl border ${sColors.bg} ${sColors.border}`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-2 h-2 rounded-full ${sColors.dot}`} />
                              <span className={`text-[10px] font-medium uppercase tracking-wider ${sColors.text}`}>
                                {categoryLabels[section.category]}
                              </span>
                            </div>
                            <h5 className="font-medium text-surface-200 text-sm mb-1">
                              {section.title}
                            </h5>
                            <p className="text-xs text-surface-500 leading-relaxed">
                              {section.summary || 'Check the guide for details'}
                            </p>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden space-y-3">
        {activePeriods.map((period, idx) => {
          const mainSection = period.sections[0];
          const colors = mainSection ? categoryColors[mainSection.category] : null;
          const isExpanded = expandedPeriod === period.key;

          return (
            <motion.div
              key={period.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <button
                onClick={() => setExpandedPeriod(isExpanded ? null : period.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  isExpanded
                    ? `${colors?.bg || ''} ${colors?.border || 'border-surface-700'}`
                    : 'bg-surface-800/30 border-surface-700/30 hover:border-surface-600'
                }`}
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${colors?.dot || 'bg-surface-600'}`} />
                <div className="flex-1 text-left">
                  <span className="text-xs font-semibold text-surface-400">{period.label}</span>
                  <p className="text-sm font-medium text-surface-200 truncate">
                    {mainSection?.title || period.label}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-surface-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-2 space-y-2 border-l-2 border-surface-700/50 pl-4">
                      {period.sections.map((section) => (
                        <div key={section.id} className="py-2">
                          <p className={`text-xs font-medium ${categoryColors[section.category]?.text || 'text-surface-300'}`}>
                            {section.title}
                          </p>
                          <p className="text-[11px] text-surface-500 mt-0.5">{section.summary}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-surface-800/50">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${categoryColors[key].dot}`} />
            <span className="text-[11px] text-surface-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingTimeline;
