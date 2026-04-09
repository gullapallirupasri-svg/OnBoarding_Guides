import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, MessageSquare, X, Plus } from 'lucide-react';
import AISuggestions from './AISuggestions';

const commonPlatforms = ['Slack', 'Microsoft Teams', 'Discord', 'Zoom', 'Google Meet', 'Email'];

const StepToolsTech = ({ data, onChange }) => {
  const [toolInput, setToolInput] = useState('');

  const addTool = (tool) => {
    const trimmed = tool.trim();
    if (trimmed && !data.tools.includes(trimmed)) {
      onChange('tools', [...data.tools, trimmed]);
    }
  };

  const removeTool = (tool) => {
    onChange('tools', data.tools.filter((t) => t !== tool));
  };

  const handleToolKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (toolInput.trim()) {
        // Handle comma-separated input
        const tools = toolInput.split(',').map((t) => t.trim()).filter(Boolean);
        const newTools = [...data.tools];
        tools.forEach((t) => {
          if (!newTools.includes(t)) newTools.push(t);
        });
        onChange('tools', newTools);
        setToolInput('');
      }
    }
  };

  const togglePlatform = (platform) => {
    if (data.platforms.includes(platform)) {
      onChange('platforms', data.platforms.filter((p) => p !== platform));
    } else {
      onChange('platforms', [...data.platforms, platform]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">Tools & Technologies</h3>
        <p className="text-sm text-surface-400">What tools will this person use?</p>
      </div>

      {/* Tools Input */}
      <div>
        <label className="input-label">
          <Wrench size={14} className="inline mr-1.5 -mt-0.5" />
          Tools & Technologies
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Type a tool and press Enter (or use commas)"
            className="input-field flex-1"
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            onKeyDown={handleToolKeyDown}
          />
          <button
            type="button"
            onClick={() => {
              if (toolInput.trim()) {
                addTool(toolInput);
                setToolInput('');
              }
            }}
            className="px-3 py-2 bg-primary-500/20 text-primary-400 rounded-xl hover:bg-primary-500/30 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* AI Suggestions for tools */}
        <AISuggestions
          field="tools"
          value={toolInput || (data.tools.length > 0 ? data.tools[data.tools.length - 1] : '')}
          context={{ tools: data.tools }}
          onAccept={(suggestion) => addTool(suggestion)}
        />

        {/* Tool Tags */}
        {data.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.tools.map((tool) => (
              <motion.span
                key={tool}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm rounded-lg"
              >
                {tool}
                <button
                  type="button"
                  onClick={() => removeTool(tool)}
                  className="text-primary-400 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.span>
            ))}
          </div>
        )}
        <p className="text-xs text-surface-600 mt-2">
          e.g., VS Code, Git, Docker, Figma, Jira, Node.js — separate with commas or press Enter
        </p>
      </div>

      {/* Communication Platforms */}
      <div>
        <label className="input-label">
          <MessageSquare size={14} className="inline mr-1.5 -mt-0.5" />
          Communication Platforms
        </label>
        <div className="grid grid-cols-3 gap-2">
          {commonPlatforms.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                data.platforms.includes(platform)
                  ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                  : 'bg-surface-800/50 border-surface-700/50 text-surface-400 hover:border-surface-600 hover:text-surface-300'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StepToolsTech;
