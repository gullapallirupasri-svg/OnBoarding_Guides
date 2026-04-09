import { motion } from 'framer-motion';
import { Briefcase, Building, Award, MapPin } from 'lucide-react';
import Input from '../ui/Input';

const seniorityLevels = [
  { value: 'intern', label: 'Intern' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
];

const workModes = [
  { value: 'remote', label: '🏠 Remote', desc: 'Work from anywhere' },
  { value: 'hybrid', label: '🔄 Hybrid', desc: 'Mix of office & remote' },
  { value: 'onsite', label: '🏢 Onsite', desc: 'In-office full time' },
];

const StepRoleDetails = ({ data, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">Role Details</h3>
        <p className="text-sm text-surface-400">Define the role this guide is for</p>
      </div>

      <Input
        id="role-title"
        label="Role / Position Title"
        type="text"
        placeholder="e.g., Frontend Developer, Product Manager"
        icon={Briefcase}
        value={data.role}
        onChange={(e) => onChange('role', e.target.value)}
      />

      <Input
        id="department"
        label="Department"
        type="text"
        placeholder="e.g., Engineering, Marketing, Sales"
        icon={Building}
        value={data.department}
        onChange={(e) => onChange('department', e.target.value)}
      />

      <div>
        <label className="input-label">
          <Award size={14} className="inline mr-1.5 -mt-0.5" />
          Seniority Level
        </label>
        <div className="flex flex-wrap gap-2">
          {seniorityLevels.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange('seniorityLevel', value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                data.seniorityLevel === value
                  ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                  : 'bg-surface-800/50 border-surface-700/50 text-surface-400 hover:border-surface-600 hover:text-surface-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="input-label">
          <MapPin size={14} className="inline mr-1.5 -mt-0.5" />
          Work Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          {workModes.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange('workMode', value)}
              className={`p-4 rounded-xl text-left transition-all border ${
                data.workMode === value
                  ? 'bg-primary-500/15 border-primary-500/50'
                  : 'bg-surface-800/50 border-surface-700/50 hover:border-surface-600'
              }`}
            >
              <p className={`text-sm font-medium ${data.workMode === value ? 'text-primary-300' : 'text-surface-300'}`}>
                {label}
              </p>
              <p className="text-xs text-surface-500 mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StepRoleDetails;
