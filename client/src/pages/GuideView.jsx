import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, Copy, Globe, Lock, Trash2,
  Calendar, Briefcase, Building2, CheckCircle, Share2, Edit3
} from 'lucide-react';
import toast from 'react-hot-toast';
import { guidesAPI } from '../services/api';
import GuideViewer from '../components/guides/GuideViewer';
import GuideEditor from '../components/guides/GuideEditor';
import ChecklistPanel from '../components/guides/ChecklistPanel';
import OnboardingTimeline from '../components/guides/OnboardingTimeline';
import ChatWidget from '../components/guides/ChatWidget';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const GuideView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await guidesAPI.getOne(id);
        setGuide(res.data.guide);
      } catch (error) {
        toast.error('Guide not found.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchGuide();
  }, [id, navigate]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(guide.content);
      toast.success('Guide copied to clipboard!');
    } catch {
      toast.error('Failed to copy.');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;
      const element = contentRef.current;
      if (!element) return;
      toast.loading('Generating PDF...', { id: 'pdf' });
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: `${guide.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save();
      toast.success('PDF downloaded!', { id: 'pdf' });
    } catch {
      toast.error('Failed to generate PDF.', { id: 'pdf' });
    }
  };

  const handleTogglePublic = async () => {
    try {
      const res = await guidesAPI.togglePublic(guide._id);
      setGuide(res.data.guide);
      toast.success(res.data.message);
    } catch {
      toast.error('Failed to update visibility.');
    }
  };

  const handleCopyShareLink = async () => {
    if (!guide.isPublic || !guide.slug) {
      toast.error('Make the guide public first to share it.');
      return;
    }
    const url = `${window.location.origin}/shared/${guide.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied!');
    } catch {
      toast.error('Failed to copy link.');
    }
  };

  const handleDelete = async () => {
    try {
      await guidesAPI.delete(guide._id);
      toast.success('Guide deleted.');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to delete guide.');
    }
  };

  const handleSaveEdit = async (newContent) => {
    try {
      const res = await guidesAPI.update(guide._id, { content: newContent });
      setGuide(res.data.guide);
      setEditMode(false);
      toast.success('Guide updated successfully!');
    } catch {
      toast.error('Failed to save changes.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner text="Loading guide..." />
      </div>
    );
  }

  if (!guide) return null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </motion.div>

      {/* Guide Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-3">{guide.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-surface-400 mb-4">
          {guide.role && (
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} /> {guide.role}
            </span>
          )}
          {guide.department && (
            <span className="flex items-center gap-1.5">
              <Building2 size={14} /> {guide.department}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {new Date(guide.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          {guide.isPublic && (
            <span className="flex items-center gap-1.5 text-green-400">
              <Globe size={14} /> Public
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" icon={Copy} onClick={handleCopy}>
            Copy
          </Button>
          <Button variant="secondary" size="sm" icon={Download} onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={guide.isPublic ? Lock : Globe}
            onClick={handleTogglePublic}
          >
            {guide.isPublic ? 'Make Private' : 'Make Public'}
          </Button>
          {guide.isPublic && (
            <Button variant="secondary" size="sm" icon={Share2} onClick={handleCopyShareLink}>
              Copy Share Link
            </Button>
          )}
          <Button
            variant={editMode ? 'primary' : 'secondary'}
            size="sm"
            icon={Edit3}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel Edit' : 'Edit Guide'}
          </Button>
          <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeleteModal(true)}>
            Delete
          </Button>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <OnboardingTimeline content={guide.content} />
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guide Content / Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          {editMode ? (
            <GuideEditor
              content={guide.content}
              onSave={handleSaveEdit}
              onCancel={() => setEditMode(false)}
              guideContext={guide.content}
            />
          ) : (
            <div className="glass-card p-8" ref={contentRef}>
              <GuideViewer content={guide.content} />
            </div>
          )}
        </motion.div>

        {/* Checklist Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <ChecklistPanel
            guideId={guide._id}
            checklist={guide.checklist || []}
            onUpdate={(checklist) => setGuide((prev) => ({ ...prev, checklist }))}
          />
        </motion.div>
      </div>

      {/* Chat Widget */}
      <ChatWidget guideId={guide._id} guideTitle={guide.title} />

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Guide"
      >
        <p className="text-surface-300 mb-6">
          Are you sure you want to delete "<strong>{guide.title}</strong>"? This action cannot be undone.
        </p>
        <div className="flex items-center gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" icon={Trash2} onClick={handleDelete}>Delete Guide</Button>
        </div>
      </Modal>
    </div>
  );
};

export default GuideView;
