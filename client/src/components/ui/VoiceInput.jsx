import { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceInput = ({ onTranscript, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="relative group">
        <button
          type="button"
          disabled
          className="p-2.5 rounded-xl bg-surface-800/50 text-surface-600 cursor-not-allowed border border-surface-700/50"
        >
          <MicOff size={18} />
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface-800 border border-surface-700 rounded-lg text-xs text-surface-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          Voice input not supported in this browser
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        whileTap={{ scale: 0.95 }}
        className={`p-2.5 rounded-xl border transition-all duration-300 ${
          isListening
            ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-lg shadow-red-500/20'
            : 'bg-surface-800/50 border-surface-700/50 text-surface-400 hover:text-primary-400 hover:border-primary-500/30 hover:bg-primary-500/10'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={isListening ? 'Stop recording' : 'Start voice input'}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="recording"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <Mic size={18} />
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Mic size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Recording indicator label */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-red-500/15 border border-red-500/30 rounded-lg whitespace-nowrap z-50"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs font-medium text-red-400">Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;
