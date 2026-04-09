import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import StepBasicInfo from './StepBasicInfo';
import StepRoleDetails from './StepRoleDetails';
import StepToolsTech from './StepToolsTech';
import StepCulture from './StepCulture';
import StepCustom from './StepCustom';
import Button from '../ui/Button';

const steps = [
  { id: 1, title: 'Basic Info', component: StepBasicInfo },
  { id: 2, title: 'Role Details', component: StepRoleDetails },
  { id: 3, title: 'Tools & Tech', component: StepToolsTech },
  { id: 4, title: 'Culture', component: StepCulture },
  { id: 5, title: 'Customize', component: StepCustom },
];

const initialFormData = {
  companyName: '',
  industry: '',
  companySize: '',
  role: '',
  department: '',
  seniorityLevel: '',
  workMode: '',
  tools: [],
  platforms: [],
  cultureNotes: '',
  policies: '',
  dressCode: '',
  workingHours: '',
  customInstructions: '',
  tone: 'professional',
  guideLength: 'standard',
};

const GeneratorWizard = ({ onGenerate, loading, prefillData = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(prefillData ? { ...initialFormData, ...prefillData } : initialFormData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleGenerate = () => {
    onGenerate(formData);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="glass-card p-6 sm:p-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => setCurrentStep(step.id)}
              className="flex items-center gap-2 group"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep === step.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : currentStep > step.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-surface-800 text-surface-500 border border-surface-700'
                }`}
              >
                {currentStep > step.id ? <Check size={16} /> : step.id}
              </div>
              <span
                className={`hidden sm:inline text-sm font-medium transition-colors ${
                  currentStep === step.id ? 'text-white' : 'text-surface-500'
                }`}
              >
                {step.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 transition-colors ${
                  currentStep > step.id ? 'bg-green-500/30' : 'bg-surface-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <CurrentStepComponent
          key={currentStep}
          data={formData}
          onChange={handleChange}
        />
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-800/50">
        <Button
          variant="ghost"
          onClick={goPrev}
          disabled={currentStep === 1}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={goNext} iconRight={ChevronRight}>
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleGenerate}
            loading={loading}
            icon={Sparkles}
            className="!bg-gradient-to-r !from-primary-600 !via-purple-600 !to-pink-600 !shadow-lg !shadow-purple-500/25"
          >
            Generate Guide
          </Button>
        )}
      </div>
    </div>
  );
};

export { initialFormData };
export default GeneratorWizard;
