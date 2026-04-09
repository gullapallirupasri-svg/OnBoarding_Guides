/**
 * Parse markdown guide content into timeline milestones
 * Extracts H2 sections and categorizes them for the timeline visualization
 */

const categoryKeywords = {
  setup: ['setup', 'install', 'tools', 'environment', 'configuration', 'access', 'accounts', 'equipment', 'getting started', 'day 1', 'first day', 'welcome'],
  social: ['team', 'meet', 'introduction', 'buddy', 'mentor', 'lunch', 'social', 'culture', 'networking', 'people', 'contacts'],
  technical: ['project', 'code', 'development', 'training', 'task', 'workflow', 'process', 'technical', 'architecture', 'documentation', 'standards', 'practices'],
  review: ['review', 'feedback', 'goals', 'performance', 'evaluation', 'checkpoint', 'milestone', 'growth', 'development plan', 'career', 'autonomy'],
};

const timelinePeriods = [
  { key: 'day1', label: 'Day 1', keywords: ['day 1', 'first day', 'day one', 'welcome', 'setup', 'getting started', 'introduction'] },
  { key: 'day3', label: 'Day 3', keywords: ['day 3', 'day three', 'first few days'] },
  { key: 'week1', label: 'Week 1', keywords: ['first week', 'week 1', 'week one'] },
  { key: 'week2', label: 'Week 2', keywords: ['second week', 'week 2', 'week two'] },
  { key: 'month1', label: 'Month 1', keywords: ['first month', 'month 1', 'month one', '30 day'] },
  { key: 'month2', label: 'Month 2', keywords: ['second month', 'month 2', 'month two', '60 day'] },
  { key: 'month3', label: 'Month 3', keywords: ['third month', 'month 3', 'month three', '90 day', 'quarter'] },
];

const categoryColors = {
  setup: { bg: 'bg-blue-500/15', border: 'border-blue-500/40', text: 'text-blue-400', dot: 'bg-blue-500' },
  social: { bg: 'bg-purple-500/15', border: 'border-purple-500/40', text: 'text-purple-400', dot: 'bg-purple-500' },
  technical: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', text: 'text-emerald-400', dot: 'bg-emerald-500' },
  review: { bg: 'bg-amber-500/15', border: 'border-amber-500/40', text: 'text-amber-400', dot: 'bg-amber-500' },
};

/**
 * Determine the category of a section
 */
function getCategory(title) {
  const lower = title.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category;
    }
  }
  return 'technical'; // default
}

/**
 * Determine the timeline period of a section
 */
function getTimePeriod(title) {
  const lower = title.toLowerCase();
  for (const period of timelinePeriods) {
    if (period.keywords.some((kw) => lower.includes(kw))) {
      return period.key;
    }
  }
  return 'week1'; // default
}

/**
 * Extract the content summary (first paragraph or first 2 bullet points)
 */
function extractSummary(content) {
  const lines = content.split('\n').filter((l) => l.trim());
  const summary = [];
  for (const line of lines) {
    if (line.startsWith('#')) continue;
    const cleaned = line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '').replace(/\*\*/g, '').trim();
    if (cleaned) {
      summary.push(cleaned);
      if (summary.length >= 2) break;
    }
  }
  return summary.join(' • ');
}

/**
 * Parse full markdown content into timeline milestones
 */
export function parseTimeline(content) {
  if (!content) return [];

  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      // Save previous section
      if (currentSection) {
        currentSection.summary = extractSummary(currentContent.join('\n'));
        currentSection.rawContent = currentContent.join('\n');
        sections.push(currentSection);
      }

      const title = h2Match[1].trim();
      currentSection = {
        id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        category: getCategory(title),
        timePeriod: getTimePeriod(title),
        summary: '',
        rawContent: '',
      };
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    currentSection.summary = extractSummary(currentContent.join('\n'));
    currentSection.rawContent = currentContent.join('\n');
    sections.push(currentSection);
  }

  // Group by time period and build timeline
  const timeline = timelinePeriods.map((period) => {
    const periodSections = sections.filter((s) => s.timePeriod === period.key);
    return {
      ...period,
      sections: periodSections,
      hasContent: periodSections.length > 0,
    };
  });

  return timeline;
}

export { categoryColors, timelinePeriods };
