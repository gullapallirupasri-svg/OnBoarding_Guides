import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, BarChart3, Wand2, BookTemplate, PartyPopper } from 'lucide-react';

const TOUR_STORAGE_KEY = 'onboardai_tour_completed';

const tourSteps = [
  {
    id: 'welcome',
    type: 'modal',
    title: 'Welcome to OnboardAI! 🎉',
    description: 'Let me give you a quick tour of the platform. It will only take a moment!',
    icon: PartyPopper,
  },
  {
    id: 'stats',
    target: '[data-tour="stats"]',
    title: 'Your Dashboard',
    description: 'Track your guide metrics here — total guides, departments, and monthly activity.',
    icon: BarChart3,
    position: 'bottom',
  },
  {
    id: 'generate',
    target: '[data-tour="generate"]',
    title: 'Generate a Guide',
    description: 'Start here to create your first AI-powered onboarding guide. Answer a few questions and AI does the rest!',
    icon: Wand2,
    position: 'bottom',
  },
  {
    id: 'templates',
    target: '[data-tour="templates"]',
    title: 'Templates Library',
    description: 'Or use a pre-built template to get started even faster.',
    icon: BookTemplate,
    position: 'bottom',
  },
  {
    id: 'complete',
    type: 'modal',
    title: "You're all set! ✨",
    description: 'Go ahead and generate your first onboarding guide. The AI will create a comprehensive, personalized guide in seconds.',
    icon: Sparkles,
  },
];

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetRect, setTargetRect] = useState(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const completed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!completed) {
      setIsActive(true);
    }
  }, []);

  const updateTargetRect = useCallback(() => {
    const step = tourSteps[currentStep];
    if (step?.target) {
      const el = document.querySelector(step.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        });
        // Scroll into view
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTargetRect(null);
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep]);

  useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    return () => window.removeEventListener('resize', updateTargetRect);
  }, [updateTargetRect]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completeTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setIsActive(false);
    if (onComplete) onComplete();
  };

  const skipTour = () => {
    completeTour();
  };

  if (!isActive) return null;

  const step = tourSteps[currentStep];
  const isModal = step.type === 'modal';
  const StepIcon = step.icon;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100]"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Overlay with spotlight cutout */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {targetRect && (
                <rect
                  x={targetRect.left}
                  y={targetRect.top}
                  width={targetRect.width}
                  height={targetRect.height}
                  rx="16"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.75)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Spotlight border glow */}
        {targetRect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute rounded-2xl border-2 border-primary-500/60 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            style={{
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Content: Modal or Tooltip */}
        {isModal ? (
          <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[400px] p-8 rounded-2xl border border-surface-700/50 text-center"
              style={{ background: 'rgba(15, 23, 42, 0.97)', backdropFilter: 'blur(20px)' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/30">
                <StepIcon size={28} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-sm text-surface-400 mb-6 leading-relaxed">{step.description}</p>

              <div className="flex items-center justify-center gap-3">
                {currentStep === 0 ? (
                  <>
                    <button
                      onClick={skipTour}
                      className="px-4 py-2 text-sm text-surface-500 hover:text-surface-300 transition-colors"
                    >
                      Skip Tour
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-xl text-sm hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                    >
                      Let's Go! →
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-xl text-sm hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                  >
                    Start Creating! 🚀
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Tooltip */
          targetRect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-[101]"
              style={{
                top:
                  step.position === 'bottom'
                    ? targetRect.top + targetRect.height + 16
                    : targetRect.top - 16,
                left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 350)),
                transform: step.position === 'top' ? 'translateY(-100%)' : undefined,
                pointerEvents: 'auto',
              }}
            >
              <div
                className="w-[320px] p-5 rounded-2xl border border-surface-700/50"
                style={{ background: 'rgba(15, 23, 42, 0.97)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                    <StepIcon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                    <p className="text-xs text-surface-400 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-800">
                  <div className="flex items-center gap-1.5">
                    {tourSteps.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          idx === currentStep ? 'bg-primary-400' : idx < currentStep ? 'bg-primary-600' : 'bg-surface-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={skipTour}
                      className="px-2 py-1 text-xs text-surface-600 hover:text-surface-400 transition-colors"
                    >
                      Skip
                    </button>
                    {currentStep > 0 && (
                      <button
                        onClick={handlePrev}
                        className="p-1.5 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all"
                      >
                        <ChevronLeft size={14} />
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-500 transition-colors"
                    >
                      Next <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingTour;
