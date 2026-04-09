import { motion } from 'framer-motion';
import { Heart, Shield, Shirt, Clock } from 'lucide-react';
import AISuggestions from './AISuggestions';

const StepCulture = ({ data, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">Culture & Policies</h3>
        <p className="text-sm text-surface-400">Share your company culture and key policies</p>
      </div>

      {/* Culture Notes */}
      <div>
        <label className="input-label" htmlFor="culture-notes">
          <Heart size={14} className="inline mr-1.5 -mt-0.5" />
          Company Culture Notes
        </label>
        <textarea
          id="culture-notes"
          rows={4}
          placeholder="Describe your company culture, values, and team dynamics..."
          className="input-field resize-none"
          value={data.cultureNotes}
          onChange={(e) => onChange('cultureNotes', e.target.value)}
        />
        {/* AI suggestions based on work mode */}
        {data.workMode && (
          <AISuggestions
            field="workMode"
            value={data.workMode}
            context={{ industry: data.industry }}
            onAccept={(suggestion) => {
              const current = data.cultureNotes || '';
              const separator = current ? '\n• ' : '• ';
              onChange('cultureNotes', current + separator + suggestion);
            }}
          />
        )}
      </div>

      {/* Key Policies */}
      <div>
        <label className="input-label" htmlFor="policies">
          <Shield size={14} className="inline mr-1.5 -mt-0.5" />
          Key Policies to Highlight
        </label>
        <textarea
          id="policies"
          rows={4}
          placeholder="Important policies new hires should know about (e.g., code review policy, time-off policy, security protocols)..."
          className="input-field resize-none"
          value={data.policies}
          onChange={(e) => onChange('policies', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Dress Code */}
        <div>
          <label className="input-label" htmlFor="dress-code">
            <Shirt size={14} className="inline mr-1.5 -mt-0.5" />
            Dress Code
          </label>
          <select
            id="dress-code"
            className="input-field appearance-none cursor-pointer"
            value={data.dressCode}
            onChange={(e) => onChange('dressCode', e.target.value)}
          >
            <option value="">Select dress code</option>
            <option value="Casual">Casual</option>
            <option value="Business Casual">Business Casual</option>
            <option value="Business Professional">Business Professional</option>
            <option value="Smart Casual">Smart Casual</option>
            <option value="No specific code">No specific code</option>
          </select>
        </div>

        {/* Working Hours */}
        <div>
          <label className="input-label" htmlFor="working-hours">
            <Clock size={14} className="inline mr-1.5 -mt-0.5" />
            Working Hours
          </label>
          <input
            id="working-hours"
            type="text"
            placeholder="e.g., 9 AM - 5 PM, Flexible"
            className="input-field"
            value={data.workingHours}
            onChange={(e) => onChange('workingHours', e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StepCulture;
