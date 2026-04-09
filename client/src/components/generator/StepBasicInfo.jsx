import { motion } from 'framer-motion';
import { Building2, Factory, Users } from 'lucide-react';
import Input from '../ui/Input';
import AISuggestions from './AISuggestions';

const companySizes = [
  '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
];

const StepBasicInfo = ({ data, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">Company Information</h3>
        <p className="text-sm text-surface-400">Tell us about your organization</p>
      </div>

      <Input
        id="company-name"
        label="Company / Organization Name"
        type="text"
        placeholder="e.g., Acme Technologies"
        icon={Building2}
        value={data.companyName}
        onChange={(e) => onChange('companyName', e.target.value)}
      />

      <div>
        <Input
          id="industry"
          label="Industry"
          type="text"
          placeholder="e.g., Technology, Healthcare, Finance"
          icon={Factory}
          value={data.industry}
          onChange={(e) => onChange('industry', e.target.value)}
        />
        <AISuggestions
          field="industry"
          value={data.industry}
          onAccept={(suggestion) => {
            // If it looks like a department, we could fill department
            // For now, append as a note
            const current = data.industry || '';
            if (!current.toLowerCase().includes(suggestion.toLowerCase())) {
              onChange('industry', current ? `${current}, ${suggestion}` : suggestion);
            }
          }}
        />
      </div>

      <div>
        <label className="input-label">
          <Users size={14} className="inline mr-1.5 -mt-0.5" />
          Company Size
        </label>
        <div className="grid grid-cols-3 gap-2">
          {companySizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onChange('companySize', size)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                data.companySize === size
                  ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                  : 'bg-surface-800/50 border-surface-700/50 text-surface-400 hover:border-surface-600 hover:text-surface-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StepBasicInfo;
