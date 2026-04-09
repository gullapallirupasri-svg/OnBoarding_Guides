import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAPI } from '../../services/api';

const AISuggestions = ({ field, value, context = {}, onAccept, debounceMs = 600 }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef(null);
  const lastValueRef = useRef('');

  const fetchSuggestions = useCallback(async (val) => {
    if (!val || val.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await generateAPI.suggest({ field, value: val, context });
      const data = res.data.suggestions;

      let items = [];
      if (data?.suggestions) {
        items = Array.isArray(data.suggestions) ? data.suggestions : [];
      } else if (data?.companySizes) {
        items = [...(data.departments || [])];
      } else if (data?.departments) {
        items = data.departments;
      }

      setSuggestions(items.slice(0, 6));
      setDismissed(false);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [field, context]);

  useEffect(() => {
    if (value === lastValueRef.current) return;
    lastValueRef.current = value;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    timerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, debounceMs, fetchSuggestions]);

  if (dismissed || (suggestions.length === 0 && !loading)) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -5, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -5, height: 0 }}
        className="mt-2"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles size={12} className="text-primary-400" />
          <span className="text-xs font-medium text-primary-400">AI Suggestions</span>
          {suggestions.length > 0 && (
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="ml-auto text-surface-600 hover:text-surface-400 transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 py-1.5">
            <motion.div
              className="flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary-400"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
            <span className="text-xs text-surface-500">Getting suggestions...</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((suggestion, idx) => (
              <motion.button
                key={suggestion + idx}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  onAccept(suggestion);
                  setSuggestions((prev) => prev.filter((s) => s !== suggestion));
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg
                  bg-primary-500/10 border border-primary-500/20 text-primary-300
                  hover:bg-primary-500/20 hover:border-primary-500/40 transition-all
                  active:scale-95"
              >
                <span>+</span>
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AISuggestions;
