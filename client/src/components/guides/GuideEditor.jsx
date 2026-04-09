import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit3, Eye, Save, X, RefreshCw, GripVertical,
  Bold, Italic, Heading, List, Link2, Code, CheckSquare,
  Loader2, ChevronUp, ChevronDown, Trash2, Plus
} from 'lucide-react';
import { generateAPI } from '../../services/api';
import GuideViewer from './GuideViewer';
import toast from 'react-hot-toast';

/**
 * Parse markdown content into sections (split by H2 headings)
 */
function parseSections(content) {
  if (!content) return [];
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      if (currentSection !== null) {
        sections.push({
          id: `section-${sections.length}`,
          title: currentSection,
          content: currentLines.join('\n').trim(),
        });
      }
      currentSection = h2Match[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Handle intro (content before first H2)
  if (currentSection === null && currentLines.length > 0) {
    sections.push({
      id: 'section-intro',
      title: 'Introduction',
      content: currentLines.join('\n').trim(),
    });
  } else if (currentSection !== null) {
    sections.push({
      id: `section-${sections.length}`,
      title: currentSection,
      content: currentLines.join('\n').trim(),
    });
  }

  return sections;
}

/**
 * Reassemble sections into markdown
 */
function assembleSections(sections) {
  return sections
    .map((s) => (s.title === 'Introduction' ? s.content : `## ${s.title}\n\n${s.content}`))
    .join('\n\n');
}

const MarkdownToolbar = ({ onInsert }) => {
  const tools = [
    { icon: Bold, label: 'Bold', insert: (text) => `**${text || 'bold'}**` },
    { icon: Italic, label: 'Italic', insert: (text) => `*${text || 'italic'}*` },
    { icon: Heading, label: 'Heading', insert: () => '### ' },
    { icon: List, label: 'List', insert: () => '- ' },
    { icon: CheckSquare, label: 'Checkbox', insert: () => '- [ ] ' },
    { icon: Link2, label: 'Link', insert: () => '[text](url)' },
    { icon: Code, label: 'Code', insert: (text) => `\`${text || 'code'}\`` },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border-b border-surface-700/50 bg-surface-800/30">
      {tools.map(({ icon: Icon, label, insert }) => (
        <button
          key={label}
          type="button"
          onClick={() => onInsert(insert(''))}
          className="p-1.5 rounded-lg text-surface-500 hover:text-surface-200 hover:bg-surface-700/50 transition-all"
          title={label}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
};

const SectionCard = ({
  section,
  index,
  totalSections,
  onEdit,
  onDelete,
  onRegenerate,
  onMoveUp,
  onMoveDown,
  regenerating,
  guideContext,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(section.content);
  const [editTitle, setEditTitle] = useState(section.title);

  const handleSave = () => {
    onEdit(section.id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(section.content);
    setEditTitle(section.title);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className="group bg-surface-800/20 border border-surface-700/30 rounded-xl overflow-hidden hover:border-surface-600/50 transition-all"
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-800/30 border-b border-surface-700/30">
        <GripVertical size={14} className="text-surface-600 cursor-grab" />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 bg-surface-800 border border-surface-600 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        ) : (
          <h4 className="flex-1 text-sm font-semibold text-surface-200">
            {section.title}
          </h4>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {index > 0 && (
            <button
              onClick={() => onMoveUp(index)}
              className="p-1 rounded text-surface-500 hover:text-surface-300 hover:bg-surface-700/50 transition-all"
              title="Move up"
            >
              <ChevronUp size={14} />
            </button>
          )}
          {index < totalSections - 1 && (
            <button
              onClick={() => onMoveDown(index)}
              className="p-1 rounded text-surface-500 hover:text-surface-300 hover:bg-surface-700/50 transition-all"
              title="Move down"
            >
              <ChevronDown size={14} />
            </button>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-1 rounded transition-all ${
              isEditing ? 'text-primary-400 bg-primary-500/10' : 'text-surface-500 hover:text-surface-300 hover:bg-surface-700/50'
            }`}
            title="Edit section"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onRegenerate(section.id, section.title, section.content)}
            disabled={regenerating === section.id}
            className="p-1 rounded text-surface-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all disabled:opacity-50"
            title="Regenerate this section"
          >
            {regenerating === section.id ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
          </button>
          {totalSections > 1 && (
            <button
              onClick={() => onDelete(section.id)}
              className="p-1 rounded text-surface-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Delete section"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Section Content */}
      {isEditing ? (
        <div>
          <MarkdownToolbar
            onInsert={(text) => setEditContent((prev) => prev + text)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full min-h-[200px] p-4 bg-transparent text-sm text-surface-200 font-mono resize-y focus:outline-none"
            placeholder="Section content in markdown..."
          />
          <div className="flex items-center gap-2 p-3 border-t border-surface-700/30">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-500 transition-colors"
            >
              <Save size={12} /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 text-surface-400 text-xs font-medium rounded-lg hover:bg-surface-700/50 transition-colors"
            >
              <X size={12} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="markdown-content text-sm">
            <GuideViewer content={section.content} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const GuideEditor = ({ content, onSave, onCancel, guideContext = '' }) => {
  const [sections, setSections] = useState(() => parseSections(content));
  const [previewMode, setPreviewMode] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const assembledContent = useMemo(() => assembleSections(sections), [sections]);

  const handleSectionEdit = useCallback((sectionId, updates) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  }, []);

  const handleSectionDelete = useCallback((sectionId) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  }, []);

  const handleMoveUp = useCallback((index) => {
    setSections((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  }, []);

  const handleMoveDown = useCallback((index) => {
    setSections((prev) => {
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  }, []);

  const handleRegenerate = useCallback(async (sectionId, title, sectionContent) => {
    setRegeneratingId(sectionId);
    try {
      const res = await generateAPI.regenerateSection({
        sectionTitle: title,
        sectionContent: sectionContent,
        guideContext: assembledContent.substring(0, 2000),
      });
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, content: res.data.content } : s
        )
      );
      toast.success('Section regenerated!');
    } catch {
      toast.error('Failed to regenerate section.');
    } finally {
      setRegeneratingId(null);
    }
  }, [assembledContent]);

  const addSection = () => {
    const newSection = {
      id: `section-new-${Date.now()}`,
      title: 'New Section',
      content: 'Add your content here...',
    };
    setSections((prev) => [...prev, newSection]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(assembledContent);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="glass-card p-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              !previewMode
                ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30'
                : 'text-surface-400 hover:text-surface-300 hover:bg-surface-800'
            }`}
          >
            <Edit3 size={13} /> Edit
          </button>
          <button
            onClick={() => setPreviewMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              previewMode
                ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30'
                : 'text-surface-400 hover:text-surface-300 hover:bg-surface-800'
            }`}
          >
            <Eye size={13} /> Preview
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-500">{sections.length} sections</span>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-surface-400 hover:text-surface-200 rounded-lg hover:bg-surface-800 transition-all"
          >
            <X size={13} /> Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Content */}
      {previewMode ? (
        <div className="glass-card p-8">
          <GuideViewer content={assembledContent} />
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              totalSections={sections.length}
              onEdit={handleSectionEdit}
              onDelete={handleSectionDelete}
              onRegenerate={handleRegenerate}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              regenerating={regeneratingId}
              guideContext={guideContext}
            />
          ))}

          {/* Add Section */}
          <button
            onClick={addSection}
            className="w-full py-3 border-2 border-dashed border-surface-700/50 rounded-xl text-sm text-surface-500 hover:text-primary-400 hover:border-primary-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Section
          </button>
        </div>
      )}
    </div>
  );
};

export default GuideEditor;
