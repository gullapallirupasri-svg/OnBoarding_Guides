import { motion } from 'framer-motion';
import { MessageCircle, Ruler, PenLine, Mic } from 'lucide-react';
import VoiceInput from '../ui/VoiceInput';

const tones = [
  { value: 'professional', label: '💼 Professional', desc: 'Formal and polished' },
  { value: 'friendly', label: '😊 Friendly', desc: 'Warm and approachable' },
  { value: 'casual', label: '🎉 Casual', desc: 'Relaxed and fun' },
  { value: 'corporate', label: '🏛️ Corporate', desc: 'Executive and structured' },
];

const lengths = [
  { value: 'concise', label: 'Concise', desc: '~2,000 words — Quick overview', icon: '⚡' },
  { value: 'standard', label: 'Standard', desc: '~3,500 words — Balanced detail', icon: '📄' },
  { value: 'comprehensive', label: 'Comprehensive', desc: '~6,000 words — Full depth', icon: '📚' },
];

const StepCustom = ({ data, onChange }) => {
  const handleVoiceTranscript = (transcript) => {
    const current = data.customInstructions || '';
    const separator = current && !current.endsWith(' ') ? ' ' : '';
    onChange('customInstructions', current + separator + transcript);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">Custom Instructions</h3>
        <p className="text-sm text-surface-400">Fine-tune your guide generation</p>
      </div>

      {/* Custom Instructions Textarea with Voice Input */}
      <div>
        <label className="input-label" htmlFor="custom-instructions">
          <PenLine size={14} className="inline mr-1.5 -mt-0.5" />
          Additional Context / Special Instructions
        </label>
        <div className="flex gap-2">
          <textarea
            id="custom-instructions"
            rows={4}
            placeholder="Any specific topics to cover, things to emphasize, or unique aspects of your onboarding process..."
            className="input-field resize-none flex-1"
            value={data.customInstructions}
            onChange={(e) => onChange('customInstructions', e.target.value)}
          />
          <div className="flex flex-col items-center gap-2 pt-1">
            <VoiceInput onTranscript={handleVoiceTranscript} />
            <span className="text-[10px] text-surface-600 text-center leading-tight">
              Voice<br />Input
            </span>
          </div>
        </div>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="input-label">
          <MessageCircle size={14} className="inline mr-1.5 -mt-0.5" />
          Guide Tone
        </label>
        <div className="grid grid-cols-2 gap-3">
          {tones.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange('tone', value)}
              className={`p-4 rounded-xl text-left transition-all border ${
                data.tone === value
                  ? 'bg-primary-500/15 border-primary-500/50'
                  : 'bg-surface-800/50 border-surface-700/50 hover:border-surface-600'
              }`}
            >
              <p className={`text-sm font-medium ${data.tone === value ? 'text-primary-300' : 'text-surface-300'}`}>
                {label}
              </p>
              <p className="text-xs text-surface-500 mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Length Selection */}
      <div>
        <label className="input-label">
          <Ruler size={14} className="inline mr-1.5 -mt-0.5" />
          Guide Length
        </label>
        <div className="grid grid-cols-3 gap-3">
          {lengths.map(({ value, label, desc, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange('guideLength', value)}
              className={`p-4 rounded-xl text-center transition-all border ${
                data.guideLength === value
                  ? 'bg-primary-500/15 border-primary-500/50'
                  : 'bg-surface-800/50 border-surface-700/50 hover:border-surface-600'
              }`}
            >
              <p className="text-lg mb-1">{icon}</p>
              <p className={`text-sm font-medium ${data.guideLength === value ? 'text-primary-300' : 'text-surface-300'}`}>
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

export default StepCustom;
