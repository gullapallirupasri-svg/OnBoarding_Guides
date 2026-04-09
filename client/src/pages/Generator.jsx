import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Download, Copy, RefreshCw, CheckCircle, Sparkles, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import GeneratorWizard from '../components/generator/GeneratorWizard';
import GeneratingAnimation from '../components/generator/GeneratingAnimation';
import GuideViewer from '../components/guides/GuideViewer';
import GuideEditor from '../components/guides/GuideEditor';
import OnboardingTimeline from '../components/guides/OnboardingTimeline';
import Button from '../components/ui/Button';
import { generateAPI } from '../services/api';

const Generator = () => {
  const location = useLocation();
  const prefillData = location.state?.prefillData || null;
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedFormData, setGeneratedFormData] = useState(null);
  const [provider, setProvider] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const contentRef = useRef(null);

  const handleGenerate = async (formData) => {
    setGenerating(true);
    setGeneratedContent(null);
    setSaved(false);
    setEditMode(false);

    try {
      const res = await generateAPI.generate(formData);
      setGeneratedContent(res.data.content);
      setGeneratedTitle(res.data.title);
      setGeneratedFormData(res.data.formData);
      setProvider(res.data.provider);
      toast.success(`Guide generated with ${res.data.provider === 'groq' ? 'Groq' : 'NVIDIA NIM'}!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate guide. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent || !generatedFormData) return;
    setSaving(true);
    try {
      await generateAPI.save({
        title: generatedTitle,
        content: generatedContent,
        provider,
        ...generatedFormData,
      });
      setSaved(true);
      toast.success('Guide saved to your library!');
    } catch (error) {
      toast.error('Failed to save guide.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast.success('Guide copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;
      const element = contentRef.current;
      if (!element) return;

      toast.loading('Generating PDF...', { id: 'pdf' });

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${generatedTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success('PDF downloaded!', { id: 'pdf' });
    } catch {
      toast.error('Failed to generate PDF.', { id: 'pdf' });
    }
  };

  const handleRegenerate = () => {
    setGeneratedContent(null);
    setGeneratedTitle('');
    setGeneratedFormData(null);
    setSaved(false);
    setEditMode(false);
  };

  const handleEditorSave = async (newContent) => {
    setGeneratedContent(newContent);
    setEditMode(false);
    toast.success('Content updated! Click Save to persist changes.');
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          <Sparkles size={28} className="inline mr-2 text-primary-400" />
          Guide Generator
        </h1>
        <p className="text-surface-400">
          Fill out the form below and let AI create a comprehensive onboarding guide
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="glass-card">
              <GeneratingAnimation />
            </div>
          </motion.div>
        ) : generatedContent ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Action Bar */}
            <div className="glass-card p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" />
                  <span className="text-sm text-surface-300">
                    Generated with <span className="font-semibold text-primary-400">{provider === 'groq' ? 'Groq' : 'NVIDIA NIM'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Copy}
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Download}
                    onClick={handleDownloadPDF}
                  >
                    PDF
                  </Button>
                  <Button
                    variant={editMode ? 'primary' : 'secondary'}
                    size="sm"
                    icon={Edit3}
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? 'Cancel Edit' : 'Edit'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={RefreshCw}
                    onClick={handleRegenerate}
                  >
                    New
                  </Button>
                  <Button
                    size="sm"
                    icon={saved ? CheckCircle : Save}
                    onClick={handleSave}
                    loading={saving}
                    disabled={saved}
                  >
                    {saved ? 'Saved!' : 'Save'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <OnboardingTimeline content={generatedContent} />

            {/* Generated Guide */}
            {editMode ? (
              <GuideEditor
                content={generatedContent}
                onSave={handleEditorSave}
                onCancel={() => setEditMode(false)}
                guideContext={generatedContent}
              />
            ) : (
              <div className="glass-card p-8" ref={contentRef}>
                <GuideViewer content={generatedContent} />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="wizard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GeneratorWizard
              onGenerate={handleGenerate}
              loading={generating}
              prefillData={prefillData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Generator;
