import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { guidesAPI } from '../../services/api';

const suggestedQuestions = [
  'What tools do I need to install on Day 1?',
  'Who should I contact about VPN access?',
  'What should I do in my first week?',
  "What's the dress code?",
];

const ChatWidget = ({ guideId, guideTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history when opened
  useEffect(() => {
    if (isOpen && !hasLoaded) {
      setHasLoaded(true);
      // Chat history comes from the guide's chatHistory field
      // We'll load it fresh each time for simplicity
    }
  }, [isOpen, hasLoaded]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || sending) return;

    const userMessage = { role: 'user', content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const res = await guidesAPI.chat(guideId, text.trim());
      const aiMessage = {
        role: 'assistant',
        content: res.data.response,
        timestamp: new Date(),
        provider: res.data.provider,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I had trouble generating a response. Please try again.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-surface-800 border border-surface-600 rotate-0'
            : 'bg-gradient-to-br from-primary-600 to-purple-600 shadow-primary-500/30 hover:shadow-primary-500/50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
              <X size={22} className="text-surface-300" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <MessageCircle size={22} className="text-white" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-surface-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] h-[520px] flex flex-col rounded-2xl overflow-hidden border border-surface-700/50 shadow-2xl shadow-black/40"
            style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-surface-700/50 bg-gradient-to-r from-primary-600/10 to-purple-600/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm">Guide Assistant</h4>
                  <p className="text-xs text-surface-500 truncate">Ask about: {guideTitle}</p>
                </div>
                <Sparkles size={16} className="text-primary-400" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4">
                    <MessageCircle size={24} className="text-primary-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Ask about your guide</h4>
                  <p className="text-xs text-surface-500 mb-5">
                    I have the full guide content and can answer any questions.
                  </p>
                  <div className="space-y-2 w-full">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl bg-surface-800/50 border border-surface-700/50 text-surface-400 hover:text-primary-300 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all"
                      >
                        "{q}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        msg.role === 'user'
                          ? 'bg-primary-500/20'
                          : msg.isError
                          ? 'bg-red-500/20'
                          : 'bg-purple-500/20'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User size={14} className="text-primary-400" />
                      ) : (
                        <Bot size={14} className={msg.isError ? 'text-red-400' : 'text-purple-400'} />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary-600/20 text-primary-100 rounded-tr-sm'
                          : msg.isError
                          ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-tl-sm'
                          : 'bg-surface-800/70 text-surface-200 border border-surface-700/30 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))
              )}

              {/* Typing indicator */}
              {sending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Bot size={14} className="text-purple-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface-800/70 border border-surface-700/30">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-surface-500"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-surface-700/50">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about this guide..."
                  className="flex-1 px-4 py-2.5 bg-surface-800/50 border border-surface-700/50 rounded-xl text-sm text-surface-100 placeholder:text-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/30 transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={sending}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || sending}
                  whileTap={{ scale: 0.95 }}
                  className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
